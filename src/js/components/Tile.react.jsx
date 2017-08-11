import React from 'react';
import PropTypes from 'prop-types';
import GameActions from '../actions/GameActions';
import GameStore from '../stores/GameStore';

class Tile extends React.Component {
  static propTypes = {
    me: PropTypes.bool,
    row: PropTypes.number.isRequired,
    column: PropTypes.number.isRequired,
  };

  static defaultProps = {
    me: false,
    onClick: () => {},
  };

  render() {
    const gameState = GameStore.getGameState();
    let clickable = true;
    let colour = '#ccc';
    if (this.props.me) {
      const shipStart = gameState.me.ships.find((s) => { return (s.start.row === this.props.row && s.start.column === this.props.column); });
      const shipEnd = gameState.me.ships.find((s) => { return (s.end && s.end.row === this.props.row && s.end.column === this.props.column); });
      if (shipStart || shipEnd) {
        clickable = false;
        colour = '#888';
      } else {
        colour = 'blue';
      }
    } else {
      clickable = false;
    }
    if (clickable) {
      return <p style={{ backgroundColor: colour, width: '50px', height: '50px', cursor: 'pointer' }} onClick={() => GameActions.clickTile(this.props.row, this.props.column)} />;
    }
    return <p style={{ backgroundColor: colour, width: '50px', height: '50px' }} />;
  }
}

export default Tile;
