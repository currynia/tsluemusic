import { audioState } from '@/state/audio/audioState'
import { playlistQueueState } from '@/state/queue/queueState'

export const playNextInQueue = async () => {
  const head = playlistQueueState.popHead()
  if (head) {
    await audioState.setAudio(head.fileName, head.name)
    audioState.playAudio()
  }
  playlistQueueState.updateQueueView()
}

export const playPrevInQueue = async () => {
  playlistQueueState.rewindHead()
  playlistQueueState.rewindHead()
  playNextInQueue()
}
