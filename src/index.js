import { h, Component } from "preact";

export const PROVIDER = "__KUBOX__";

export class Connect extends Component {
    getStore() {
        return this.props.store || this.context[PROVIDER];
    }
    subscribe(watch) {
        let store = this.getStore();
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
    }
    componentWillReceiveProps(props) {
        if (props.watch || props.store) {
            if (this.unsubscribe) this.unsubscribe();
            this.subscribe(props.watch);
        }
    }
    render({ children }) {
        let { state, actions } = this.getStore();
        return children[0](state, actions);
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
