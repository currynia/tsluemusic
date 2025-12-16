import { ref, type Ref } from 'vue'

class Queue<T> {
  queue: T[] = []
  queueView: Ref<T[]> = ref<T[]>([]) as Ref<T[]>
  cur = 0

  constructor() {}

  get next() {
    this.cur++
    if (this.cur > this.queue.length) {
      this.cur = 0
      return null
    }
    return this.queue[this.cur]
  }

  get head() {
    return this.queue[this.cur]
  }

  get previous() {
    this.cur--
    if (this.cur < 0) {
      this.cur = 0
    }
    return this.queue[this.cur]
  }

  push(...items: T[]) {
    console.log(this.queue)

    this.queue.push(...items)
    return this.queue
  }

  popHead() {
    const head = this.queue[this.cur]
    this.cur++
    return head
  }

  get prevHead() {
    this.cur--
    if (this.cur < 0) {
      this.cur = 0
      return null
    }
    const head = this.queue[this.cur - 1]
    return head
  }

  updateQueueView() {
    this.queueView.value = this.queue.slice(this.cur)
  }
}

export default Queue
