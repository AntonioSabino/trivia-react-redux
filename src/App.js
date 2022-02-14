import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import LOGIN from './pages/Login';
import Config from './pages/Config';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />

        <Switch>
          <Route exact path="/" component={ LOGIN } />
          <Route exact path="/settings" component={ Config } />
        </Switch>
      </header>
    </div>
  );
}
