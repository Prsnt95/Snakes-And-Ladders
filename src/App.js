import React, { useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import { rollDice } from "./components/Game/GameLogic";
import DiceRoll from "./components/Dice/DiceRoll";
import TurnView from "./components/Turn/TurnView";
import TrackerView from "./components/TrackerView/TrackerView";
import Settings from "./components/Setting/Settings";
import DiceDisplay from "./components/Dice/DiceDisplay";

function App() {
  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);
  const [board] = useState(numbers);
  const [numPlayers, setNumPlayers] = useState(4);
  const [initialPositions, setInitialPositions] = useState(
    Array(numPlayers).fill(1)
  );
  const [playerPositions, setPlayerPositions] = useState(
    Array(numPlayers).fill(1)
  );
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [rolling, setRolling] = useState(false);
  const [diceValue, setDiceValue] = useState(null);

  const confirmPlayerChange = (players) => {
    setNumPlayers(players);
    setInitialPositions(Array(players).fill(1));
    setPlayerPositions(Array(players).fill(1));
    setCurrentPlayer(0);
  };

  const handleDiceRoll = () => {
    rollDice(
      playerPositions,
      currentPlayer,
      setPlayerPositions,
      setCurrentPlayer,
      setRolling,
      setDiceValue
    );
  };

  return (
    <div className="App">
      <h1 className="gameTitle">Snakes & Ladders</h1>
      <div className="board_dice">
        <TurnView turn={currentPlayer + 1} />
        <Board board={board} playerPositions={playerPositions} />
        <div className="dice-section">
          <DiceRoll onRollDice={handleDiceRoll} rolling={rolling} />
          <DiceDisplay rollValue={diceValue} />
        </div>
        <TrackerView playerPositions={playerPositions} />
        <Settings
          numPlayers={numPlayers}
          confirmPlayerChange={confirmPlayerChange}
          rolling={rolling}
        />
      </div>
    </div>
  );
}

export default App;
