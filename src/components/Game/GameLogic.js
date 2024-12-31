// gameLogic.js
import { snakes, ladders } from "../Board/BoardLogic";

export const rollDice = (
  playerPositions,
  currentPlayer,
  setPlayerPositions,
  setCurrentPlayer,
  setRolling,
  setDiceValue // New parameter
) => {
  if (playerPositions[currentPlayer] >= 100) return;

  const diceRoll = Math.floor(Math.random() * 6) + 1;
  setDiceValue(diceRoll); // Update the dice value display
  const targetPosition = playerPositions[currentPlayer] + diceRoll;

  if (targetPosition <= 100) {
    setRolling(true);

    const movePlayerStepByStep = (currentPosition, targetPosition) => {
      if (currentPosition < targetPosition) {
        const newPlayerPositions = [...playerPositions];
        newPlayerPositions[currentPlayer] = currentPosition + 1;
        setPlayerPositions(newPlayerPositions);

        setTimeout(
          () => movePlayerStepByStep(currentPosition + 1, targetPosition),
          200
        );
      } else {
        let finalPosition = targetPosition;
        if (snakes[finalPosition]) {
          finalPosition = snakes[finalPosition];
        } else if (ladders[finalPosition]) {
          finalPosition = ladders[finalPosition];
        }

        const newPlayerPositions = [...playerPositions];
        newPlayerPositions[currentPlayer] = finalPosition;
        setPlayerPositions(newPlayerPositions);

        setTimeout(() => {
          setCurrentPlayer(
            (prevPlayer) => (prevPlayer + 1) % playerPositions.length
          );
          setRolling(false);
        }, 200);
      }
    };

    movePlayerStepByStep(playerPositions[currentPlayer], targetPosition);
  } else {
    setRolling(false);
  }
};
