import process from 'node:process'
import { google } from 'googleapis'

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const redirectUri = process.env.REDIRECT_URI
const token = process.env.REFRESH_TOKEN!

const auth = new google.auth.OAuth2(clientId, clientSecret, redirectUri)
auth.setCredentials(JSON.parse(token))
const service = google.drive({ version: 'v3', auth })

export async function getFile(fileName: string, fp: string) {
  const fileId = await service.files.list({
    q: `name='${fileName}'`,
    fields: 'nextPageToken, files(id)',
    spaces: 'drive',
  })
  const file = await service.files.get(
    {
      fileId: fileId.data.files?.[0].id as string | undefined,
      alt: 'media',
    },
    { responseType: 'arraybuffer' },
  )

  return file.data
}
