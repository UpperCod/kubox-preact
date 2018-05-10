# kubox-preact

Kubox-preact allows you to integrate **[kubox](https://github.com/uppercod/kubox)** as a status handler for applications created with **preact**.

| format UMD | size |
|------------|------|
| normal |3.84kb |
| min | 1.76kb |
| gzip | 649 bytes |

Apply it is simple 🤓, **kubox-preact** has 3 types of components:

1. **Provider** : create state contexts
2. **Suscriber** : access and subscribe to the changes given by the state context shared by Provider component.
3. **Consumer** : access the state context shared by the component provider.

## Provider

The Provider component allows you to create shared contexts for the components that it hosts.

| Parameter | Type | Description |
|-----------|------|-------------|
| **store** | instanceof Kubox | context to share |

```js
import {h} from "preact";
import {Provider} from "kubox-preact";
import store from "./store";
import App from "./App";

export default <Provider store={store}>
   <App/>
</Provider>;
```

## Subscriber

The Subscriber component allows you to subscribe and access a store defined by the context of the Supplier component or by store property.

| Parameter | Type | Description |
|-----------|------|-------------|
| **select** | string , array | allows you to select the subscription to one or more namespace of the state |
| **store** | instanceof Kubox | allows you to ignore the context given by the Provider component and point to this property |


```js
import {h} from "preact";
import {Provider} from "kubox-preact";

export default <Subscriber>
     {(state, actions) => <input oninput={actions.inputWrite}/>}
</Subscriber>;
```

## Consumer

The Consumer component allows access to a store defined by the context of the Provider component or by store property.


| Parameter | Type | Description |
|-----------|------|-------------|
| **store** | instanceof Kubox | allows you to ignore the context given by the Provider component and point to this property |

```js
import {h} from "preact";
import {Provider} from "kubox-preact";

export default <Consumer>
     {(state, actions) => <input oninput={actions.inputWrite}/>}
</Consumer>;
```
> The Consumer component does not subscribe to the changes, as if the Subscriber component does

