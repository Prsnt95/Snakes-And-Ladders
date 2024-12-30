import React, { useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import { rollDice } from "./components/Game/GameLogic";
import DiceRoll from "./components/Dice/DiceRoll";
import TurnView from "./components/Turn/TurnView";
import TrackerView from "./components/TrackerView/TrackerView";

function App() {
  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);
  const [board] = useState(numbers);
  const initialPositions = [1, 1, 1, 1];
  const [playerPositions, setPlayerPositions] = useState([90, 94, 94, 93]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [rolling, setRolling] = useState(false); // Track if the dice roll is in progress

  return (
    <div className="App">
      <h1 className="gameTitle">Snakes & Ladders</h1>
      <div className="board_dice">
        <TurnView turn={currentPlayer + 1} />

        <Board board={board} playerPositions={playerPositions} />
        <DiceRoll
          rollDice={(...args) => rollDice(...args, setRolling)} // Pass setRolling to rollDice
          playerPositions={playerPositions}
          currentPlayer={currentPlayer}
          setPlayerPositions={setPlayerPositions}
          setCurrentPlayer={setCurrentPlayer}
          rolling={rolling} // Pass rolling state to the DiceRoll component
        />
        <button
          onClick={() => {
            setPlayerPositions(initialPositions);
            setCurrentPlayer(0);
          }}
          disabled={rolling} // Disable the reset button during rolling
          className="reset-btn"
        >
          Reset
        </button>
        <TrackerView playerPositions={playerPositions} />
      </div>
    </div>
  );
}

export default App;
