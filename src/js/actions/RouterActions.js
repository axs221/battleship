import AppDispatcher from '../dispatcher/AppDispatcher';
import RouterConstants from '../constants/RouterConstants';

const RouterActions = {
  push(url) {
    AppDispatcher.dispatch({
      actionType: RouterConstants.PUSH,
      url,
    });
  },
};

module.exports = RouterActions;
