import React from 'react';
import { Redirect } from 'react-router-dom';
import GameStore from '../stores/GameStore';
import GameActions from '../actions/GameActions';

class WelcomePage extends React.Component {
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
        <div className="container welcome">
          <div className="jumbotron">
            <h1 className="display-3">Battleship</h1>
            <p>Creating game...</p>
          </div>
        </div>
      );
    }
    const url = `http://battleship.mikecousins.com/join/${GameStore.getPeerId()}`;
    return (
      <div className="container welcome">
        <div className="jumbotron">
          <h1 className="display-3">Battleship</h1>
          <p>Tell your friend to connect to <a href={url} target="_blank">{url}</a></p>
          <p>Waiting for friend...</p>
        </div>
      </div>
    );
  }
}

export default WelcomePage;
