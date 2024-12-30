// gameLogic.js
import { snakes, ladders } from "../Board/BoardLogic";

// Function to handle dice roll and player movement
export const rollDice = (
  playerPositions,
  currentPlayer,
  setPlayerPositions,
  setCurrentPlayer,
  setRolling // Add this parameter
) => {
  if (playerPositions[currentPlayer] >= 100) return; // Prevent rolling if the player already won

  const diceRoll = Math.floor(Math.random() * 6) + 1; // Roll a number between 1 and 6
  const targetPosition = playerPositions[currentPlayer] + diceRoll;

  if (targetPosition <= 100) {
    setRolling(true); // Disable the Dice Roll button

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
          finalPosition = snakes[finalPosition]; // Snake encountered
        } else if (ladders[finalPosition]) {
          finalPosition = ladders[finalPosition]; // Ladder encountered
        }

        const newPlayerPositions = [...playerPositions];
        newPlayerPositions[currentPlayer] = finalPosition;
        setPlayerPositions(newPlayerPositions);

        // Switch to the next player
        setTimeout(() => {
          setCurrentPlayer(
            (prevPlayer) => (prevPlayer + 1) % playerPositions.length
          );
          setRolling(false); // Re-enable the Dice Roll button after the turn
        }, 200); // Small delay to avoid premature enabling
      }
    };

    movePlayerStepByStep(playerPositions[currentPlayer], targetPosition);
  } else {
    setRolling(false); // Re-enable if no move is made
  }
};
