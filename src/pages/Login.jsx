import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      loginEmail: '',
      loginName: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleConfigClick = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { loginEmail, loginName } = this.state;
    /**
      * Validação com Regex consultada em
      * https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    */
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const validateEmail = emailRegex.test(loginEmail);
    return (
      <form>
        Email do Gravatar:
        <label htmlFor="loginEmail">
          Email do Gravatar
          <input
            type="email"
            name="loginEmail"
            id="loginEmail"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="loginName">
          Nome do Jogador:
          <input
            type="text"
            name="loginName"
            id="loginName"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !validateEmail || !loginName.length }
          onClick={ this.handleClick }
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleConfigClick }
        >
          ⚙
        </button>

      </form>
    );
  }
}
Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;
export default Login;
