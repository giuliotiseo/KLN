import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Amplify } from '@aws-amplify/core';
import { registerLocale } from "react-datepicker";
import App from "./App";
import './index.css';
import "react-datepicker/dist/react-datepicker.css";
import { it } from 'date-fns/locale';
import store from './app/store';
import awsExports from './aws-exports';

registerLocale('it', it);

window.__localeId__ = 'it'
Amplify.configure(awsExports);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);