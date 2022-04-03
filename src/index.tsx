import React from 'react';
import ReactDOM from 'react-dom';
import './app/layout/styles.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import {createBrowserHistory} from 'history'
import {unstable_HistoryRouter as HistoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./app/store/configureStore";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'

export const history = createBrowserHistory()

ReactDOM.render(
    <React.StrictMode>
        <HistoryRouter history={history}>
            <Provider store={store}>
                <App/>
            </Provider>
        </HistoryRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
