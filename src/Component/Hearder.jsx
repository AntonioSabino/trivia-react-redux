import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      // email: '',
      // name: '',
      score: 0,
    };
  }

  render() {
    const { score } = this.state;
    const { gravatarEmail, name } = this.props;
    const criptoEmail = md5(gravatarEmail).toString();
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
  name: state.user.player.name,
  gravatarEmail: state.user.player.gravatarEmail,

});

Header.propTypes = {
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Header);
