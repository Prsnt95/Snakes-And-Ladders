import React from "react";
import "./DiceRoll.css";

const DiceRoll = ({ onRollDice, rolling }) => {
  return (
    <button
      className={`dice-button ${rolling ? "rolling" : ""}`}
      onClick={onRollDice}
      disabled={rolling}
    >
      Roll Dice
    </button>
  );
};

export default DiceRoll;
