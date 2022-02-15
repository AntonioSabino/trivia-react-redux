import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Answer from '../Component/Answer';
import Header from '../Component/Hearder';

class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <section>
        <Header />
        <Answer history={ history } />
      </section>

    );
  }
}

Game.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Game;
