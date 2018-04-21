# kubox-preact

A small library to share the state managed by [Kubox](https://github.com/uppercod/kubox).

```bash
#yarn
yarn add -D kubox-preact
#npm
npm install -D kubox-preact
```

## example

> Outside of this example you can play with an existing one in [jsfiddle] (https://jsfiddle.net/uppercod/3hvru6ex/340/).


```js
import Store from "kubox";
import { h, render } from "preact";
import { Provider, Connect } from "kubox-preact";

function Header({ title }) {
    return <h1>{title}</h1>;
}

let store = new Store(
    {
        title: "Hello!"
    },
    {
        title: {
            update(state, title) {
                return title;
            }
        }
    }
);

render(
    <Provider store={store}>
        <div>
            <Connect>
                {(state, actions) => <Header title={state.title} />}
            </Connect>
            <Connect>
                {(state, actions) => (
                    <div>
                        <button onclick={() => action.titleUpdate("Hello!")}>
                            select title : Hello!
                        </button>
                        <button onclick={() => action.titleUpdate("Bye!")}>
                            select title : Bye!
                        </button>
                    </div>
                )}
            </Connect>
        </div>
    </Provider>,
    document.querySelector("main")
);
```

## Provider

Create a context for **Connect** and **Static**.

```js
import {h} from "preact";
import { Provider } from "kubox-preact";
import store from "./store";
import App from "./app";

export default (
  <Provider store={store}>
      <App/>
  </Provider>
);
```

### Provider props

| Parameter | Type | Description |
|-----------|------|-------------|
| **store** | instanceof Kubox | allows to ignore the context given by provider and point to this property |

## Connect

This component allows you to subscribe to a ** store ** delivered by **Provider** or by the prop **store**

```js
import {h} from "preact";
import { Connect } from "kubox-preact";

export default (
  <Connect>
      {(state, actions) => <App load={actions.load} />}
  </Connect>
);
```

### Connect props

| Parameter | Type | Description |
|-----------|------|-------------|
| **watch** | string, array | allows you to select the subscription to one or more namespace of the state |
| **mount** | function | is executed when the component is mounted, receives as parameters state and actions |
| **unmount** | function | is executed at the time of disassembling the component, receives as parameters state and actions |
| **store** | instanceof Kubox | allows to ignore the context given by provider and point to this property |
| **render** | function | alternative execution to function within component |

## Static

Allows access to the store but **without subscribing to the changes**, as done by connect.

```js
import {h} from "preact";
import { Static } from "kubox-preact";

export default (
  <Static>
      {(state, actions) => <App load={actions.load} />}
  </Static>
);
```

### Static props

| Parameter | Type | Description |
|-----------|------|-------------|
| **store** | instanceof Kubox | allows to ignore the context given by provider and point to this property |
| **render** | function | alternative execution to function within component |
