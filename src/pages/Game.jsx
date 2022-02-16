import React, { Component } from 'react';
import FeedBack from '../Component/FeedBack';
import Header from '../Component/Hearder';
import logo from '../trivia.png';

class Game extends Component {
  render() {
    return (
      <>
        <Header />
        <img src={ logo } className="App__logo" alt="logo" />
        <FeedBack />
      </>
    );
  }
}

export default Game;
