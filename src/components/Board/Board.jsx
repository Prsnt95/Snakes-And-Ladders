import React from "react";
import "./Board.css";
import { snakes, ladders } from "./BoardLogic";
import redToken from "../../assets/redToken.svg";
import blueToken from "../../assets/blueToken.svg";
import greenToken from "../../assets/greenToken.svg";
import yellowToken from "../../assets/yellowToken.svg";

const Board = ({ board, playerPositions }) => {
  const size = Math.sqrt(board.length);

  const zigzagBoard = Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, col) =>
      row % 2 === 0 ? row * size + col + 1 : (row + 1) * size - col
    )
  ).reverse();

  const flattenedBoard = zigzagBoard.flat();

  const getCellCenter = (cellNumber) => {
    const cellIndex = flattenedBoard.indexOf(cellNumber);
    const row = Math.floor(cellIndex / size);
    const col = cellIndex % size;

    return {
      x: col * 60 + 30, // 60px cell width + 30px offset
      y: row * 55 + 27.5, // 55px cell height + 27.5px offset
    };
  };

  const renderLines = () => {
    const allLines = [];

    Object.entries(snakes).forEach(([start, end]) => {
      const startPos = getCellCenter(parseInt(start));
      const endPos = getCellCenter(end);

      allLines.push(
        <path
          key={`snake-${start}`}
          d={`M ${startPos.x} ${startPos.y} Q ${(startPos.x + endPos.x) / 2} ${
            (startPos.y + endPos.y) / 2
          }, ${endPos.x} ${endPos.y}`}
          stroke="red"
          strokeWidth="3"
          fill="none"
          strokeDasharray="5,5"
        />
      );
    });

    Object.entries(ladders).forEach(([start, end]) => {
      const startPos = getCellCenter(parseInt(start));
      const endPos = getCellCenter(end);

      allLines.push(
        <path
          key={`ladder-${start}`}
          d={`M ${startPos.x} ${startPos.y} Q ${(startPos.x + endPos.x) / 2} ${
            (startPos.y + endPos.y) / 2
          }, ${endPos.x} ${endPos.y}`}
          stroke="green"
          strokeWidth="3"
          fill="none"
        />
      );
    });

    return allLines;
  };

  return (
    <div className="board-container">
      <svg className="board-svg" viewBox="0 0 600 550">
        {renderLines()}
      </svg>
      <div className="board">
        {flattenedBoard.map((cell, index) => (
          <div key={index} className={`cell cell-${index % 3}`}>
            {cell}
            {snakes[cell] && <span className="snake-emoji">🐍</span>}
            {ladders[cell] && <span className="ladder-emoji">🪜</span>}

            {playerPositions.map((playerPosition, playerIndex) =>
              playerPosition === cell ? (
                <img
                  key={playerIndex}
                  src={
                    playerIndex === 0
                      ? redToken
                      : playerIndex === 1
                      ? blueToken
                      : playerIndex === 2
                      ? greenToken
                      : yellowToken
                  }
                  alt={`Player ${playerIndex + 1}`}
                  className={`player-token player-${playerIndex + 1}`}
                  style={{
                    position: "absolute",
                    width: "30px",
                    height: "30px",
                  }}
                />
              ) : null
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
