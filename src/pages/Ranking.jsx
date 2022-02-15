import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    return (
      <div>
        <h1>Ranking</h1>
        <Link to="/">
          <input
            data-testid="btn-go-home"
            type="button"
            value="Tela inicial"
          />
        </Link>
      </div>
    );
  }
}

export default Ranking;
