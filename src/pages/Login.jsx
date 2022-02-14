import React, { Component } from 'react';

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

  handleClick = () => {
    console.log('Clicou');
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
      </form>
    );
  }
}

export default Login;
