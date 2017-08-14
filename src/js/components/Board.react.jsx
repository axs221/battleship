import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile.react';

const Board = (props) => {
  const boardRows = [];
  for (let i = 0; i < 8; i += 1) {
    const row = [];
    for (let j = 0; j < 8; j += 1) {
      row.push(<Tile row={i} column={j} me={props.me} key={j} />);
    }
    boardRows.push(<div key={i} className="row">{row}</div>);
  }
  return (
    <div>
      {boardRows}
    </div>
  );
};

Board.propTypes = {
  me: PropTypes.bool,
};

Board.defaultProps = {
  me: false,
};

export default Board;
