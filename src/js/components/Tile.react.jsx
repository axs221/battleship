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
    // get the game state
    const gameState = GameStore.getGameState();

    let colour = '#ccc';
    let clickable = false;
    if (this.props.me) {
      colour = gameState.me.board[this.props.row][this.props.column].colour;
      clickable = gameState.me.board[this.props.row][this.props.column].clickable;
    } else {
      colour = gameState.enemy.board[this.props.row][this.props.column].colour;
      clickable = gameState.enemy.board[this.props.row][this.props.column].clickable;
    }

    if (clickable) {
      return <p style={{ backgroundColor: colour, width: '50px', height: '50px', cursor: 'pointer' }} onClick={() => GameActions.clickTile(this.props.row, this.props.column)} />;
    }
    return <p style={{ backgroundColor: colour, width: '50px', height: '50px' }} />;
  }
}

export default Tile;
