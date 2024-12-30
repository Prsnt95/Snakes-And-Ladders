import React from "react";
import "./TrackerView.css";

function TrackerView({ playerPositions }) {
  return (
    <div className="tracker-container">
      <ul className="pos-list">
        <li>Red: {playerPositions[0]}</li>
        <li>Blue: {playerPositions[1]}</li>
        <li>Green: {playerPositions[2]}</li>
        <li>Yellow: {playerPositions[3]}</li>
      </ul>
    </div>
  );
}

export default TrackerView;
