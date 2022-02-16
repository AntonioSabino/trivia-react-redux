import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import LOGIN from './pages/Login';
import Config from './pages/Config';
import Game from './pages/Game';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ LOGIN } />
        <Route exact path="/settings" component={ Config } />
        <Route exact path="/game" component={ Game } />
      </Switch>
    </div>
  );
}
