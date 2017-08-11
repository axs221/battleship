import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile.react';

const Board = (props) => {
  const boardRows = [];
  for (let i = 0; i < 8; i += 1) {
    const row = [];
    for (let j = 0; j < 8; j += 1) {
      row.push(
        <div className="col-md-1" key={j}>
          <Tile row={i} column={j} me={props.me} />
        </div>);
    }
    boardRows.push(<div className="row" key={i}>{row}</div>);
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
