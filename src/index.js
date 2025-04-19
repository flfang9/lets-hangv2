import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import SharedEventView from './pages/SharedEventView';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/event/:eventId" component={SharedEventView} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>
);