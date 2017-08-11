import React from 'react';
import RouterActions from '../actions/RouterActions';

class WelcomePage extends React.Component {
  state = {};

  onStart = () => {
    RouterActions.push('/game/1');
  }

  render() {
    return (
      <div>
        <h1>Battleship</h1>
        <input type="text" placeholder="Friend's Phone Number" value={this.state.phoneNumber} onChange={e => this.setState({ phoneNumber: e.target.value })} />
        <button onClick={this.onStart}>Start</button>
      </div>
    );
  }
}

export default WelcomePage;
