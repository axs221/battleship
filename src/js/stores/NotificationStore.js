import AppDispatcher from '../dispatcher/AppDispatcher';
import NotificationConstants from '../constants/NotificationConstants';
import BaseStore from './BaseStore';

let title = '';
let message = '';
let type = '';

class NotificationStore extends BaseStore {
  getAlert() {
    return { title, message, type };
  }
}

const notificationStoreInstance = new NotificationStore();

// Register callback to handle all updates
AppDispatcher.register((action) => {
  switch (action.actionType) {
    case NotificationConstants.SHOW_MESSAGE:
      title = action.title;
      message = action.message;
      type = action.type;
      notificationStoreInstance.emitChange();
      break;
    default:
    // no op
  }
});

export default notificationStoreInstance;
