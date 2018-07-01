var KuboxPreact = (function (exports,preact) {
    'use strict';

    var config = {
        provider: "[[KUBOX]]"
    };

    var Consumer = (function (Component) {
        function Consumer () {
            Component.apply(this, arguments);
        }

        if ( Component ) Consumer.__proto__ = Component;
        Consumer.prototype = Object.create( Component && Component.prototype );
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
    }(preact.Component));

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

    var Provider = (function (Component) {
        function Provider () {
            Component.apply(this, arguments);
        }

        if ( Component ) Provider.__proto__ = Component;
        Provider.prototype = Object.create( Component && Component.prototype );
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
    }(preact.Component));

    exports.config = config;
    exports.Consumer = Consumer;
    exports.Subscriber = Subscriber;
    exports.Provider = Provider;

    return exports;

}({},preact));
