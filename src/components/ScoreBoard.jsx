function ScoreBoard({ score, gameOver }) {
  return (
    <div className="text-center mb-4">
      <div className="inline-block bg-slate-800 border border-cyan-500
          rounded-lg px-8 py-3 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
        <p className="text-xs uppercase tracking-widest text-cyan-400 font-mono mb-1">
          Score
        </p>
        <p className="text-4xl font-bold font-mono text-white">{score}</p>
      </div>

      {gameOver && (
        <div className="mt-4 animate-pulse">
          <p className="text-2xl font-bold font-mono text-red-500 tracking-widest uppercase">
            ☠ Game Over ☠
          </p>
        </div>
      )}
    </div>
  );
}

export default ScoreBoard;