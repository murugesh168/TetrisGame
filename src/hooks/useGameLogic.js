import { useCallback, useEffect, useRef, useState } from "react";
import { createBoard, ROWS, COLS } from "../utils/board";
import { collision, randomPiece, rotateMatrix } from "../utils/helpers";

const useGameLogic = () => {
  const [board, setBoard] = useState(createBoard());
  const [piece, setPiece] = useState(randomPiece());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const gameLoop = useRef();
  const boardRef = useRef(board);
  const pieceRef = useRef(piece);
  const gameOverRef = useRef(gameOver);

  useEffect(() => { boardRef.current = board; });
  useEffect(() => { pieceRef.current = piece; });
  useEffect(() => { gameOverRef.current = gameOver; });

  const restartGame = useCallback(() => {
    clearInterval(gameLoop.current);
    const newBoard = createBoard();
    const newPiece = randomPiece();
    setBoard(newBoard);
    setPiece(newPiece);
    setScore(0);
    setGameOver(false);
  }, []);

  const clearRows = useCallback((newBoard) => {
    let cleared = 0;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (newBoard[r].every((cell) => cell !== null)) {
        newBoard.splice(r, 1);
        newBoard.unshift(Array(COLS).fill(null));
        cleared++;
        r++;
      }
    }
    if (cleared > 0) {
      setScore((prev) => prev + cleared * 100);
    }
  }, []);

  const mergePiece = useCallback(() => {
    const currentBoard = boardRef.current;
    const currentPiece = pieceRef.current;
    const newBoard = currentBoard.map((row) => [...row]);

    currentPiece.shape.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell) {
          newBoard[currentPiece.row + r][currentPiece.col + c] = currentPiece.color;
        }
      });
    });

    clearRows(newBoard);

    const nextPiece = randomPiece();

    if (collision(newBoard, nextPiece, nextPiece.row, nextPiece.col, nextPiece.shape)) {
      setGameOver(true);
      clearInterval(gameLoop.current);
    }

    setBoard(newBoard);
    setPiece(nextPiece);
  }, [clearRows]);

  const moveDown = useCallback(() => {
    if (gameOverRef.current) return;
    const currentPiece = pieceRef.current;
    const currentBoard = boardRef.current;
    if (!collision(currentBoard, currentPiece, currentPiece.row + 1, currentPiece.col, currentPiece.shape)) {
      setPiece((p) => ({ ...p, row: p.row + 1 }));
    } else {
      mergePiece();
    }
  }, [mergePiece]);

  useEffect(() => {
    if (gameOver) return;
    gameLoop.current = setInterval(() => {
      moveDown();
    }, 500);
    return () => clearInterval(gameLoop.current);
  }, [gameOver, moveDown]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOverRef.current) return;
      const currentPiece = pieceRef.current;
      const currentBoard = boardRef.current;

      switch (e.key) {
        case "ArrowLeft":
          if (!collision(currentBoard, currentPiece, currentPiece.row, currentPiece.col - 1, currentPiece.shape)) {
            setPiece((p) => ({ ...p, col: p.col - 1 }));
          }
          break;
        case "ArrowRight":
          if (!collision(currentBoard, currentPiece, currentPiece.row, currentPiece.col + 1, currentPiece.shape)) {
            setPiece((p) => ({ ...p, col: p.col + 1 }));
          }
          break;
        case "ArrowDown":
          moveDown();
          break;
        case "ArrowUp": {
          const rotated = rotateMatrix(currentPiece.shape);
          if (!collision(currentBoard, currentPiece, currentPiece.row, currentPiece.col, rotated)) {
            setPiece((p) => ({ ...p, shape: rotated }));
          }
          break;
        }
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [moveDown]);

  const drawBoard = () => {
    const display = board.map((row) => [...row]);
    piece.shape.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell) {
          display[piece.row + r][piece.col + c] = piece.color;
        }
      });
    });
    return display;
  };

  return {
    board: drawBoard(),
    score,
    gameOver,
    restartGame,
  };
};

export default useGameLogic;