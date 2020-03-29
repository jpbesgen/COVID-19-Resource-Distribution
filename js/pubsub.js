class PubSub {
    constructor() {
        this.events = {};
    }

    on(event_name, fn) {
        if(this.events[event_name] == null) {
            this.events[event_name] = [];
        }

        this.events[event_name].push(fn);
    }

    unsubscribe(event_name, fn) {
        if(this.events[event_name] == null) return;
        for(let i = this.events[event_name].length - 1; i >= 0; i--) {
            if(this.events[event_name] == fn) {
                this.events.splice(i, 1);
                return;
            }
        }
    }

    publish(event_name, data={}) {
        console.log(event_name);
        if(this.events[event_name] == null) return;
        console.log("exist");
        this.events[event_name].forEach((fn) => {
            fn(data);
        });
    }
}
let EventStore = new PubSub();

class ComponentManager {
    constructor() {
        this.roots = []; // {};

        this.addRootComponent = this.addRootComponent.bind(this);
        this.renderAll = this.renderAll.bind(this);
    }

    addRootComponent(component) {
        this.roots.push(component);
        //this.roots[component.id] = component;
    }

    deleteComponent(id) {
        let root = this.getComponent(id);
        if(root == null) return null;
        if(root.parent == null) {
            delete this.roots[component.id]
        } else {
            root.parent.removeChild(root);
        }
    }

    getComponent(id) {
        this.roots.keys().forEach((key) => {
            let vopen = [this.roots[key]];
            while(vopen.length > 0) {
                let child = vopen.shift();
                if(child.id == id) {
                    return child;
                }
                child.children.forEach((c) => vopen.push(c))
            }
        });
        return null;
    }

    renderComponent(id) {
        let root = getComponent(id);
        if(root == null) return false;
        let vopen = [root],
            vclosed = [];
        while(vopen.length > 0) {
            let child = vopen.shift();
            child.display();
            vclosed.push(child);
            child.children.forEach((c) => vopen.push(c))
        }
        return vclosed;
    }

    renderAll() {
        let vclosed = [];
        this.roots.forEach((component) => {
            let vopen = [component];
            while(vopen.length > 0) {
                let child = vopen.pop();
                child.update();
                vclosed.push(child);
                child.children.forEach((c) => vopen.push(c))
            }
        });
        return vclosed;
    }
}
let ComponentTree = new ComponentManager();

class Component {
    constructor(id) {
        this.parent = null;
        this.children = [];
        this.state = {};
        this.props = {};
        this.id = id || generateRandomId();
        this.changed = true;
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
        if(this.changed) this.display();
        this.changed = false;
    }

    // Should return an html string like `<p>content</p>`
    render() {

    }

    display() {
        document.getElementById(this.id).innerHTML = this.render();
    }

    addChild(component) {
        this.children.push(component);
        component.parent = this;
    }

    removeChild(component) {
        for(let i = this.children.length - 1; i >= 0; i--) {
            if(this.children[i].equals(component)) {
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
    return "kF" + Math.floor(Math.random() * 999999) + "tN" + Math.floor(Math.random() * 999999)
}