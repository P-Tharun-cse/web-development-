const gameState = {
    board: Array(9).fill(''),
    currentPlayer: 'X',
    scores: { X: 0, O: 0 },
    currentRound: 1,
    gameOver: false
};

const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

const cells = document.querySelectorAll('.cell');
const status = document.querySelector('.status');
const resetBtn = document.querySelector('.reset-btn');
const winnerScreen = document.querySelector('.winner-screen');
const winnerText = document.querySelector('.winner-text');
const playAgainBtn = document.querySelector('.play-again-btn');
const player1Score = document.querySelector('.player1-score span');
const player2Score = document.querySelector('.player2-score span');

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    if (gameState.board[index] || gameState.gameOver) return;

    gameState.board[index] = gameState.currentPlayer;
    cell.textContent = gameState.currentPlayer;
    cell.classList.add(gameState.currentPlayer.toLowerCase());

    if (checkWinner()) {
        handleRoundWin();
    } else if (gameState.board.every(cell => cell)) {
        handleDraw();
    } else {
        gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
    }
}

function checkWinner() {
    return winCombos.some(combo => {
        return combo.every(index => {
            return gameState.board[index] === gameState.currentPlayer;
        });
    });
}

function handleRoundWin() {
    const winner = gameState.currentPlayer;
    gameState.scores[winner]++;
    updateScoreboard();

    if (gameState.currentRound === 5) {
        endGame();
    } else {
        gameState.currentRound++;
        setTimeout(() => {
            resetBoard();
            gameState.currentPlayer = gameState.currentRound % 2 === 1 ? 'X' : 'O';
            updateStatus();
        }, 1000);
    }
}

function handleDraw() {
    if (gameState.currentRound === 5) {
        endGame();
    } else {
        gameState.currentRound++;
        setTimeout(() => {
            resetBoard();
            gameState.currentPlayer = gameState.currentRound % 2 === 1 ? 'X' : 'O';
            updateStatus();
        }, 1000);
    }
}

function endGame() {
    gameState.gameOver = true;
    const finalWinner = gameState.scores.X > gameState.scores.O ? 'Player 1' :
                        gameState.scores.O > gameState.scores.X ? 'Player 2' : null;
    
    winnerText.innerHTML = finalWinner 
        ? `${finalWinner} wins the game!<br>Final Score: ${gameState.scores.X} - ${gameState.scores.O}`
        : "It's a tie!";
    
    winnerScreen.classList.add('show');
}

function resetBoard() {
    gameState.board = Array(9).fill('');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}

function resetGame() {
    gameState.board = Array(9).fill('');
    gameState.currentPlayer = 'X';
    gameState.scores = { X: 0, O: 0 };
    gameState.currentRound = 1;
    gameState.gameOver = false;
    
    resetBoard();
    updateScoreboard();
    updateStatus();
    winnerScreen.classList.remove('show');
}

function updateStatus() {
    status.textContent = `Round ${gameState.currentRound}: Player ${gameState.currentPlayer === 'X' ? '1' : '2'}'s turn (${gameState.currentPlayer})`;
}

function updateScoreboard() {
    player1Score.textContent = gameState.scores.X;
    player2Score.textContent = gameState.scores.O;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
playAgainBtn.addEventListener('click', resetGame);