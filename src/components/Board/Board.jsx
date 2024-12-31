import React from "react";
import "./Board.css";
import { snakes, ladders } from "./BoardLogic";
import redToken from "../../assets/redToken.svg";
import blueToken from "../../assets/blueToken.svg";
import greenToken from "../../assets/greenToken.svg";
import yellowToken from "../../assets/yellowToken.svg";
import snakeImg from "../../assets/snakeImage.png";
import ladderImg from "../../assets/ladder.png";

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
      x: col * 60 + 30,
      y: row * 55 + 27.5,
    };
  };

  const renderSnakesAndLadders = () => {
    return (
      <div className="snakes-and-ladders-container" style={{ zIndex: 1 }}>
        {Object.entries(snakes).map(([start, end]) => {
          const startPos = getCellCenter(parseInt(start));
          const endPos = getCellCenter(end);
          const angle =
            Math.atan2(endPos.y - startPos.y, endPos.x - startPos.x) *
            (180 / Math.PI);
          const length = Math.sqrt(
            Math.pow(endPos.x - startPos.x, 2) +
              Math.pow(endPos.y - startPos.y, 2)
          );

          return (
            <div
              key={`snake-${start}`}
              className="snake-image"
              style={{
                position: "absolute",
                left: `${startPos.x}px`,
                top: `${startPos.y - 15}px`,
                width: `${length}px`,
                transform: `rotate(${angle}deg)`,
                transformOrigin: "0 50%",
                zIndex: 1,
              }}
            >
              <img
                src={snakeImg}
                alt="snake"
                style={{
                  width: "100%",
                  height: "30px",
                  objectFit: "cover",
                }}
              />
            </div>
          );
        })}

        {Object.entries(ladders).map(([start, end]) => {
          const startPos = getCellCenter(parseInt(start));
          const endPos = getCellCenter(end);
          const angle =
            Math.atan2(endPos.y - startPos.y, endPos.x - startPos.x) *
            (180 / Math.PI);
          const length = Math.sqrt(
            Math.pow(endPos.x - startPos.x, 2) +
              Math.pow(endPos.y - startPos.y, 2)
          );

          return (
            <div
              key={`ladder-${start}`}
              className="ladder-image"
              style={{
                position: "absolute",
                left: `${startPos.x}px`,
                top: `${startPos.y - 15}px`,
                width: `${length}px`,
                transform: `rotate(${angle}deg)`,
                transformOrigin: "0 50%",
                zIndex: 1,
              }}
            >
              <img
                src={ladderImg}
                alt="ladder"
                style={{
                  width: "100%",
                  height: "30px",
                }}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="board-container">
      {renderSnakesAndLadders()}
      <div className="board">
        {flattenedBoard.map((cell, index) => (
          <div key={index} className={`cell cell-${index % 3}`}>
            {cell}
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
                    zIndex: 2, // Higher z-index to appear above snakes and ladders
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
