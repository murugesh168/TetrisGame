import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";
import Controls from "./components/Controls";
import useGameLogic from "./hooks/useGameLogic";


function App() {
  const { board, score, gameOver, restartGame } = useGameLogic();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center font-mono">
      {/* Title */}
      <h1 className="text-4xl font-extrabold tracking-[0.3em] uppercase mb-6
          text-transparent bg-clip-text bg-gradient-to-r
          from-cyan-400 to-purple-400 drop-shadow-lg">
        Tetris
      </h1>

      <ScoreBoard score={score} gameOver={gameOver} />
      <Board board={board} />
      <Controls onRestart={restartGame} />
    </div>
  );
}

export default App
