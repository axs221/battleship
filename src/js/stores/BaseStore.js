/* @flow */
import EventEmitter from 'events';

const CHANGE_EVENT = 'change';

class BaseStore extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback: any) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback: any) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

export default BaseStore;
