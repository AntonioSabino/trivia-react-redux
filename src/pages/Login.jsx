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
    console.log(value.length);
  }

  handleClick = () => {
    console.log('Clicou');
  }

  render() {
    const { loginEmail, loginName } = this.state;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const validateEmail = emailRegex.test(loginEmail);
    return (
      <form>
        Email do Gravatar:
        <input
          type="email"
          name="loginEmail"
          id="loginEmail"
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
        />
        Nome do Jogador:
        <input
          type="text"
          name="loginName"
          id="loginName"
          data-testid="input-player-name"
          onChange={ this.handleChange }
        />
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
