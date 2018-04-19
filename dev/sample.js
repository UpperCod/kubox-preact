/* @jsx h */
const { Component, h, render } = preact;
const Store = Kubox;
const { Provider, Connect } = KuboxPreact;

const state = {
    placeholder: "...write",
    input: "...write"
};

const reducers = {
    input: {
        update(state = "...", input) {
            return input;
        }
    }
};

let store = new Store(state, reducers);

class TodoApp extends Component {
    render() {
        return (
            <Provider store={store}>
                <div class="container">
                    <div>
                        A simple example, simply write lake in the input and you
                        will notice its effect
                    </div>
                    <Connect>
                        {(state, actions) => (
                            <label>
                                <div>Input 1</div>
                                <input
                                    placeholder={state.placeholder}
                                    oninput={event =>
                                        actions.inputUpdate(event.target.value)
                                    }
                                />
                            </label>
                        )}
                    </Connect>
                    <Connect>
                        {(state, actions) => (
                            <label>
                                <div>Input 2</div>
                                <input
                                    placeholder={state.placeholder}
                                    oninput={event =>
                                        actions.inputUpdate(event.target.value)
                                    }
                                />
                            </label>
                        )}
                    </Connect>
                    <Connect>
                        {(state, actions) => (
                            <label>
                                <div>Input 3, synchronized to the state</div>
                                <input
                                    placeholder={state.placeholder}
                                    value={state.input}
                                    oninput={event =>
                                        actions.inputUpdate(event.target.value)
                                    }
                                />
                            </label>
                        )}
                    </Connect>
                    <Connect>
                        {state => <h1 class="title">✍️ {state.input}</h1>}
                    </Connect>
                </div>
            </Provider>
        );
    }
}

render(<TodoApp />, document.querySelector("#app"));
