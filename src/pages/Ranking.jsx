import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  redirectHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <h1
          data-testid="ranking-title"
        >
          Ranking

        </h1>
        <button
          type="button"
          onClick={ this.redirectHome }
          data-testid="btn-go-home"
        >
          Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Ranking;
