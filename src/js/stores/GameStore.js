/* @flow */
import Peer from 'peerjs';
import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';
import GameConstants from '../constants/GameConstants';

let peer = null;
let peerId = null;
let connection = null;

class GameStore extends BaseStore {
  createGame() {
    // create our peer
    peer = new Peer({ key: 'p279t1ibr0diy66r' });

    // listen for when our peer opens
    peer.on('open', (id) => {
      peerId = id;
      console.log('open', id);
      this.emitChange();

      // listen for when the peer connects to us
      peer.on('connection', (conn) => {
        console.log('peer connected');
        connection = conn;
        this.emitChange();
      });
    });
  }

  joinGame(otherPeerId: string) {
    // create our peer
    peer = new Peer({ key: 'p279t1ibr0diy66r' });

    // listen for when our peer opens
    peer.on('open', (id) => {
      peerId = id;
      console.log('open', id);

      // make a connection to the other player
      console.log('connecting to ', otherPeerId);
      connection = peer.connect(otherPeerId);
      connection.on('open', () => {
        console.log('peer connected');
        this.emitChange();
      });
    });
  }

  getPeerId() {
    return peerId;
  }

  isConnected() {
    return !!connection;
  }
}

const gameStoreInstance = new GameStore();

// Register callback to handle all updates
AppDispatcher.register((action) => {
  switch (action.actionType) {
    case GameConstants.CREATE_GAME:
      gameStoreInstance.createGame();
      break;
    case GameConstants.JOIN_GAME:
      gameStoreInstance.joinGame(action.otherPeerId);
      break;
    default:
    // no op
  }
});

export default gameStoreInstance;
