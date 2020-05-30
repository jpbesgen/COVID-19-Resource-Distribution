class Component {
  constructor(id) {
    this.parent = null;
    this.children = [];
    this.state = {};
    this.id = id || generateRandomId();
    this.changed = true;
    this.afterCall = this.afterCall.bind(this);
  }

  pushProps(newProps) {
    this.props = newProps;
  }

  setState(s) {
    s.keys().forEach((key) => {
      this.state[key] = s[key];
    });
  }

  getState() {
    return this.state;
  }

  update() {
    if (this.changed) this.display();
    this.changed = false;
  }

  // Should return an html string like `<p>content</p>`
  render() {}

  afterCall() {}

  display() {
    document.getElementById(this.id).innerHTML = this.render();
    this.afterCall();
  }

  addChild(component) {
    this.children.push(component);
    component.parent = this;
  }

  removeChild(component) {
    for (let i = this.children.length - 1; i >= 0; i--) {
      if (this.children[i].equals(component)) {
        let child = this.children.splice(i, 1);
        return child;
      }
    }
  }

  equals(component) {
    return this.id == component.id;
  }
}

function generateRandomId() {
  return (
    "kF" +
    Math.floor(Math.random() * 999999) +
    "tN" +
    Math.floor(Math.random() * 999999)
  );
}
