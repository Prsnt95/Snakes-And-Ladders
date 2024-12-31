import React from "react";
import "./DiceDisplay.css";
const DiceDisplay = ({ rollValue }) => {
  return (
    <div className="dice-display ">
      <span className="text">{rollValue || "-"}</span>
    </div>
  );
};

export default DiceDisplay;
