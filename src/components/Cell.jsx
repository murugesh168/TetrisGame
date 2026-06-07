import React from "react";

function Cell({ color }) {
  return (
    <div
      className="cell"
      style={{ backgroundColor: color || "#111" }}
    ></div>
  );
}

export default Cell;