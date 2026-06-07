import React from "react";

function ScoreBoard({ score, gameOver }) {
  return (
    <div>
      <h2>Score: {score}</h2>

      {gameOver && <h2 className="game-over">Game Over</h2>}
    </div>
  );
}

export default ScoreBoard;