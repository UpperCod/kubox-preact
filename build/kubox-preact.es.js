import { Component } from 'preact';

var config = {
    provider: "[[KUBOX]]"
};

var Consumer = (function (Component$$1) {
    function Consumer () {
        Component$$1.apply(this, arguments);
    }

    if ( Component$$1 ) Consumer.__proto__ = Component$$1;
    Consumer.prototype = Object.create( Component$$1 && Component$$1.prototype );
    Consumer.prototype.constructor = Consumer;

    Consumer.prototype.getStore = function getStore () {
        return this.props.store || this.context[config.provider];
    };
    Consumer.prototype.connect = function connect (callback) {
        if (typeof callback !== "function") { return; }
        var ref = this.getStore();
        var state = ref.state;
        var actions = ref.actions;
        return callback(state, actions);
    };
    Consumer.prototype.render = function render (ref) {
        var children = ref.children;

        return this.connect(children[0]);
    };

    return Consumer;
}(Component));

var Subscriber = (function (Consumer) {
    function Subscriber () {
        Consumer.apply(this, arguments);
    }

    if ( Consumer ) Subscriber.__proto__ = Consumer;
    Subscriber.prototype = Object.create( Consumer && Consumer.prototype );
    Subscriber.prototype.constructor = Subscriber;

    Subscriber.prototype.subscribe = function subscribe (select, store) {
        var this$1 = this;

        store = store || this.getStore();
        if (!store) { throw "Store undefined"; }
        var unsubscribers = []
            .concat(select || "*")
            .map(function (prop) { return store.subscribe(function () { return this$1.setState(); }, prop); });
        this.unsubscribe = function () {
            unsubscribers.forEach(function (unsubscribe) { return unsubscribe(); });
        };
    };
    Subscriber.prototype.componentWillMount = function componentWillMount () {
        this.subscribe(this.props.select);
    };
    Subscriber.prototype.componentWillReceiveProps = function componentWillReceiveProps (props) {
        props = Object.assign({}, this.props, props);
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        this.subscribe(props.select, props.store);
    };
    Subscriber.prototype.componentWillUnmount = function componentWillUnmount () {
        if (this.unsubscribe) { this.unsubscribe(); }
    };

    return Subscriber;
}(Consumer));

var Provider = (function (Component$$1) {
    function Provider () {
        Component$$1.apply(this, arguments);
    }

    if ( Component$$1 ) Provider.__proto__ = Component$$1;
    Provider.prototype = Object.create( Component$$1 && Component$$1.prototype );
    Provider.prototype.constructor = Provider;

    Provider.prototype.getChildContext = function getChildContext () {
        return ( obj = {}, obj[config.provider] = this.props.store, obj );
        var obj;
    };
    Provider.prototype.render = function render (ref) {
        var children = ref.children;

        return children[0];
    };

    return Provider;
}(Component));

export { config, Consumer, Subscriber, Provider };
