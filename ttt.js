// Define classes for the X and O symbols
const X_CLASS = 'cell--x'
const O_CLASS = 'cell--o'

// Define an array of arrays representing all winning combinations
const WINNING_COMBINATIONS = [  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

// Get references to the game board, message area, and restart button
const cellElements = document.querySelectorAll('[data-cell-index]')
const boardElement = document.querySelector('.board')
const messageElement = document.querySelector('.message')
const restartButton = document.querySelector('.restart-btn')

// Set the initial turn to O (bot)
let oTurn

// Call the startGame function to set up the game board
startGame()

// Add an event listener to the restart button so the game can be restarted
restartButton.addEventListener('click', startGame)

// Function to start the game
function startGame() {
  oTurn = true // bot starts as O

  // Reset all cells to have no symbol and add a click event listener to each cell
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(O_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  // Set the board to display the hover class for the current turn
  setBoardHoverClass()

  messageElement.innerText = ""
  // If it's the bot's turn, make a move
  if (oTurn) {
    makeComputerMove() // bot makes the first move
  }
}
// Function to handle a user's click on a cell
function handleClick(e) {
   // Get a reference to the clicked cell
  const cell = e.target
  if (oTurn) { // if it's the bot's turn, do nothing
    return;
  }
   // Otherwise, set the current class to X
  const currentClass = X_CLASS 

  // Place the X symbol in the clicked cell
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } 
  // If neither of those conditions is true, it's the bot's turn
  else {
    oTurn = !oTurn

     // Set the board to display the hover class for the current turn
    setBoardHoverClass()
    makeComputerMove() // Make a move for the bot
  }
}
// Function to make a move for the bot
function makeComputerMove() {
   // If it's not the bot's turn, do nothing
  if (!oTurn) {
    return;
  }
  // Send a request to the server to get the bot's move
  fetch('http://localhost:8080/computer-move')
    .then(response => response.json())
    .then(data => {
      // Get the index of the cell where the bot will place its symbol
      const cellIndex = data.index

      // If the index is valid, place the bot's symbol in the cell
      if (cellIndex >= 0 && cellIndex < cellElements.length) {
        const currentClass = oTurn ? O_CLASS : X_CLASS
        const cell = cellElements[cellIndex]
        // Check if the clicked cell has already been marked by the user or the computer.
        if (!cell.classList.contains(X_CLASS) && !cell.classList.contains(O_CLASS)) {
          setTimeout(() => {
            placeMark(cell, currentClass)
            if (checkWin(currentClass)) {
              endGame(false)
            } else if (isDraw()) {
              endGame(true)
            } else {
              oTurn = !oTurn
              setBoardHoverClass()
              if (!oTurn) {
                makeComputerMove()
              }
            }
          }, 1000); // Wait 1 second before making the move
        } else {
          makeComputerMove()
        }
      }
       else {// If the cell index is invalid, log an error to the console.
        console.error(`Invalid cell: ${cellIndex}`)
      }
    })
}

// This function adds the current player's mark to the specified cell.
function placeMark(cell, currentClass) {
  if (cell) {
    cell.classList.add(currentClass)
  }
}
// This function sets the appropriate hover class for the game board based on whose turn it is.
function setBoardHoverClass() {
  boardElement.classList.remove(X_CLASS)
  boardElement.classList.remove(O_CLASS)
  if (oTurn) {
    boardElement.classList.add(O_CLASS)
    messageElement.innerText = "Computer's turn"
  } else {
    boardElement.classList.add(X_CLASS)
    messageElement.innerText = "User's turn"
  }
}

// This function checks if the current player has won the game.
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}
// This function ends the game and displays the appropriate message.
function endGame(draw) {
  if (draw) {
    messageElement.innerText = "Draw!"
  } else {
    messageElement.innerText = `${oTurn ? "O's" : "X's"} Wins!`
  }
  // Remove the click event listener from all game cells so the game can't be continued.
  cellElements.forEach(cell => {
    cell.removeEventListener('click', handleClick)
  })
}
// This function checks if the game has ended in a draw.
function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
  })
}


