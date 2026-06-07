import React from "react";
import Cell from "./Cell";

function Board({ board }) {
  return (
    <div className="board">
      {board.flat().map((cell, index) => (
        <Cell key={index} color={cell} />
      ))}
    </div>
  );
}

export default Board;