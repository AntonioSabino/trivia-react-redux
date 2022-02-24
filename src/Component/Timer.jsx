import React from 'react';
import PropTypes from 'prop-types';
/* coolDown feito através da consulta desse link */
/* https://stackblitz.com/edit/react-timer-without-state */

class Timer extends React.Component {
  render() {
    const { seconds } = this.props;
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
