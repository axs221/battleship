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

  it('should start finish phase properly', () => {
    GameStore.startFinishPhase(true);
    const gameState = GameStore.getGameState();
    expect(gameState.phase).toBe('finished');
    expect(gameState.winner).toBe(true);
  });
});
