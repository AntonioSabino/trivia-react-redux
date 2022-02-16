import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchTrivia from '../services/fetchTrivia';
import { tokenAPI } from '../redux/actions/index';

class Answer extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      questNumber: 0,
      randomQuestions: [],
    };
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  redirectEndGame = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  nextClick = () => {
    const { questNumber } = this.state;
    const MAX_LENGTH = 4;
    if (questNumber === MAX_LENGTH) {
      this.redirectEndGame();
    } else {
      this.setState((prevState) => (
        { questNumber: prevState.questNumber + 1 }
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
    }, this.sortQuestion(resolve));
  }

  render() {
    const { questions, questNumber, randomQuestions } = this.state;
    const index = 0;
    console.log(questions);
    return (
      <div>
        {questions.length > 0 && (
          <>
            <h3 data-testid="question-category">{questions[questNumber].category}</h3>
            <h3 data-testid="question-text">{questions[questNumber].question}</h3>
            <section data-testid="answer-options">
              {
                randomQuestions[questNumber]
                  .map((answer) => (
                    <button
                      type="button"
                      key={ answer }
                      data-testid={ answer[0] === 'correctAnswers'
                        ? 'correct-answer'
                        : `wrong-answer-${index}` }
                    >
                      {answer[1]}
                    </button>))
              }
            </section>
          </>
        )}
        <button
          type="button"
          onClick={ this.nextClick }
        >
          Próxima
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(tokenAPI()),
});

Answer.propTypes = {
  token: PropTypes.string,
  getToken: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
