import React from 'react';
import RouterActions from '../actions/RouterActions';
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
    if (GameStore.isConnected()) {
      RouterActions.push('/game');
    } else {
      this.forceUpdate();
    }
  }

  render() {
    const peerId = GameStore.getPeerId();
    if (!peerId) {
      return (
        <div>
          <h1>Battleship</h1>
          <p>Creating game...</p>
        </div>
      );
    }
    return (
      <div>
        <h1>Battleship</h1>
        <p>Tell your friend to connect to http://battleship.netlify.com/join/{GameStore.getPeerId()}</p>
        <p>Waiting for friend...</p>
      </div>
    );
  }
}

export default WaitingPage;
