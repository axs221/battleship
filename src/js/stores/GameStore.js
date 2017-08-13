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
  myTurn: false,
  me: {
    setup: false,
    ships: [],
    attacks: [],
    board: [],
  },
  enemy: {
    setup: false,
    attacks: [],
    board: [],
  },
};

// colours
const colourWater = 'blue';
const colourFog = '#ccc';
const colourBoat = '#888';
const colourPossibleBoat = 'yellow';
const colourAttackUnknown = 'green';
const colourAttackHit = 'red';
const colourAttackMiss = 'black';

class GameStore extends BaseStore {
  createGame = () => {
    // set us as having the first turn
    gameState.myTurn = true;

    // create our peer
    peer = new Peer({ key: 'p279t1ibr0diy66r' });

    // listen for when our peer opens
    peer.on('open', (id) => {
      peerId = id;
      this.emitChange();

      // listen for when the peer connects to us
      peer.on('connection', (conn) => {
        connection = conn;

        // hook up our handler for messages
        connection.on('data', this.processMessage);

        // start us in the setup phase
        this.startSetupPhase();

        // update the ui
        this.emitChange();
      });
    });
  }

  joinGame = (otherPeerId) => {
    // create our peer
    peer = new Peer({ key: 'p279t1ibr0diy66r' });

    // listen for when our peer opens
    peer.on('open', (id) => {
      peerId = id;

      // make a connection to the other player
      connection = peer.connect(otherPeerId);
      connection.on('open', () => {
        // hook up our handler for messages
        connection.on('data', this.processMessage);

        // start us in the setup phase
        this.startSetupPhase();

        // update the ui
        this.emitChange();
      });
    });
  }

  processMessage = (data) => {
    if (data.type === 'chat') {
      this.processChatMessage(data);
    } else if (data.type === 'setup-finished') {
      this.processSetupFinished();
    } else if (data.type === 'attack') {
      this.processAttack(data);
    }
  }

  processChatMessage = (data) => {
    NotificationActions.showMessage('Chat', data.chat, NotificationConstants.INFO);
  }

  processSetupFinished = () => {
    gameState.enemy.setup = true;
    this.checkIfSetupComplete();
    this.emitChange();
  }

  processAttack = (data) => {
    // set the colour of the attacked square
    gameState.me.board[data.row][data.column] = { colour: colourAttackUnknown };

    // set it as our turn
    this.setMyTurn();

    // update the ui
    this.emitChange();
  }

  getPeerId() {
    return peerId;
  }

  isConnected() {
    return !!connection;
  }

  placeShips = (ships) => {
    gameState.me.ships = ships;
    gameState.me.setup = true;
    this.checkIfSetupComplete();
  }

  sendMessage = (text) => {
    connection.send({ type: 'chat', chat: text });
  }

  getGameState() {
    return gameState;
  }

  checkIfSetupComplete = () => {
    if (gameState.me.setup && gameState.enemy.setup) {
      this.startPlayPhase();
    }
  }

  clickTile = (row, column) => {
    if (gameState.phase === 'setup') {
      this.handleClickSetup(row, column);
    } else {
      this.handleClickPlay(row, column);
    }
  }

  handleClickSetup = (row, column) => {
    if (gameState.me.ships.length === 0) {
      // add this start position to our ships
      gameState.me.ships.push({ start: { row, column } });

      // colour the tile and make it unclickable
      gameState.me.board[row][column] = { colour: colourBoat };

      // make the whole board unclickable
      for (let i = 0; i < 8; i += 1) {
        for (let j = 0; j < 8; j += 1) {
          gameState.me.board[i][j].clickable = false;
        }
      }

      // make the possible tiles coloured and clickable
      const possibleSpots = [{ row: row - 1, column }, { row, column: column - 1 }, { row, column: column + 1 }, { row: row + 1, column }];
      possibleSpots.forEach((spot) => {
        // see if the spot is still on the board
        // TODO also check to see if it conflicts with another boat
        if (spot.row >= 0 && spot.row <= 7 && spot.column >= 0 && spot.column <= 7) {
          gameState.me.board[spot.row][spot.column].colour = colourPossibleBoat;
          gameState.me.board[spot.row][spot.column].clickable = true;
        }
      });
    } else {
      // add this end position to our ships
      gameState.me.ships[0].end = { row, column };

      // colour the tile and make it unclickable
      gameState.me.board[row][column] = { colour: colourBoat, clickable: false };

      // hide the other possible spots
      for (let i = 0; i < 8; i += 1) {
        for (let j = 0; j < 8; j += 1) {
          if (gameState.me.board[i][j].colour === colourPossibleBoat) {
            gameState.me.board[i][j].colour = colourWater;
          }
        }
      }

      // TODO check if all boats are placed
      gameState.me.setup = true;

      // make all the spots unclickable
      for (let i = 0; i < 8; i += 1) {
        for (let j = 0; j < 8; j += 1) {
          gameState.me.board[i][j].clickable = false;
        }
      }

      // tell the enemy we're done setup
      connection.send({ type: 'setup-finished' });

      // see if we're both done setup
      this.checkIfSetupComplete();
    }

    // update the ui
    this.emitChange();
  }

  handleClickPlay = (row, column) => {
    // update our board with the pending attack
    gameState.enemy.board[row][column] = { colour: colourAttackUnknown, clickable: false };

    // send the attack to the enemy
    connection.send({ type: 'attack', row, column });

    // it's now the enemy's turn
    this.setEnemyTurn();

    // update the ui
    this.emitChange();
  }

  startSetupPhase = () => {
    // set our phase
    gameState.phase = 'setup';

    // reset the player's setup flag
    gameState.me.setup = false;
    gameState.enemy.setup = false;

    // reset our ships
    gameState.me.ships = [];

    // make our board blue and clickable and the enemy's board grey and unclickable
    for (let row = 0; row < 8; row += 1) {
      const myRow = [];
      const enemyRow = [];
      for (let column = 0; column < 8; column += 1) {
        myRow.push({ colour: colourWater, clickable: true });
        enemyRow.push({ colour: colourFog, clickable: false });
      }
      gameState.me.board.push(myRow);
      gameState.enemy.board.push(enemyRow);
    }
  }

  startPlayPhase = () => {
    // set our phase
    gameState.phase = 'play';

    // make the enemy's board clickable and our's unclickable
    for (let row = 0; row < 8; row += 1) {
      for (let column = 0; column < 8; column += 1) {
        gameState.me.board[row][column].clickable = false;
        gameState.enemy.board[row][column].clickable = true;
      }
    }

    // set whose turn it is
    if (gameState.myTurn) {
      this.setMyTurn();
    } else {
      this.setEnemyTurn();
    }
  }

  setMyTurn = () => {
    gameState.myTurn = true;

    // make the enemy's board clickable, except where attacks have already been made
    for (let row = 0; row < 8; row += 1) {
      for (let column = 0; column < 8; column += 1) {
        const attackedAlready = gameState.me.attacks.find(attack => attack.row === row && attack.column === column);
        if (!attackedAlready) {
          gameState.enemy.board[row][column].clickable = true;
        }
      }
    }
  }

  setEnemyTurn = () => {
    gameState.myTurn = false;

    // make the enemy's board unclickable
    for (let row = 0; row < 8; row += 1) {
      for (let column = 0; column < 8; column += 1) {
        gameState.enemy.board[row][column].clickable = false;
      }
    }
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
