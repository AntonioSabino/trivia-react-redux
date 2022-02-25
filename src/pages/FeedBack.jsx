import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Component/Header';

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
    const { player } = this.props;
    const VALIDATE_SCORE = 3;
    return (
      <section>
        <Header />
        <h1 data-testid="feedback-text">
          {' '}
          {player.assertions >= VALIDATE_SCORE ? 'Well Done!' : 'Could be better...'}
        </h1>
        <p data-testid="feedback-total-score">{player.score}</p>
        <p data-testid="feedback-total-question">{player.assertions}</p>
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

const mapStateToProps = (state) => ({
  player: state.player,
});

Feedback.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
