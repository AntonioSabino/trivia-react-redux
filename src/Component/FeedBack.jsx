import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FeedBack extends Component {
  constructor() {
    super();

    this.state = {
      score: 0,
      rightQuestions: 0,
    };
  }

  render() {
    const { score, rightQuestions } = this.state;
    const GOOD_VALUE = 0;

    if (score >= GOOD_VALUE) {
      return (
        <main className="card-feedback">
          <h1
            data-testid="feedback-text"
            className="card-feedback__title"
          >
            Well Done!
          </h1>
          <p className="card-feedback__text">
            {`Você acertou ${rightQuestions} questões!`}
          </p>
          <p className="card-feedback__text">{`Um total de ${score} pontos`}</p>
          <Link to="/ranking">
            <input
              type="button"
              value="VER RANKING"
              className="card-feedback__button"
            />
          </Link>
          <input
            type="button"
            value="JOGAR NOVAMENTE"
            className="card-feedback__button button_green"
          />
        </main>
      );
    }

    return (
      <main className="card-feedback">
        <h1
          data-testid="feedback-text"
          className="card-feedback__title"
        >
          Could be better...
        </h1>
        <p className="card-feedback__text">
          {`Você acertou ${rightQuestions} questões!`}
        </p>
        <p className="card-feedback__text">
          {`Um total de ${score} pontos`}
        </p>
        <Link to="/ranking">
          <input
            type="button"
            value="VER RANKING"
            className="card-feedback__button"
          />
        </Link>
        <input
          type="button"
          value="JOGAR NOVAMENTE"
          className="card-feedback__button button_green"
        />
      </main>
    );
  }
}

export default FeedBack;
