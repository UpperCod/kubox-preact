import { h, Component } from "preact";

export const nameSpace = "__KUBOX__";

export class Consumer extends Component {
    getStore() {
        return this.props.store || this.context[nameSpace];
    }
    connect(callback) {
        if (typeof callback !== "function") return;
        let { state, actions } = this.getStore();
        return callback(state, actions);
    }
    render({ children }) {
        return this.connect(children[0]);
    }
}

export class Subscriber extends Consumer {
    subscribe(select, store) {
        store = store || this.getStore();
        if (!store) throw "Store undefined";
        let unsubscribers = []
            .concat(select || "*")
            .map(prop => store.subscribe(() => this.setState(), prop));
        this.unsubscribe = () => {
            unsubscribers.forEach(unsubscribe => unsubscribe());
        };
    }
    componentWillMount() {
        this.subscribe(this.props.select);
        // this.connect(this.props.mount);
    }
    componentWillReceiveProps(props) {
        props = { ...this.props, ...props };
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        this.subscribe(props.select, props.store);
    }
    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
        // this.connect(this.props.unmount);
    }
}

export class Provider extends Component {
    getChildContext() {
        return {
            [nameSpace]: this.props.store
        };
    }
    render({ children }) {
        return children[0];
    }
}
