// Application State
let state = {
    boardSize: 8,
    startRow: 0,
    startCol: 0,
    speed: 300,
    isPaused: false,
    isRunning: false,
    currentIteration: 0,
    iterations: [],
    musicPlaying: false
};

// DOM Elements
const boardSizeInput = document.getElementById('boardSize');
const startRowInput = document.getElementById('startRow');
const startColInput = document.getElementById('startCol');
const speedSlider = document.getElementById('speed');
const speedValue = document.querySelector('.speed-value');
const startBtn = document.getElementById('startBtn');
const getSolutionBtn = document.getElementById('getSolutionBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resumeBtn = document.getElementById('resumeBtn');
const resetBtn = document.getElementById('resetBtn');
const musicToggle = document.getElementById('musicToggle');
const chessboard = document.getElementById('chessboard');
const queensCount = document.getElementById('queensCount');
const iterationCount = document.getElementById('iterationCount');
const statusDisplay = document.getElementById('status');
const messageBox = document.getElementById('messageBox');
const bgMusic = document.getElementById('bgMusic');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeBoard();
    setupEventListeners();
    showMessage('Welcome! Set your starting position and click Start!', 'info');
});

// Event Listeners
function setupEventListeners() {
    boardSizeInput.addEventListener('input', (e) => {
        state.boardSize = parseInt(e.target.value);
        updateMaxValues();
        initializeBoard();
    });

    startRowInput.addEventListener('input', (e) => {
        state.startRow = parseInt(e.target.value);
    });

    startColInput.addEventListener('input', (e) => {
        state.startCol = parseInt(e.target.value);
    });

    speedSlider.addEventListener('input', (e) => {
        state.speed = parseInt(e.target.value);
        speedValue.textContent = `${state.speed}ms`;
    });

    startBtn.addEventListener('click', startVisualization);
    getSolutionBtn.addEventListener('click', getSolutionInstantly);
    pauseBtn.addEventListener('click', pauseVisualization);
    resumeBtn.addEventListener('click', resumeVisualization);
    resetBtn.addEventListener('click', resetVisualization);
    musicToggle.addEventListener('click', toggleMusic);
}

function updateMaxValues() {
    const max = state.boardSize - 1;
    startRowInput.max = max;
    startColInput.max = max;
    
    if (state.startRow > max) {
        state.startRow = max;
        startRowInput.value = max;
    }
    if (state.startCol > max) {
        state.startCol = max;
        startColInput.value = max;
    }
    
    document.querySelectorAll('.input-hint').forEach((hint, index) => {
        if (index === 1 || index === 2) {
            hint.textContent = `0-${max}`;
        }
    });
}

// Board Initialization
function initializeBoard() {
    const size = state.boardSize;
    chessboard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    chessboard.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    
    // Calculate cell size - improved to prevent overflow
    const containerWidth = Math.min(window.innerWidth - 100, 750);
    const cellSize = Math.floor(containerWidth / size);
    const boardSize = cellSize * size;
    
    chessboard.style.width = `${boardSize}px`;
    chessboard.style.height = `${boardSize}px`;
    
    chessboard.innerHTML = '';
    
    // Calculate font size based on cell size for queen icons
    const fontSize = Math.max(Math.min(cellSize * 0.6, 50), 12);
    
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const cell = document.createElement('div');
            cell.className = `cell ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.style.fontSize = `${fontSize}px`;
            
            cell.addEventListener('click', () => handleCellClick(row, col));
            
            chessboard.appendChild(cell);
        }
    }
}

function handleCellClick(row, col) {
    if (!state.isRunning) {
        state.startRow = row;
        state.startCol = col;
        startRowInput.value = row;
        startColInput.value = col;
        showMessage(`Starting position set to (${row}, ${col})`, 'info');
    }
}

// Visualization Control
async function startVisualization() {
    if (state.isRunning) return;
    
    state.isRunning = true;
    state.isPaused = false;
    state.currentIteration = 0;
    
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = true;
    
    updateStatus('Solving...');
    showMessage('Algorithm started! Watch the magic happen...', 'info');
    
    try {
        const response = await fetch('/api/nqueens/solve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                boardSize: state.boardSize,
                startRow: state.startRow,
                startCol: state.startCol
            })
        });
        
        const data = await response.json();
        
        if (!data.solutionFound) {
            showMessage(data.message + ' - No valid placement possible from this starting position.', 'error');
            updateStatus('No Solution');
            resetControls();
            return;
        }
        
        state.iterations = data.iterations;
        await animateIterations();
        
    } catch (error) {
        showMessage('Error: ' + error.message, 'error');
        updateStatus('Error');
        resetControls();
    }
}

async function getSolutionInstantly() {
    if (state.isRunning) return;
    
    state.isRunning = true;
    
    startBtn.disabled = true;
    getSolutionBtn.disabled = true;
    resetBtn.disabled = true;
    
    updateStatus('Calculating...');
    showMessage('Finding solution instantly...', 'info');
    
    try {
        const response = await fetch('/api/nqueens/solve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                boardSize: state.boardSize,
                startRow: state.startRow,
                startCol: state.startCol
            })
        });
        
        const data = await response.json();
        
        if (!data.solutionFound) {
            showMessage(data.message + ' - No valid placement possible from this starting position.', 'error');
            updateStatus('No Solution');
            resetControls();
            return;
        }
        
        // Show only the final result
        const finalIteration = data.iterations[data.iterations.length - 1];
        await displayIteration(finalIteration);
        
        queensCount.textContent = data.totalQueens;
        iterationCount.textContent = data.totalIterations;
        
        updateStatus('Solution Found!');
        showMessage(`Solution found with ${data.totalQueens} queens in ${data.totalIterations} iterations! ⚡`, 'success');
        resetControls();
        
    } catch (error) {
        showMessage('Error: ' + error.message, 'error');
        updateStatus('Error');
        resetControls();
    }
}

async function animateIterations() {
    for (let i = state.currentIteration; i < state.iterations.length; i++) {
        if (state.isPaused) {
            state.currentIteration = i;
            return;
        }
        
        const iteration = state.iterations[i];
        await displayIteration(iteration);
        
        iterationCount.textContent = i + 1;
        
        await sleep(state.speed);
    }
    
    updateStatus('Completed');
    showMessage('Solution found! All queens placed safely! 👑', 'success');
    resetControls();
}

function displayIteration(iteration) {
    return new Promise((resolve) => {
        const { board, row, col, status, message, isFinal } = iteration;
        
        // Update board
        const cells = document.querySelectorAll('.cell');
        let queensPlaced = 0;
        
        cells.forEach((cell, index) => {
            const r = Math.floor(index / state.boardSize);
            const c = index % state.boardSize;
            const baseClass = (r + c) % 2 === 0 ? 'light' : 'dark';
            
            cell.className = `cell ${baseClass}`;
            
            if (board[r][c] === 1) {
                cell.classList.add('queen');
                cell.innerHTML = '<i class="fas fa-chess-queen"></i>';
                queensPlaced++;
            } else {
                cell.innerHTML = '';
            }
            
            // Highlight current cell being tried
            if (r === row && c === col && !isFinal) {
                if (status === 'trying') {
                    cell.classList.add('trying');
                } else if (status === 'backtrack') {
                    cell.classList.add('backtrack');
                } else if (status === 'success') {
                    cell.classList.add('queen');
                    cell.innerHTML = '<i class="fas fa-chess-queen"></i>';
                }
            }
        });
        
        queensCount.textContent = queensPlaced;
        
        if (!isFinal) {
            showMessage(message, status);
        }
        
        resolve();
    });
}

function pauseVisualization() {
    state.isPaused = true;
    pauseBtn.disabled = true;
    resumeBtn.disabled = false;
    updateStatus('Paused');
    showMessage('Visualization paused', 'info');
}

function resumeVisualization() {
    state.isPaused = false;
    pauseBtn.disabled = false;
    resumeBtn.disabled = true;
    updateStatus('Solving...');
    showMessage('Visualization resumed', 'info');
    animateIterations();
}

function resetVisualization() {
    state.isRunning = false;
    state.isPaused = false;
    state.currentIteration = 0;
    state.iterations = [];
    
    initializeBoard();
    resetControls();
    
    queensCount.textContent = '0';
    iterationCount.textContent = '0';
    updateStatus('Ready');
    showMessage('Board reset! Ready for a new challenge!', 'info');
}

function resetControls() {
    startBtn.disabled = false;
    getSolutionBtn.disabled = false;
    pauseBtn.disabled = true;
    resumeBtn.disabled = true;
    resetBtn.disabled = false;
    state.isRunning = false;
}

// Music Control
function toggleMusic() {
    if (state.musicPlaying) {
        bgMusic.pause();
        musicToggle.innerHTML = '<i class="fas fa-music"></i> Music';
        state.musicPlaying = false;
    } else {
        bgMusic.play().catch(err => {
            console.log('Audio play failed:', err);
            showMessage('Click again to enable music', 'info');
        });
        musicToggle.innerHTML = '<i class="fas fa-volume-up"></i> Music On';
        state.musicPlaying = true;
    }
}

// UI Helpers
function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = 'message-box';
    
    if (type === 'success') {
        messageBox.classList.add('success');
    } else if (type === 'error') {
        messageBox.classList.add('error');
    }
}

function updateStatus(status) {
    statusDisplay.textContent = status;
    
    if (status === 'Completed' || status === 'Success') {
        statusDisplay.style.color = 'var(--primary-green)';
    } else if (status === 'Failed' || status === 'Error') {
        statusDisplay.style.color = 'var(--backtrack-color)';
    } else {
        statusDisplay.style.color = 'var(--text-dark)';
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        if (!state.isRunning) {
            startVisualization();
        } else if (state.isPaused) {
            resumeVisualization();
        } else {
            pauseVisualization();
        }
    } else if (e.code === 'KeyR') {
        resetVisualization();
    } else if (e.code === 'KeyM') {
        toggleMusic();
    }
});

// Add tooltip for keyboard shortcuts
const keyboardHints = document.createElement('div');
keyboardHints.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.9);
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    font-size: 0.85rem;
    color: var(--text-dark);
    z-index: 1000;
`;
keyboardHints.innerHTML = `
    <strong>Keyboard Shortcuts:</strong><br>
    <kbd>Space</kbd> - Start/Pause<br>
    <kbd>R</kbd> - Reset<br>
    <kbd>M</kbd> - Toggle Music
`;
document.body.appendChild(keyboardHints);

// Responsive adjustments
window.addEventListener('resize', () => {
    if (!state.isRunning) {
        initializeBoard();
    }
});
