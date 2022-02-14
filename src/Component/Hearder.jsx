import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      score: 0,
    };
  }

  render() {
    const { email, name, score } = this.state;
    // const {email, score} =this.props
    const criptoEmail = md5(email).toString();
    const srcImg = `https://www.gravatar.com/avatar/${criptoEmail}`;
    return (
      <section>
        <img
          src={ srcImg }
          alt="avatar"
          data-testid="header-profile-picture"
        />

        <h2
          data-testid="header-player-name"
        >
          {name}
        </h2>

        <p
          data-testid="header-score"
        >
          {score}
        </p>
      </section>

    );
  }
}

const mapStateToProps = (state) => ({
  get: state.nomeDoReducer.dados,
});

export default connect(mapStateToProps, null)(Header);
