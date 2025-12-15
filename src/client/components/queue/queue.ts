import { ref, type Ref } from 'vue'

class Queue<T> {
  queue: Ref<T[]> = ref<T[]>([]) as Ref<T[]>
  cur: number = 0

  constructor() {}

  get next() {
    this.cur++
    if (this.cur > this.queue.value.length) {
      this.cur = 0
      return null
    }
    return this.queue.value[this.cur]
  }

  get current() {
    return this.queue.value[this.cur]
  }

  get previous() {
    this.cur--
    if (this.cur < 0) {
      this.cur = 0
    }
    return this.queue.value[this.cur]
  }

  push(...items: T[]) {
    console.log('ASDSADSD')
    console.log(this.queue.value)

    this.queue.value.push(...items)
    return this.queue
  }
}

export default Queue
