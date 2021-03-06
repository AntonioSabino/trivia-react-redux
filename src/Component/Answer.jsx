import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchTrivia from '../services/fetchTrivia';
import { tokenAPI, updateScore } from '../redux/actions/index';
import Timer from './Timer';

class Answer extends Component {
  constructor() {
    super();

    this.state = {
      confirmAnswers: false,
      questions: [],
      questNumber: 0,
      randomQuestions: [],
      buttonDisables: false,
      seconds: 30,
      questionDificult: [],
    };
  }

  componentDidMount() {
    this.fetchQuestions();
    this.coolDown();
    localStorage.setItem('score', 0);
  }

  /* coolDown feito através da consulta desse link */
  /* https://stackblitz.com/edit/react-timer-without-state */
  coolDown = () => {
    const ONE_SECOND = 1000;
    setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds > 0 ? prevState.seconds - 1 : prevState.seconds,
      }));
      const { seconds } = this.state;
      if (seconds === 0) {
        this.disabledButtons();
      }
    }, ONE_SECOND);
  }

  disabledButtons = () => {
    this.setState({
      buttonDisables: true,
      confirmAnswers: true,
    });
  }

  redirectEndGame = () => {
    const { history } = this.props;
    history.push('/endgame');
  }

  nextClick = () => {
    const { questNumber } = this.state;
    const MAX_LENGTH = 4;
    if (questNumber === MAX_LENGTH) {
      this.redirectEndGame();
    } else {
      this.setState((prevState) => (
        { questNumber: prevState.questNumber + 1,
          confirmAnswers: false,
          seconds: 30,
          buttonDisables: false,
        }
      ));
    }
  }

  sortQuestion = ({ results }) => {
    const NUMBER = 0.5;
    const newQuestions = [];
    for (let index = 0; index < results.length; index += 1) {
      const correctAnswers = results[index].correct_answer;
      const obj = { ...results[index].incorrect_answers, correctAnswers };
      const entries = Object.entries(obj);
      entries.sort(() => Math.random() - NUMBER);
      newQuestions.push(entries);
    }
    this.setState({ randomQuestions: newQuestions });
  }

  defineDificult = (difficulty) => {
    const NUMBER_ONE = 1;
    const NUMBER_TWO = 2;
    const NUMBER_THREE = 3;

    if (difficulty === 'easy') {
      return (NUMBER_ONE);
    } if (difficulty === 'medium') {
      return (NUMBER_TWO);
    } if (difficulty === 'hard') {
      return (NUMBER_THREE);
    }
  }

  sumScore = (targetAnswer, seconds, difficulty) => {
    if (targetAnswer.includes('correct')) {
      const { totalScore, player } = this.props;
      const MIN_POINTS = 10;
      const difficultyValue = this.defineDificult(difficulty);
      const questionScore = player.score + MIN_POINTS + (seconds * difficultyValue);
      localStorage.setItem('score', questionScore);
      const newUser = {
        name: player.name,
        assertions: player.assertions + 1,
        score: questionScore,
        gravatarEmail: player.gravatarEmail,
      };

      totalScore(newUser);
    }
  }

  answerClick = ({ target }, questNumber) => {
    const { seconds, questionDificult } = this.state;
    this.setState({
      confirmAnswers: true,
      buttonDisables: true,
    });
    this.sumScore(target.id, seconds, questionDificult[questNumber]);
  }

  callFunctions = (resolve) => {
    this.sortQuestion(resolve);
    this.mapDificult(resolve);
  }

  classNameChange = (answer) => {
    if (answer[0] === 'correctAnswers') {
      return ('answer-options-card__correctAnswers');
    }
    return ('answer-options-card__wrong-answer');
  }

  mapDificult = ({ results }) => {
    const dificults = results.map((question) => question.difficulty);
    this.setState({ questionDificult: dificults });
  }

  async fetchQuestions() {
    const VALIDATE_CODE = 3;
    const { token, getToken } = this.props;
    const resolve = await fetchTrivia(token);
    if (resolve.response_code === VALIDATE_CODE) {
      const newToken = await getToken();
      localStorage.setItem('token', newToken);
      this.fetchQuestions();
    }
    this.setState({
      questions: resolve.results,
    }, this.callFunctions(resolve));
  }

  render() {
    const {
      questions,
      questNumber,
      randomQuestions,
      buttonDisables,
      confirmAnswers,
      seconds,
    } = this.state;
    const index = 0;
    return (
      <div>
        <Timer
          seconds={ seconds }
        />
        {questions.length > 0 && (
          <>
            <h3 data-testid="question-category">{questions[questNumber].category}</h3>
            <h3 data-testid="question-text">{questions[questNumber].question}</h3>
            <section id="answer-options-card" data-testid="answer-options">
              {
                randomQuestions[questNumber]
                  .map((answer) => (
                    <button
                      className={ confirmAnswers ? (
                        this.classNameChange(answer)
                      ) : (null) }
                      type="button"
                      key={ answer }
                      onClick={ ({ target }) => this.answerClick(
                        { target }, questNumber,
                      ) }
                      data-testid={ answer[0] === 'correctAnswers'
                        ? 'correct-answer'
                        : `wrong-answer-${index}` }
                      disabled={ buttonDisables }
                      id={ answer[0] === 'correctAnswers'
                        ? 'correct-answer'
                        : 'wrong-answer' }
                    >
                      {answer[1]}
                    </button>))
              }
            </section>
          </>
        )}
        {confirmAnswers && (
          <button
            type="button"
            onClick={ this.nextClick }
            data-testid="btn-next"
          >
            Próxima
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(tokenAPI()),
  totalScore: (score) => dispatch(updateScore(score)),
});

Answer.propTypes = {
  token: PropTypes.string,
  getToken: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
