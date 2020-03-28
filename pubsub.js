class PubSub {
    constructor() {
        this.events = {};
    }

    subscribe(event_name, fn) {
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
        if(this.events[event_name] == null) return;
        this.events[event_name].forEach((fn) => {
            fn(data);
        });
    }
}
let EventStore = new PubSub();

class ComponentManager {
    constructor() {
        this.roots = {};
    }

    addRootComponent(component) {
        this.roots[component.id] = component;
    }

    deleteComponent(id) {
        let root = this.getComponent(id);
        if(root == null) return null;
        if(root.parent == null) {
            delete this.roots[component.id]
        } else {
            root.parent.removeChild(root);
            delete root;
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
            child.render();
            vclosed.push(child);
            child.children.forEach((c) => vopen.push(c))
        }
        return vclosed;
    }

    renderAll() {
        let vclosed = [];
        this.roots.keys().forEach((key) => {
            let vopen = [this.roots[key]];
            while(vopen.length > 0) {
                let child = vopen.shift();
                child.render();
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
        this.id = id || generateRandomId();
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

    }

    render() {

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