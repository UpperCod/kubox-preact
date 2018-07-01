import { h, Component } from "preact";

const config = {
    provider: "[[KUBOX]]"
};

class Consumer extends Component {
    getStore() {
        return this.props.store || this.context[config.provider];
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

class Subscriber extends Consumer {
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
    }
}

class Provider extends Component {
    getChildContext() {
        return {
            [config.provider]: this.props.store
        };
    }
    render({ children }) {
        return children[0];
    }
}

export { config, Provider, Subscriber, Consumer };
