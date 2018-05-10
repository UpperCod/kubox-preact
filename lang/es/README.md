# kubox-preact

Kubox-preact permite integrar **[kubox](https://github.com/uppercod/kubox)** como manejador de estado para aplicaciones creadas con **preact**.

| formato UMD | tamaño |
|-------------|--------|
| normal |3.84kb |
| min | 1.76kb |
| gzip | 649 bytes |

Aplicarlo es simple, **kubox-preact** posee 3 tipos de componentes :

1. **Provider** : crea contextos de estado
2. **Suscriber** : accede y se suscribe a los cambios dados por el contexto de estado compartido por componente Provider.
3. **Consumer** : accede al contexto de estado compartido por componente Provider.

## Provider

el componente Provider permite crear contextos compartidos para los componentes que este aloje.

|Parámetro|Tipo|Descripción|
|---------|----|-----------|
| **store** | instanceof Kubox | contexto a compartir |

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

El componente Subscriber permite suscribirse y accede un store definido por el contexto del componente Provider o por propiedad store.

|Parámetro|Tipo|Descripción|
|---------|----|-----------|
| **select** | string , array | permite seleccionar la suscripción a uno o más namespace del estado |
| **store** | instanceof Kubox | permite ignorar el contexto dado por el componente Provider y apuntar a esta propiedad |


```js
import {h} from "preact";
import {Provider} from "kubox-preact";

export default <Subscriber>
     {(state, actions) => <input oninput={actions.inputWrite}/>}
</Subscriber>;
```

## Consumer

El componente Consumer permite acceder un store definido por el contexto del componente Provider o por propiedad store.

|Parámetro|Tipo|Descripción|
|---------|----|-----------|
| **store** | instanceof Kubox | permite ignorar el contexto dado por provider y apuntar a esta propiedad |

```js
import {h} from "preact";
import {Provider} from "kubox-preact";

export default <Consumer>
     {(state, actions) => <input oninput={actions.inputWrite}/>}
</Consumer>;
```
> el componente Consumer no se suscribe a los cambios, como si lo realiza el componente Subscriber

