import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
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
    this.forceUpdate();
  }

  render() {
    if (GameStore.isConnected()) {
      return <Redirect to="/game" />;
    }
    return (
      <div className="container-fluid">
        <h1>Battleship</h1>
        <p>Waiting for connnection...</p>
      </div>
    );
  }
}

export default JoinPage;
