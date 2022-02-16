import React from 'react';
import PropTypes from 'prop-types';

const ONE_SECOND = 1000;
/* coolDown feito através da consulta desse link */
/* https://stackblitz.com/edit/react-timer-without-state */

class Timer extends React.Component {
  constructor() {
    super();

    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    this.coolDown();
  }

  coolDown = () => {
    const interval = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds > 0 ? prevState.seconds - 1 : prevState.seconds,
      }));
      const { seconds } = this.state;
      const { disabledButtons } = this.props;
      if (seconds === 0) {
        clearInterval(interval);
        disabledButtons();
      }
    }, ONE_SECOND);
  }

  render() {
    const { seconds } = this.state;
    return (
      <h3>
        Timer:
        {' '}
        {seconds}
      </h3>
    );
  }
}

Timer.propTypes = {
  disabledButtons: PropTypes.func,
}.isRequired;

export default Timer;
