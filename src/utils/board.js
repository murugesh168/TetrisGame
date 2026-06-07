export const ROWS = 20;
export const COLS = 10;

export const createBoard = () => {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
};