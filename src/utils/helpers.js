import { SHAPES } from "./shapes";
import { COLS, ROWS } from "./board";

export const randomPiece = () => {
  const rand = SHAPES[Math.floor(Math.random() * SHAPES.length)];

  return {
    shape: rand.shape,
    color: rand.color,
    row: 0,
    col: Math.floor(COLS / 2) - 1,
  };
};

export const rotateMatrix = (matrix) => {
  return matrix[0].map((_, index) =>
    matrix.map((row) => row[index]).reverse()
  );
};

export const collision = (board, piece, newRow, newCol, shape) => {
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c]) {
        const boardRow = newRow + r;
        const boardCol = newCol + c;

        if (
          boardCol < 0 ||
          boardCol >= COLS ||
          boardRow >= ROWS ||
          (boardRow >= 0 && board[boardRow][boardCol])
        ) {
          return true;
        }
      }
    }
  }

  return false;
};