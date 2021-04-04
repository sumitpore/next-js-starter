import "../styles/globals.css";

import PropTypes from "prop-types";
import { Provider } from "react-redux";

import useStore from "../redux/store";

const propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};

function App({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState);
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

App.propTypes = propTypes;

export default App;
