import { h, Component } from "preact";

export const PROVIDER = "__KUBOX__";

export class Static extends Component {
    getStore() {
        return this.props.store || this.context[PROVIDER];
    }
    connect(callback) {
        if (typeof callback !== "function") return;
        let { state, actions } = this.getStore();
        return callback(state, actions);
    }
    render({ children, render }) {
        return this.connect(render || children[0]);
    }
}

export class Connect extends Static {
    subscribe(watch, store) {
        store = store || this.getStore();
        if (!store) throw "Store undefined";
        let unsubscribers = []
            .concat(watch || "*")
            .map(prop => store.subscribe(() => this.setState(), prop));
        this.unsubscribe = () => {
            unsubscribers.forEach(unsubscribe => unsubscribe());
        };
    }
    componentWillMount() {
        this.subscribe(this.props.watch);
        this.connect(this.props.mount);
    }
    componentWillReceiveProps(props) {
        props = { ...this.props, ...props };
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        this.subscribe(props.watch, props.store);
    }
    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
        this.connect(this.props.unmount);
    }
}

export class Provider extends Component {
    getChildContext() {
        return {
            [PROVIDER]: this.props.store
        };
    }
    render({ children }) {
        return children[0];
    }
}
