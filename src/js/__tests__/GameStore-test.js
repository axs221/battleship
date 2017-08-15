import GameStore from '../stores/GameStore';

describe('A suite', () => {
  it('should initialize game state properly', () => {
    const gameState = GameStore.getGameState();
    expect(gameState.phase).toBe('setup');
  });

  it('should start setup phase properly', () => {
    GameStore.startSetupPhase();
    const gameState = GameStore.getGameState();
    expect(gameState.phase).toBe('setup');
    expect(gameState.me.setup).toBe(false);
    expect(gameState.enemy.setup).toBe(false);
  });

  it('should start play phase properly', () => {
    GameStore.startPlayPhase();
    const gameState = GameStore.getGameState();
    expect(gameState.phase).toBe('play');
  });

  it('should handle enemy turn change properly', () => {
    GameStore.setEnemyTurn();
    const gameState = GameStore.getGameState();
    expect(gameState.myTurn).toBe(false);
    expect(gameState.enemy.board[0][0].clickable).toBe(false);
  });

  it('should handle my turn change properly', () => {
    GameStore.setMyTurn();
    const gameState = GameStore.getGameState();
    expect(gameState.myTurn).toBe(true);
    expect(gameState.enemy.board[0][0].clickable).toBe(true);
  });

  it('should start finish phase properly', () => {
    GameStore.startFinishPhase(true);
    const gameState = GameStore.getGameState();
    expect(gameState.phase).toBe('finished');
    expect(gameState.winner).toBe(true);
  });
});
