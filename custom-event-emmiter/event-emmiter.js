class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  off(event, listener) {
    if (!this.events[event]) return;

    this.events[event] = this.events[event].filter((l) => l !== listener);
  }

  emit(event, ...args) {
    if (!this.events[event]) return;

    this.events[event].forEach((listener) => {
      listener(...args);
    });
  }
}

class ChatRoom {
  constructor(name) {
    this.name = name;
    this.eventEmitter = new EventEmitter();
  }

  join(user) {
    console.log(`${user} has joined the chat room: ${this.name}`);
    this.eventEmitter.on("message", (msg) => {
      console.log(`${user} received: ${msg}`);
    });
  }

  leave(user) {
    console.log(`${user} has left the chat room: ${this.name}`);
    this.eventEmitter.off("message", user);
  }

  sendMessage(message) {
    console.log(`Sending message: ${message}`);
    this.eventEmitter.emit("message", message);
  }
}

const chatRoom = new ChatRoom("General");

chatRoom.join("Nethra");
chatRoom.join("Manjula");

chatRoom.sendMessage("Welcome!");
chatRoom.sendMessage("How are you all doing?");

chatRoom.leave("Nethra");

chatRoom.sendMessage("Goodbye everyone!");
