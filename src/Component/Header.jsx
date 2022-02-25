import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { gravatarEmail, name, score } = this.props;
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

        <span className="material-icons-outlined score-content__icon-score">
          emoji_events
        </span>

        <p
          data-testid="header-score"
          className="score-content__score"
        >
          {score}
        </p>
      </header>

    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

Header.propTypes = {
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Header);
