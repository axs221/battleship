import React from 'react';
import PropTypes from 'prop-types';
import RouterActions from '../actions/RouterActions';
import GameStore from '../stores/GameStore';
import GameActions from '../actions/GameActions';

class JoinPage extends React.Component {
  static propTypes = {
    match: PropTypes.shape({ params: PropTypes.shape({ otherPeerId: PropTypes.string }) }).isRequired,
  }

  componentDidMount() {
    GameStore.addChangeListener(this.onChange);
    GameActions.joinGame(this.props.match.params.otherPeerId);
  }

  componentWillUnmount() {
    GameStore.removeChangeListener(this.onChange);
  }

  onChange = () => {
    if (GameStore.isConnected()) {
      RouterActions.push('/game');
    }
  }

  render() {
    return (
      <div>
        <h1>Battleship</h1>
        <p>Waiting for connnection...</p>
      </div>
    );
  }
}

export default JoinPage;
