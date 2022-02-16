import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Answer from '../Component/Answer';
// import FeedBack from '../Component/FeedBack';
import Header from '../Component/Hearder';
import logo from '../trivia.png';

class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <Header />
        <input
          data-testid="btn-go-home"
          type="button"
          value="Tela inicial"
        />
        <Answer history={ history } />
        <img src={ logo } className="App__logo" alt="logo" />
        {/* <FeedBack /> */}
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Game;
