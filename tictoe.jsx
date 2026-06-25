import React, { useState } from 'react';

// Individual Square Component
function Square({ value, onClick }) {
  return (
    <button 
      className="square" 
      onClick={onClick}
      style={{
        width: '80px',
        height: '80px',
        backgroundColor: '#ffffff',
        border: '2px solid #333',
        fontSize: '32px',
        fontWeight: 'bold',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none',
        transition: 'background-color 0.2s',
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
      onMouseLeave={(e) => (e.target.style.backgroundColor = '#ffffff')}
    >
      <span style={{ color: value === 'X' ? '#3b82f6' : '#ef4444' }}>
        {value}
      </span>
    </button>
  );
}

// Main Tic-Tac-Toe Game Component
export default function TicTacToe() {
  // State to hold the 9 squares (array filled with nulls initially)
  const [board, setBoard] = useState(Array(9).fill(null));
  // State to track whose turn it is (true for X, false for O)
  const [xIsNext, setXIsNext] = useState(true);

  // Function to determine if there is a winner
  const calculateWinner = (squares) => {
    const winningLines = [
      [0, 1, 2], // Rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // Columns
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // Diagonals
      [2, 4, 6],
    ];

    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]; // Returns 'X' or 'O'
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((square) => square !== null);

  // Handle click event for each square
  const handleClick = (index) => {
    // Return early if the square is already filled or if the game has a winner
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    
    setBoard(newBoard);
    setXIsNext(!xIsNext); // Toggle turn
  };

  // Restart the game state
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  // Determine status message
  let status;
  if (winner) {
    status = `Winner: ${winner} 🎉`;
  } else if (isDraw) {
    status = "It's a Draw! 🤝";
  } else {
    status = `Next Player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div style={{ 
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', 
      textAlign: 'center', 
      marginTop: '50px' 
    }}>
      <h1 style={{ color: '#1e293b' }}>Tic-Tac-Toe</h1>
      
      {/* Turn/Result Status Indicator */}
      <div style={{ 
        marginBottom: '20px', 
        fontSize: '20px', 
        fontWeight: '600',
        color: winner ? '#10b981' : isDraw ? '#6b7280' : '#4b5563'
      }}>
        {status}
      </div>
      
      {/* Grid Board */}
      <div style={{ display: 'inline-block', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
        <div style={{ display: 'flex' }}>
          <Square value={board[0]} onClick={() => handleClick(0)} />
          <Square value={board[1]} onClick={() => handleClick(1)} />
          <Square value={board[2]} onClick={() => handleClick(2)} />
        </div>
        <div style={{ display: 'flex' }}>
          <Square value={board[3]} onClick={() => handleClick(3)} />
          <Square value={board[4]} onClick={() => handleClick(4)} />
          <Square value={board[5]} onClick={() => handleClick(5)} />
        </div>
        <div style={{ display: 'flex' }}>
          <Square value={board[6]} onClick={() => handleClick(6)} />
          <Square value={board[7]} onClick={() => handleClick(7)} />
          <Square value={board[8]} onClick={() => handleClick(8)} />
        </div>
      </div>

      {/* Restart Button */}
      <div style={{ marginTop: '30px' }}>
        <button 
          onClick={resetGame}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            backgroundColor: '#1e293b',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#334155')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#1e293b')}
        >
          Restart Game
        </button>
      </div>
    </div>
  );
}