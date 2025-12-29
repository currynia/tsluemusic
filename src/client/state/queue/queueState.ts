import type { SongEntity } from '@/entities/SongEntity'
import Queue from './queue'

export const playlistQueueState = (() => {
  const playlistQueue = new Queue<SongEntity>()

  return {
    playlistQueueView: playlistQueue.queueView,
    getNextInQueue: () => playlistQueue.next,
    replaceQueue: (...q: SongEntity[]) => {
      playlistQueue.cur = 0
      playlistQueue.queue = q
    },
    updateQueueView: () => playlistQueue.updateQueueView(),
    setCur: (c: number) => {
      playlistQueue.cur = c
    },
    incrCur: () => {
      playlistQueue.cur++
    },
    decrCur: () => {
      playlistQueue.cur--
    },
    getCur: () => playlistQueue.cur,
    popHead: () => playlistQueue.popHead(),
    rewindHead: () => playlistQueue.prevHead,
    head: () => playlistQueue.head,
  }
})()
