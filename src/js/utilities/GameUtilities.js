class GameUtilities {
  isShipHalfPlaced(ships) {
    return !!ships.find(s => s.start && !s.end);
  }

  getHalfPlacedShip(ships) {
    return ships.find(s => s.start && !s.end);
  }
}

const gameUtilities = new GameUtilities();

export default gameUtilities;
