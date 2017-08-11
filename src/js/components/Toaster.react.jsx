import React from 'react';
import { ToastContainer, ToastMessageFactory } from 'react-toastr2';
import NotificationStore from '../stores/NotificationStore';
import NotificationConstants from '../constants/NotificationConstants';

class Toaster extends React.Component {
  componentDidMount() {
    NotificationStore.addChangeListener(this.addAlert);
  }

  componentWillUnmount() {
    NotificationStore.removeChangeListener(this.addAlert);
  }

  addAlert = () => {
    const alert = NotificationStore.getAlert();
    const message = alert.message;
    const title = alert.title;
    const type = alert.type;
    const optionsOverride = {
      timeOut: 5000,
      extendedTimeOut: 1500,
    };

    switch (type) {
      case NotificationConstants.ERROR:
        this.container.error(message, title, optionsOverride);
        break;
      case NotificationConstants.WARNING:
        this.container.warning(message, title, optionsOverride);
        break;
      case NotificationConstants.INFO:
        this.container.info(message, title, optionsOverride);
        break;
      default:
        this.container.success(message, title, optionsOverride);
    }
  }

  render() {
    return (
      <ToastContainer
        ref={(c) => { this.container = c; }}
        toastMessageFactory={ToastMessageFactory}
        className="toast-bottom-right"
      />
    );
  }
}

module.exports = Toaster;
