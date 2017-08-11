import AppDispatcher from '../dispatcher/AppDispatcher';
import GameConstants from '../constants/GameConstants';

const GameActions = {
  push(url) {
    AppDispatcher.dispatch({
      actionType: GameConstants.CONNECT,
      url,
    });
  },
};

export default GameActions;
