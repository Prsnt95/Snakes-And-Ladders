import React, { useState } from "react";
import "./Settings.css";

function Settings({ numPlayers, confirmPlayerChange, rolling }) {
  const [tempPlayers, setTempPlayers] = useState(numPlayers); // Temporary local state

  const handleInputChange = (event) => {
    const players = parseInt(event.target.value, 10);
    if (players >= 2 && players <= 4) {
      setTempPlayers(players); // Update local state without affecting the game
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      confirmPlayerChange(tempPlayers); // Apply changes only when Enter is pressed
    }
  };

  const handleButtonClick = () => {
    confirmPlayerChange(tempPlayers); // Apply changes when the button is clicked
  };

  return (
    <div className="settings-container">
      <h3>Settings</h3>
      <div className="settings-list">
        <label htmlFor="player-count">Number of Players: </label>
        <input
          id="player-count"
          type="number"
          min="2"
          max="6"
          value={tempPlayers}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress} // Correct event name for key press
          disabled={rolling} // Disable input during rolling
        />
        <button onClick={handleButtonClick} disabled={rolling}>
          Enter
        </button>
      </div>
    </div>
  );
}

export default Settings;
