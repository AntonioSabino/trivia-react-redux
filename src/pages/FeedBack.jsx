import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Feedback extends Component {
  redirectNewGame = () => {
    const { history } = this.props;
    history.push('/');
  }

  redirectRankin= () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    return (
      <section>
        <button
          type="button"
          onClick={ this.redirectRankin }
          data-testid="btn-ranking"
        >
          Ranking
        </button>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.redirectNewGame }
        >
          New Game
        </button>
      </section>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Feedback;
