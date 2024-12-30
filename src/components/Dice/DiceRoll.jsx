// DiceRoll.jsx
import React from "react";
import "./DiceRoll.css"; // Optional: Add styles specific to DiceRoll
// import dice_1 from "../../assets/dice-1.png";
// import dice_2 from "../../assets/dice-1.png"
// import dice_3 from "../../assets/dice-1.png"
// import dice_4 from "../../assets/dice-1.png"
// import dice_5 from "../../assets/dice-1.png"
// import dice_6 from "../../assets/dice-1.png"

const DiceRoll = ({
  rollDice,
  playerPositions,
  currentPlayer,
  setPlayerPositions,
  setCurrentPlayer,
  rolling,
}) => {
  return (
    <button
      onClick={() =>
        rollDice(
          playerPositions,
          currentPlayer,
          setPlayerPositions,
          setCurrentPlayer
        )
      }
      disabled={rolling} // Disable the button when rolling is true
    >
      Roll Dice
    </button>
  );
};

export default DiceRoll;
