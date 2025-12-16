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

  get current() {
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
    this.incrCur()

    return head
  }

  incrCur() {
    this.cur++
  }

  updateQueueView() {
    this.queueView.value = this.queue.slice(this.cur)
  }
}

export default Queue
