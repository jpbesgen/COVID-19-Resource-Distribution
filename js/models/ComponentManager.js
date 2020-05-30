class ComponentManager {
  constructor() {
    this.roots = {};

    this.addRootComponent = this.addRootComponent.bind(this);
    this.renderAll = this.renderAll.bind(this);
  }

  addRootComponent(component) {
    this.roots[component.id] = component;
  }

  deleteComponent(id) {
    let root = this.getComponent(id);
    if (root == null) return null;
    if (root.parent == null) {
      delete this.roots[component.id];
    } else {
      root.parent.removeChild(root);
    }
  }

  getComponent(id) {
    this.roots.keys().forEach((key) => {
      let vopen = [this.roots[key]];
      while (vopen.length > 0) {
        let child = vopen.shift();
        if (child.id == id) {
          return child;
        }
        child.children.forEach((c) => vopen.push(c));
      }
    });
    return null;
  }

  renderComponent(id) {
    let root = getComponent(id);
    if (root == null) return false;
    let vopen = [root],
      vclosed = [];
    while (vopen.length > 0) {
      let child = vopen.shift();
      child.display();
      vclosed.push(child);
      child.children.forEach((c) => vopen.push(c));
    }
    return vclosed;
  }

  renderAll() {
    return new Promise((resolve, reject) => {
      let vclosed = [];
      Object.keys(this.roots).forEach((key) => {
        let vopen = [this.roots[key]];
        while (vopen.length > 0) {
          let child = vopen.pop();
          child.update();
          vclosed.push(child);
          child.children.forEach((c) => vopen.push(c));
        }
      });
      resolve(vclosed);
    });
  }
}
let ComponentTree = new ComponentManager();
