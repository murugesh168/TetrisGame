import React from "react";
import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";
import Controls from "./components/Controls";
import useGameLogic from "./hooks/useGameLogic";
import "./styles/game.css";

function App() {
  const { board, score, gameOver } = useGameLogic();

  return (
    <div className="container">
      <h1>Tetris Game</h1>

      <ScoreBoard score={score} gameOver={gameOver} />

      <Board board={board} />

      <Controls />
    </div>
  )
}

export default App
