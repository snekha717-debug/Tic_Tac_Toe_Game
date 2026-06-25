const { useState } = React;

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  // Helper function to calculate the winner
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  };

  const winnerInfo = calculateWinner(board);
  const winner = winnerInfo?.winner;
  const winningLine = winnerInfo?.line || [];
  const isDraw = !winner && board.every((square) => square !== null);

  // Handle player clicks
  const handleClick = (index) => {
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  // Reset the game state
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  // Status message logic
  let status;
  if (winner) {
    status = `Winner: ${winner} 🎉`;
  } else if (isDraw) {
    status = "It's a draw! 🤝";
  } else {
    status = `Next Player: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Tic-Tac-Toe</h1>
      
      <div style={styles.status}>{status}</div>
      
      <div style={styles.board}>
        {board.map((value, index) => {
          const isWinningSquare = winningLine.includes(index);
          return (
            <button
              key={index}
              style={{
                ...styles.square,
                backgroundColor: isWinningSquare ? '#4caf50' : '#fff',
                color: isWinningSquare ? '#fff' : value === 'X' ? '#e91e63' : '#2196f3'
              }}
              onClick={() => handleClick(index)}
            >
              {value}
            </button>
          );
        })}
      </div>

      <button style={styles.resetButton} onClick={resetGame}>
        Restart Game
      </button>
    </div>
  );
}

// Inline styles
const styles = {
  container: {
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f7fb',
  },
  title: {
    color: '#333',
    marginBottom: '10px',
  },
  status: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#555',
    height: '30px',
  },
  board: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 100px)',
    gridTemplateRows: 'repeat(3, 100px)',
    gap: '6px',
    backgroundColor: '#ccc',
    padding: '6px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  square: {
    fontSize: '2rem',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.2s, transform 0.1s',
  },
  resetButton: {
    marginTop: '30px',
    padding: '10px 20px',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#3f51b5',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
};

// Mount the app into the DOM layout defined in index.html
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TicTacToe />);
