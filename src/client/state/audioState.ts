import { ref } from 'vue'

export const audioState = (() => {
  const audioRef = ref<HTMLAudioElement>()

  return {
    audioRef,
    pauseAudio: () => audioRef.value?.pause(),
    playAudio: () => audioRef.value?.play(),
    addEventListener: (e: string, cb: () => void) => {
      audioRef.value?.addEventListener(e, cb)
    },
    getCurrentTime: () => audioRef.value?.currentTime || -1,
    getAudioLength: () => audioRef.value?.duration || -1,
    setCurrentTime: (t: number) => {
      if (audioRef.value) audioRef.value.currentTime = t
    },
  }
})()
