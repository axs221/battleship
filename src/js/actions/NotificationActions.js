import AppDispatcher from '../dispatcher/AppDispatcher';
import NotificationConstants from '../constants/NotificationConstants';

const NotificationActions = {
  showMessage(title, message, type) {
    AppDispatcher.dispatch({
      actionType: NotificationConstants.SHOW_MESSAGE,
      title,
      message,
      type,
    });
  },

};

export default NotificationActions;
