import { useEffect, useRef, useState } from "react";
import { createBoard, ROWS, COLS } from "../utils/board";
import {
  collision,
  randomPiece,
  rotateMatrix,
} from "../utils/helpers";

const useGameLogic = () => {
  const [board, setBoard] = useState(createBoard());
  const [piece, setPiece] = useState(randomPiece());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const gameLoop = useRef();

  useEffect(() => {
    gameLoop.current = setInterval(() => {
      moveDown();
    }, 500);

    return () => clearInterval(gameLoop.current);
  });

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver) return;

       switch (e.key) {
        case "ArrowLeft":
          moveHorizontal(-1);
          break;
        case "ArrowRight":
          moveHorizontal(1);
          break;
        case "ArrowDown":
          moveDown();
          break;
        case "ArrowUp":
          rotatePiece();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [piece, board, gameOver]);

  const mergePiece = () => {
    const newBoard = board.map((row) => [...row]);

    piece.shape.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell) {
          newBoard[piece.row + r][piece.col + c] = piece.color;
        }
      });
    });

    clearRows(newBoard);

    const nextPiece = randomPiece();

    if (
      collision(
        newBoard,
        nextPiece,
        nextPiece.row,
        nextPiece.col,
        nextPiece.shape
      )
    ) {
      setGameOver(true);
      clearInterval(gameLoop.current);
    }

    setBoard(newBoard);
    setPiece(nextPiece);
  };

  const clearRows = (newBoard) => {
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
  };

  const moveDown = () => {
    if (
      !collision(board, piece, piece.row + 1, piece.col, piece.shape)
    ) {
      setPiece({ ...piece, row: piece.row + 1 });
    } else {
      mergePiece();
    }
  };

  const moveHorizontal = (dir) => {
    if (
      !collision(board, piece, piece.row, piece.col + dir, piece.shape)
    ) {
      setPiece({ ...piece, col: piece.col + dir });
    }
  };

  const rotatePiece = () => {
    const rotated = rotateMatrix(piece.shape);

    if (!collision(board, piece, piece.row, piece.col, rotated)) {
      setPiece({ ...piece, shape: rotated });
    }
  };

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
  };
};

export default useGameLogic;