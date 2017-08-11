import React from 'react';
import RouterActions from '../actions/RouterActions';

class WelcomePage extends React.Component {
  onStart = () => {
    // TODO create unique game id

    // send the user to the newly created game
    RouterActions.push('/game/1');
  }

  render() {
    return (
      <div>
        <h1>Battleship</h1>
        <button onClick={this.onStart}>Start</button>
      </div>
    );
  }
}

export default WelcomePage;
