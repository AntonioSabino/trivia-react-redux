import React, { Component } from 'react';
import Header from '../Component/Hearder';

class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <input
          data-testid="btn-go-home"
          type="button"
          value="Tela inicial"
        />
      </div>
    );
  }
}

export default Game;
