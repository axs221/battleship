import React from 'react';
import { Redirect } from 'react-router-dom';
import GameStore from '../stores/GameStore';
import GameActions from '../actions/GameActions';

class WaitingPage extends React.Component {
  componentDidMount() {
    GameStore.addChangeListener(this.onChange);
    GameActions.createGame();
  }

  componentWillUnmount() {
    GameStore.removeChangeListener(this.onChange);
  }

  onChange = () => {
    this.forceUpdate();
  }

  render() {
    if (GameStore.isConnected()) {
      return <Redirect to="/game" />;
    }
    const peerId = GameStore.getPeerId();
    if (!peerId) {
      return (
        <div className="container-fluid">
          <h1>Battleship</h1>
          <p>Creating game...</p>
        </div>
      );
    }
    return (
      <div className="container-fluid">
        <h1>Battleship</h1>
        <p>Tell your friend to connect to http://battleship.mikecousins.com/join/{GameStore.getPeerId()}</p>
        <p>Waiting for friend...</p>
      </div>
    );
  }
}

export default WaitingPage;
