import store from "../store";
import App from "../app";

export default (
    <Connect store={store}>
        {(state, actions) => <App load={actions.load} />}
    </Connect>
);
