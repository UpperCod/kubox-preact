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

## Out of Provider's context

**Provider** provides you with the option to generate a shared context supported in `Component :: getChildContext`, but for small contexts or tests you can use only the **Connect** component and define the store property.


```js
import store from "../store";
import App from "../app";

export default (
   <Connect store={store}>
       {(state, actions) => <App load={actions.load} />}
   </Connect>
);
```

## Connect watch

As you know **kubox** prevents the context of the reducer from being deep, so observing changes to the nameSpace is simple, in fact **kubox** applies the `Object.keys (update)` function to get the nameSpace that are generating modifications and thus notify subscribers who only listen to said nameSpace. Avoiding overloads when updating the status.

> **watch** can be an array or a string.

```js
import App from "../app";
export default (
   <Connect watch='home'>
       {(state, actions) => <App load={actions.load} />}
   </Connect>
);
```