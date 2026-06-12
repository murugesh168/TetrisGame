function Cell({ color }) {
  return (
    <div
      className="w-[30px] h-[30px] border border-slate-700 box-border"
      style={{ backgroundColor: color || "#0f172a" }}
    />
  );
}

export default Cell;