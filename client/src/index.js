import React from 'react';
import ReactDOM from 'react-dom';
import App from './view/App';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./state/configure.store";
import './index.css';
import './styles/stylesFromPSD.css';
import './styles/animations.css';
import './styles/responsive.css';
import './styles/styles.css';

ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
      <Router>
        <App />
      </Router>
     </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


