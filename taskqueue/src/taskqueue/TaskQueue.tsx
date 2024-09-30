class TaskQueue {
  private queue: (() => Promise<void>)[] = [];
  private isProcessing: boolean = false;

  async enqueue(task: () => Promise<void>, callback: () => void) {
    this.queue.push(() => task().then(callback));
    this.processQueue();
  }

  private async processQueue() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) await task();
    }

    this.isProcessing = false;
  }
}

export default TaskQueue;
