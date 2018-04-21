var KuboxPreact = (function (exports,preact) {
'use strict';

var PROVIDER = "__KUBOX__";

var Connect = (function (Component) {
    function Connect () {
        Component.apply(this, arguments);
    }

    if ( Component ) Connect.__proto__ = Component;
    Connect.prototype = Object.create( Component && Component.prototype );
    Connect.prototype.constructor = Connect;

    Connect.prototype.getStore = function getStore () {
        return this.props.store || this.context[PROVIDER];
    };
    Connect.prototype.subscribe = function subscribe (watch, store) {
        var this$1 = this;

        store = store || this.getStore();
        if (!store) { throw "Store undefined"; }
        var unsubscribers = []
            .concat(watch || "*")
            .map(function (prop) { return store.subscribe(function () { return this$1.setState(); }, prop); });
        this.unsubscribe = function () {
            unsubscribers.forEach(function (unsubscribe) { return unsubscribe(); });
        };
    };
    Connect.prototype.componentWillMount = function componentWillMount () {
        this.subscribe(this.props.watch);
        this.connect(this.props.mount);
    };
    Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps (props) {
        props = Object.assign({}, this.props, props);
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        this.subscribe(props.watch, props.store);
    };
    Connect.prototype.componentWillUnmount = function componentWillUnmount () {
        if (this.unsubscribe) { this.unsubscribe(); }
        this.connect(this.props.unmount);
    };
    Connect.prototype.connect = function connect (callback) {
        if (typeof callback !== "function") { return; }
        var ref = this.getStore();
        var state = ref.state;
        var actions = ref.actions;
        return callback(state, actions);
    };
    Connect.prototype.render = function render (ref) {
        var children = ref.children;
        var render = ref.render;

        return this.connect(render || children[0]);
    };

    return Connect;
}(preact.Component));

var Provider = (function (Component) {
    function Provider () {
        Component.apply(this, arguments);
    }

    if ( Component ) Provider.__proto__ = Component;
    Provider.prototype = Object.create( Component && Component.prototype );
    Provider.prototype.constructor = Provider;

    Provider.prototype.getChildContext = function getChildContext () {
        return ( obj = {}, obj[PROVIDER] = this.props.store, obj);
        var obj;
    };
    Provider.prototype.render = function render (ref) {
        var children = ref.children;

        return children[0];
    };

    return Provider;
}(preact.Component));

exports.PROVIDER = PROVIDER;
exports.Connect = Connect;
exports.Provider = Provider;

return exports;

}({},preact));
