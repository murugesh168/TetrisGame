import Cell from "./Cell";

function Board({ board }) {
  return (
    <div
      className="grid border-4 border-cyan-400
        shadow-[0_0_30px_rgba(34,211,238,0.4)]"
      style={{ gridTemplateColumns: "repeat(10, 30px)" }}
    >
      {board.flat().map((cell, index) => (
        <Cell key={index} color={cell} />
      ))}
    </div>
  );
}

export default Board;