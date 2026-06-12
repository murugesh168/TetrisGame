function Controls({ onRestart }) {
  return (
    <div className="mt-6 text-center font-mono">
      <div className="flex justify-center gap-6 text-sm text-slate-400 mb-4">
        <span>
          <kbd className="bg-slate-700 text-cyan-300 px-2 py-1 rounded border border-slate-500">
            ← →
          </kbd>
          <span className="ml-2">Move</span>
        </span>
        <span>
          <kbd className="bg-slate-700 text-cyan-300 px-2 py-1 rounded border border-slate-500">
            ↑
          </kbd>
          <span className="ml-2">Rotate</span>
        </span>
        <span>
          <kbd className="bg-slate-700 text-cyan-300 px-2 py-1 rounded border border-slate-500">
            ↓
          </kbd>
          <span className="ml-2">Fast Drop</span>
        </span>
      </div>


      <button
        onClick={onRestart}
        className="mt-2 px-8 py-3 bg-cyan-500 hover:bg-cyan-400
          active:scale-95 text-slate-900 font-bold font-mono
          uppercase tracking-widest rounded-lg
          shadow-[0_0_20px_rgba(34,211,238,0.5)]
          hover:shadow-[0_0_30px_rgba(34,211,238,0.8)]
          transition-all duration-150 text-sm"
      >
        ↺ Restart
      </button>
    </div>
  );
}

export default Controls;