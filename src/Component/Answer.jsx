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
      responseCode: 0,
    };
  }

  componentDidMount() {
    this.fetchQuestions();
    this.notToken();
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

  async notToken() {
    const VALIDATE_CODE = 3;
    const { getToken } = this.props;
    const { responseCode } = this.state;
    if (responseCode === VALIDATE_CODE) {
      const token = await getToken();
      localStorage.setItem('token', token);
    }
  }

  async fetchQuestions() {
    const resolve = await fetchTrivia();
    this.setState({
      questions: resolve.results,
      responseCode: resolve.response_code,
    });
  }

  render() {
    const { questions, questNumber } = this.state;
    const index = 0;
    console.log(questions[0]);
    return (
      <div>
        {questions.length > 0 && (
          <>
            <h3 data-testid="question-category">{questions[questNumber].category}</h3>
            <h3 data-testid="question-text">{questions[questNumber].question}</h3>
            <section data-testid="answer-options">
              <button type="button" data-testid="correct-answer">
                {questions[questNumber].correct_answer}
              </button>
              {
                questions[questNumber].incorrect_answers
                  .map((answer) => (
                    <button
                      type="button"
                      key={ answer }
                      data-testid={ `wrong-answer-${index}` }
                    >
                      {answer}
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

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(tokenAPI()),
});

Answer.propTypes = {
  getToken: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default connect(null, mapDispatchToProps)(Answer);
