import React from 'react';
import Board from './Board.react';
import GameStore from '../stores/GameStore';

class GamePage extends React.Component {
  state = {};

  componentDidMount() {
    GameStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    GameStore.removeChangeListener(this.onChange);
  }

  onChange = () => {
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <h1>Battleship</h1>
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
