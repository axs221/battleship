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
};

export default GameActions;
