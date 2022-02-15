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
      <header className="header">
        <div className="player-container">
          <img
            src={ srcImg }
            alt="avatar"
            data-testid="header-profile-picture"
            className="player-container__user-image"
          />

          <h2
            data-testid="header-player-name"
            className="player-container__username"
          >
            {name}
          </h2>
        </div>

        <div className="score-content">
          <span className="material-icons-outlined score-content__icon-score">
            emoji_events
          </span>

          <p
            data-testid="header-score"
            className="score-content__score"
          >
            {score}
          </p>
        </div>
      </header>

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
