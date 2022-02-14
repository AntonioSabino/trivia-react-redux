import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser, tokenAPI } from '../redux/actions/index';

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
    const user = {
      name: loginName,
      assertions: 0,
      score: 0,
      gravatarEmail: loginEmail,
    };
    getLogin(user);
    localStorage.setItem('token', token);
    // history.push('/game');
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
