import fs from 'fs'
import open from 'open'
import readline from 'readline'
import { google } from 'googleapis'
import path from 'path'

const SCOPES = [
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/drive.metadata.readonly',
]

const TOKEN_PATH = path.join(process.cwd(), 'token.json')
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const redirectUri = 'urn:ietf:wg:oauth:2.0:oob' // Out-of-band for manual copy/paste

const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri)

async function getRefreshToken() {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent', // ensures refresh token is returned
  })

  console.log('Opening browser for authorization...')
  await open(authUrl)

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.question('Enter the code from the page here: ', async (code) => {
    rl.close()
    const { tokens } = await oAuth2Client.getToken(code)
    console.log('Your refresh token:', tokens.refresh_token)

    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens))
    console.log('Tokens saved to', TOKEN_PATH)
  })
}

export const gt = getRefreshToken()
