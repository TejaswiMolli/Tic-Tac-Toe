const board = document.getElementById('board');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill('');

const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8], 
  [0,3,6], [1,4,7], [2,5,8], 
  [0,4,8], [2,4,6]           
];

function handleClick(index) {
  if (!gameActive || gameState[index]) return;

  gameState[index] = currentPlayer;
  renderBoard();
  checkResult();
}

function checkResult() {
  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      statusText.textContent = `Player ${currentPlayer} Wins!`;
      gameActive = false;
      return;
    }
  }

  if (!gameState.includes('')) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'Y' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function renderBoard() {
  board.innerHTML = '';
  gameState.forEach((cell, index) => {
    const cellDiv = document.createElement('div');
    cellDiv.classList.add('cell');
    cellDiv.textContent = cell;
    cellDiv.addEventListener('click', () => handleClick(index));
    board.appendChild(cellDiv);
  });
}

function resetGame() {
  currentPlayer = 'X';
  gameActive = true;
  gameState = Array(9).fill('');
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  renderBoard();
}

resetBtn.addEventListener('click', resetGame);
renderBoard();
