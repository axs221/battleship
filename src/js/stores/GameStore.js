import Peer from 'peerjs';
import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';
import GameConstants from '../constants/GameConstants';
import NotificationActions from '../actions/NotificationActions';
import NotificationConstants from '../constants/NotificationConstants';

let peer = null;
let peerId = null;
let connection = null;
const gameState = {
  phase: 'setup',
  me: {
    setup: false,
    ships: [],
    attacks: [],
  },
  enemy: {
    setup: false,
    attacks: [],
  },
};

class GameStore extends BaseStore {
  createGame() {
    // create our peer
    peer = new Peer({ key: 'p279t1ibr0diy66r' });

    // listen for when our peer opens
    peer.on('open', (id) => {
      peerId = id;
      this.emitChange();

      // listen for when the peer connects to us
      peer.on('connection', (conn) => {
        connection = conn;
        this.emitChange();

        // hook up our handler for messages
        connection.on('data', this.processMessage);
      });
    });
  }

  joinGame(otherPeerId) {
    // create our peer
    peer = new Peer({ key: 'p279t1ibr0diy66r' });

    // listen for when our peer opens
    peer.on('open', (id) => {
      peerId = id;

      // make a connection to the other player
      connection = peer.connect(otherPeerId);
      connection.on('open', () => {
        this.emitChange();

        // hook up our handler for messages
        connection.on('data', this.processMessage);
      });
    });
  }

  processMessage = (data) => {
    if (data.type === 'chat') {
      this.processChatMessage(data);
    } else if (data.type === 'setup-finished') {
      this.processGameState(data);
    }
  }

  processChatMessage(data) {
    NotificationActions.showMessage('Chat', data.chat, NotificationConstants.INFO);
  }

  processSetupFinished(data) {
    gameState.enemy.setup = true;
    this.checkIfSetupComplete();
    this.emitChange();
  }

  getPeerId() {
    return peerId;
  }

  isConnected() {
    return !!connection;
  }

  placeShips(ships) {
    gameState.me.ships = ships;
    gameState.me.setup = true;
    this.checkIfSetupComplete();
  }

  sendMessage(text) {
    connection.send({ type: 'chat', chat: text });
  }

  getGameState() {
    return gameState;
  }

  checkIfSetupComplete() {
    if (gameState.me.setup && gameState.enemy.setup) {
      gameState.phase = 'play';
    }
  }

  clickTile(row, column) {
    if (gameState.phase === 'setup') {
      this.handleClickSetup(row, column);
    } else {
      this.handleClickPlay(row, column);
    }
  }

  handleClickSetup(row, column) {
    if (gameState.me.ships.length === 0) {
      gameState.me.ships.push({ start: { row, column } });
    } else {
      gameState.me.ships[0].end = { row, column };
    }
    this.emitChange();
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
    case GameConstants.PLACE_SHIPS:
      gameStoreInstance.placeShips(action.ships);
      break;
    case GameConstants.CLICK_TILE:
      gameStoreInstance.clickTile(action.row, action.column);
      break;
    case GameConstants.SEND_MESSAGE:
      gameStoreInstance.sendMessage(action.text);
      break;
    default:
    // no op
  }
});

export default gameStoreInstance;
