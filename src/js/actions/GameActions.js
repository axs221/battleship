import AppDispatcher from '../dispatcher/AppDispatcher';
import GameConstants from '../constants/GameConstants';

const GameActions = {
  connect(gameId) {
    AppDispatcher.dispatch({
      actionType: GameConstants.CONNECT,
      gameId,
    });
  },
};

export default GameActions;
