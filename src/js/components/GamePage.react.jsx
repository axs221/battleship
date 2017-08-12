import React from 'react';
import Board from './Board.react';
import GameStore from '../stores/GameStore';
import GameActions from '../actions/GameActions';

class GamePage extends React.Component {
  state = {
    chatMessage: '',
  };

  componentDidMount() {
    GameStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    GameStore.removeChangeListener(this.onChange);
  }

  onChange = () => {
    this.forceUpdate();
  }

  sendChat = (e) => {
    e.preventDefault();
    GameActions.sendMessage(this.state.chatMessage);
    this.setState({ chatMessage: '' });
  }

  render() {
    const gameState = GameStore.getGameState();
    let banner = gameState.phase;
    if (gameState.phase === 'play') {
      let turn = 'Your Turn';
      if (!gameState.myTurn) {
        turn = 'Enemy Turn';
      }
      banner = turn;
    }
    return (
      <div>
        <h1>Battleship - {banner}</h1>;
        <div className="row">
          <div className="col-md-6">
            <h3>You</h3>
            <Board phase={gameState.phase} me />
          </div>
          <div className="col-md-6">
            <h3>Enemy</h3>
            <Board />
          </div>
        </div>
        <form onSubmit={e => e.preventDefault}>
          <input type="text" value={this.state.chatMessage} onChange={e => this.setState({ chatMessage: e.target.value })} />
          <button onClick={this.sendChat} type="submit">Send Chat</button>
        </form>
      </div>
    );
  }
}

export default GamePage;
