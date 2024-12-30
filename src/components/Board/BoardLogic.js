// boardLogic.js

export const snakes = {
  47: 26,
  49: 7,
  82: 41,
  87: 24,
  93: 73,
  98: 18,
};

export const ladders = {
  4: 14,
  17: 38,
  9: 31,
  21: 42,
  28: 84,
  36: 44,
  51: 67,
  71: 91,
  56: 94,
};

// Function to check if a player is at a given position
export const getPlayerPosition = (playerPositions, cell) => {
  return playerPositions.map((pos, playerIndex) =>
    pos === cell ? (
      <span key={playerIndex} className={`player player-${playerIndex + 1}`}>
        P{playerIndex + 1}
      </span>
    ) : null
  );
};

// Function to check if there is a snake at the given position
export const getSnake = (cell) => {
  return Object.keys(snakes).map((snakeStart) => {
    if (parseInt(snakeStart) === cell) {
      return (
        <div
          key={`snake-${cell}`}
          className="snake"
          style={{
            left: "50%",
            top: "50%",
          }}
        >
          🐍
        </div>
      );
    }
    return null;
  });
};

// Function to check if there is a ladder at the given position
export const getLadder = (cell) => {
  return Object.keys(ladders).map((ladderStart) => {
    if (parseInt(ladderStart) === cell) {
      return (
        <div
          key={`ladder-${cell}`}
          className="ladder"
          style={{
            left: "50%",
            top: "50%",
          }}
        >
          🪜
        </div>
      );
    }
    return null;
  });
};
