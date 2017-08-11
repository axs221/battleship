/* @flow */
import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';
import RouterConstants from '../constants/RouterConstants';

let url = null;

class RouterStore extends BaseStore {
  push(newUrl) {
    url = newUrl;
    this.emitChange();
  }

  getUrl() {
    const returnUrl = url;
    url = null;
    return returnUrl;
  }
}

const routerStoreInstance = new RouterStore();

// Register callback to handle all updates
AppDispatcher.register((action) => {
  switch (action.actionType) {
    case RouterConstants.PUSH:
      routerStoreInstance.push(action.url);
      break;
    default:
    // no op
  }
});

export default routerStoreInstance;
