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
    const { assertions } = this.props;
    const VALIDATE_SCORE = 3;
    console.log(assertions);
    return (
      <section>
        <Header />
        <h1 data-testid="feedback-text">
          {' '}
          {assertions >= VALIDATE_SCORE ? 'Well Done!' : 'Could be better...'}
        </h1>
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
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
