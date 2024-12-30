import React from "react";
import "./turn.css";

function TurnView({ turn }) {
  let player_map = {
    1: "Red",
    2: "Blue",
    3: "Green",
    4: "Yellow",
  };

  return (
    <div className="turnContainer">
      Turn
      <h2 className={`turn-${turn}`}>{player_map[turn]}</h2>
      <div className={`turn-${turn}-bg`}></div>
    </div>
  );
}

export default TurnView;
