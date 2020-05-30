class PubSub {
  constructor() {
    this.events = {};
  }

  on(event_name, fn) {
    if (this.events[event_name] == null) {
      this.events[event_name] = [];
    }

    this.events[event_name].push(fn);
  }

  unsubscribe(event_name, fn) {
    if (this.events[event_name] == null) return;
    for (let i = this.events[event_name].length - 1; i >= 0; i--) {
      if (this.events[event_name] == fn) {
        this.events.splice(i, 1);
        return;
      }
    }
  }

  publish(event_name, data = {}) {
    if (this.events[event_name] == null) return;
    this.events[event_name].forEach((fn) => {
      fn(data);
    });
  }
}
let EventStore = new PubSub();
