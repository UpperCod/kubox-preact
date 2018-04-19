# kubox-preact

Una pequeña librería para compartir el estado administrado por [Kubox](https://github.com/uppercod/kubox).

```bash
#yarn
yarn add -D kubox-preact
#npm
npm install -D kubox-preact
```

## Ejemplo

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

## fuera de Provider

**Provider** le provee la opción de generar un contexto compartido apoyado en `Component::getChildContext`, pero para pequeños contextos o pruebas ud puede usar solo el componente **Connect** y definiendo la propiedad store.


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

Como bien sabe **kubox** evita que el contexto del reducer sea profundo, por lo que observar cambios a los nameSpace es simple, de hecho **kubox** aplica la función `Object.keys(update)` para obtener los nameSpace que están generando modificaciones y así notificar a los suscriptores que solo escuchan a dichos nameSpace. Evitando sobrecargas al actualizar el estado.

> **watch** puede ser un array o un string.

```js
import App from "../app";
export default (
   <Connect watch='home'>
       {(state, actions) => <App load={actions.load} />}
   </Connect>
);
```