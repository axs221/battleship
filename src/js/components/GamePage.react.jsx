import React from 'react';
import PropTypes from 'prop-types';
import Board from './Board.react';

class GamePage extends React.Component {
  static propTypes = {
    match: PropTypes.shape({ params: PropTypes.shape({ gameId: PropTypes.string }) }).isRequired,
  }

  state = {};

  render() {
    return (
      <div>
        <h1>Battleship - {this.props.match.params.gameId}</h1>
        <div className="row">
          <div className="col-md-6">
            <h3>You</h3>
            <Board />
          </div>
          <div className="col-md-6">
            <h3>Enemy</h3>
            <Board />
          </div>
        </div>
      </div>
    );
  }
}

export default GamePage;
