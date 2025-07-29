import { useState } from 'react';
import './App.css';

function Square({ value, onSquareClick, isHighlight }) {
  return (
    <button className={`square ${isHighlight ? 'highlight' : ''}`} onClick={onSquareClick} >
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  console.log('Render Board: squares =', squares, ', xIsNext =', xIsNext);

  // const winner = calculateWinner(squares);
  const { winner, line } = calculateWinner(squares);  // Destructuring

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (!squares.includes(null)) {
    status = "It's a Draw!";
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
  


  function handleClick(i) {
    console.log('Square clicked:', i);
    console.log('Current squares:', squares);
    const { winner } = calculateWinner(squares);
    if (winner || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function reset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} isHighlight={line.includes(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} isHighlight={line.includes(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} isHighlight={line.includes(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} isHighlight={line.includes(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} isHighlight={line.includes(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} isHighlight={line.includes(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} isHighlight={line.includes(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} isHighlight={line.includes(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} isHighlight={line.includes(8)} />
      </div>
      <button className='btn-style' onClick={reset}>Reset</button>
    </>
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
      console.log('Winner:', squares[a]);
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: [] };
}
