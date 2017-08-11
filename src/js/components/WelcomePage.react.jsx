import React from 'react';
import RouterActions from '../actions/RouterActions';

class WelcomePage extends React.Component {
  onStart = () => {
    // send the user to the newly created game
    RouterActions.push('/wait');
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
