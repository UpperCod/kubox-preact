# kubox-preact

Una pequeña librería para compartir el estado administrado por [Kubox](https://github.com/uppercod/kubox).

```bash
#yarn
yarn add -D kubox-preact
#npm
npm install -D kubox-preact
```

## Ejemplo

> Fuera de este ejemplo puede jugar con uno existente en [jsfiddle](https://jsfiddle.net/uppercod/3hvru6ex/340/).

```js
import Store from "kubox";
import { h, render } from "preact";
import { Provider, Connect, Static } from "kubox-preact";

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
          <Static>
              {(state, actions) => <Header title={state.title} />}
          </Static>
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

Permite crear un contexto para **Connect** y **Static**.

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

|Parámetro|Tipo|Descripción|
|---------|----|-----------|
| **store** | instanceof Kubox | permite ignorar el contexto dado por provider y apuntar a esta propiedad |

## Connect

Este componente permite suscribirse a un **store** entregado por **Provider** o por el prop **store**

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

|Parámetro|Tipo|Descripción|
|---------|----|-----------|
| **watch**   | string , array | permite seleccionar la suscripción a uno o más namespace del estado |
| **mount** | function | se ejecuta al momento de montar el componente, recibe como parámetros state y actions |
| **unmount** | function | se ejecuta al momento de desmontar el componente, recibe como parámetros state y actions |
| **store** | instanceof Kubox | permite ignorar el contexto dado por provider y apuntar a esta propiedad |
| **render** | function | ejecución alternativa a funcion dentro de componente |


## Static

Permite acceder al store pero sin suscribirse a los cambios, como lo realiza connect.


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

|Parámetro|Tipo|Descripcion|
|---------|----|-----------|
| **store** | instanceof Kubox | permite ignorar el contexto dado por provider y apuntar a esta propiedad |
| **render** | function | ejecución alternativa a funcion dentro de componente |

