import { useState } from "react";

function Square({ value, onSquareClick, color }) {
  return (
    <button
      className="square"
      onClick={onSquareClick}
      style={{ backgroundColor: color }}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, colors, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    const colores = colors.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    for (var n = 0; n <= 8; n += 1) {
      colores[n] = "#ece5f0";
    }
    colores[i] = "#a31af1";

    onPlay(nextSquares, colores);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="titulo">Tic-Tac-Toe</div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          value={squares[0]}
          color={colors[0]}
          onSquareClick={() => handleClick(0)}
        />
        <Square
          value={squares[1]}
          color={colors[1]}
          onSquareClick={() => handleClick(1)}
        />
        <Square
          value={squares[2]}
          color={colors[2]}
          onSquareClick={() => handleClick(2)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          color={colors[3]}
          onSquareClick={() => handleClick(3)}
        />
        <Square
          value={squares[4]}
          color={colors[4]}
          onSquareClick={() => handleClick(4)}
        />
        <Square
          value={squares[5]}
          color={colors[5]}
          onSquareClick={() => handleClick(5)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          color={colors[6]}
          onSquareClick={() => handleClick(6)}
        />
        <Square
          value={squares[7]}
          color={colors[7]}
          onSquareClick={() => handleClick(7)}
        />
        <Square
          value={squares[8]}
          color={colors[8]}
          onSquareClick={() => handleClick(8)}
        />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [colorHistory, setColorHistory] = useState([Array(9).fill("#ece5f0")]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const currentColors = colorHistory[currentMove];

  function handlePlay(nextSquares, colores) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    const nextColorHistory = [
      ...colorHistory.slice(0, currentMove + 1),
      colores,
    ];

    setHistory(nextHistory);
    setColorHistory(nextColorHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          colors={currentColors}
          onPlay={handlePlay}
        />
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
