import AppDispatcher from '../dispatcher/AppDispatcher';
import GameConstants from '../constants/GameConstants';

const GameActions = {
  createGame() {
    AppDispatcher.dispatch({
      actionType: GameConstants.CREATE_GAME,
    });
  },
  joinGame(otherPeerId) {
    AppDispatcher.dispatch({
      actionType: GameConstants.JOIN_GAME,
      otherPeerId,
    });
  },
  placeShips(ships) {
    AppDispatcher.dispatch({
      actionType: GameConstants.PLACE_SHIPS,
      ships,
    });
  },
  sendMessage(text) {
    AppDispatcher.dispatch({
      actionType: GameConstants.SEND_MESSAGE,
      text,
    });
  },
  clickTile(row, column) {
    AppDispatcher.dispatch({
      actionType: GameConstants.CLICK_TILE,
      row,
      column,
    });
  },
};

export default GameActions;
