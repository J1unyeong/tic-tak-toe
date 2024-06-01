const cells = document.querySelectorAll('.cell');
let currentPlayer = 'O';

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once : true });
});

function handleClick(e) {
    const cell = e.target;
    cell.textContent = currentPlayer;
    console.log(`Clicked by ${currentPlayer}`);
    if (checkWin(currentPlayer)) {
        setTimeout(() => {
            alert(`${currentPlayer} wins!`);
            resetGame();
        }, 10);
    } else if (isDraw()) {
        setTimeout(() => {
            alert('Draw!');
            resetGame();
        }, 10);
    } else {
        currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
    }
}

function checkWin(player) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === player;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'O' || cell.textContent === 'X';
    });
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true});
    });
    currentPlayer = 'O';
}