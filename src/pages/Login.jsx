import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser, tokenAPI } from '../redux/actions/index';
import logo from '../trivia.png';

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

  handleClick = async () => {
    const { getLogin, getToken, history } = this.props;
    const token = await getToken();
    const { loginEmail, loginName } = this.state;
    const player = {
      name: loginName,
      assertions: 0,
      score: 0,
      gravatarEmail: loginEmail,
    };
    getLogin(player);
    localStorage.setItem('token', token);
    history.push('/game');
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
      <>
        <img src={ logo } className="App__logo" alt="logo" />
        <form className="form-login">
          <label className="label" htmlFor="loginEmail">
            Email do Gravatar
            <input
              className="label__input"
              type="email"
              name="loginEmail"
              id="loginEmail"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
              placeholder="user@example.com"
            />
          </label>
          <label className="label" htmlFor="loginName">
            Nome do Jogador:
            <input
              className="label__input"
              type="text"
              name="loginName"
              id="loginName"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>
          <button
            className="form-login__button"
            type="button"
            data-testid="btn-play"
            disabled={ !validateEmail || !loginName.length }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
          <button
            className="form-login__button-settings"
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleConfigClick }
          >
            ⚙
          </button>

        </form>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getLogin: (user) => dispatch(getUser(user)),
  getToken: () => dispatch(tokenAPI()),
});

Login.propTypes = {
  getUser: PropTypes.func,
  getToken: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
