import React from 'react';
import PropTypes from 'prop-types';

class GamePage extends React.Component {
  static propTypes = {
    match: PropTypes.shape({ params: PropTypes.shape({ gameId: PropTypes.string }) }).isRequired,
  }

  state = {};

  render() {
    return (
      <div>
        <h1>Battleship - {this.props.match.params.gameId}</h1>
      </div>
    );
  }
}

export default GamePage;
