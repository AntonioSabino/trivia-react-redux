import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import LOGIN from './pages/Login';
import Config from './pages/Config';

export default function App() {
  return (
    <div className="App">
      <img src={ logo } className="App__logo" alt="logo" />

      <Switch>
        <Route exact path="/" component={ LOGIN } />
        <Route exact path="/settings" component={ Config } />
      </Switch>
    </div>
  );
}
