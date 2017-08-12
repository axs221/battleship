import React from 'react';
import PropTypes from 'prop-types';
import GameActions from '../actions/GameActions';
import GameStore from '../stores/GameStore';
import GameUtilities from '../utilities/GameUtilities';

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
    // get the game state
    const gameState = GameStore.getGameState();

    if (this.props.me) {
      if (gameState.phase === 'setup') {
        if (gameState.me.ships.find(s => (s.start.row === this.props.row && s.start.column === this.props.column))) {
          // draw ship tile
          return <p style={{ backgroundColor: '#888', width: '50px', height: '50px' }} />;
        }
        if (gameState.me.ships.find(s => (s.end && s.end.row === this.props.row && s.end.column === this.props.column))) {
          // draw ship tile
          return <p style={{ backgroundColor: '#888', width: '50px', height: '50px' }} />;
        }
        if (GameUtilities.isShipHalfPlaced(gameState.me.ships)) {
          const ship = GameUtilities.getHalfPlacedShip(gameState.me.ships);
          if (((this.props.row === ship.start.row + 1) && (this.props.column === ship.start.column)) ||
              ((this.props.row === ship.start.row - 1) && (this.props.column === ship.start.column)) ||
              ((this.props.row === ship.start.row) && (this.props.column === ship.start.column + 1)) ||
              ((this.props.row === ship.start.row) && (this.props.column === ship.start.column - 1))) {
            // draw possible ship ending tile
            return <p style={{ backgroundColor: 'yellow', width: '50px', height: '50px', cursor: 'pointer' }} onClick={() => GameActions.clickTile(this.props.row, this.props.column)} />;
          }
          // draw unclickable water tile
          return <p style={{ backgroundColor: 'blue', width: '50px', height: '50px' }} />;
        }
        // draw clickable water tile
        return <p style={{ backgroundColor: 'blue', width: '50px', height: '50px', cursor: 'pointer' }} onClick={() => GameActions.clickTile(this.props.row, this.props.column)} />;
      }

      // draw unclickable water tile
      return <p style={{ backgroundColor: 'blue', width: '50px', height: '50px' }} />;
    }

    // draw unclickable unknown tile
    return <p style={{ backgroundColor: '#888', width: '50px', height: '50px' }} />;
  }
}

export default Tile;
