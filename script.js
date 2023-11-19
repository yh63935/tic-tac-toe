// Gameboard that represents the board in an array
const gameBoard = (() => {
    const board = [];
    for (let row = 0; row < 3; row++) {
        board[row] = [];
        for(let column = 0; column < 3; column++) {
            board[row].push(square());
        }
    }
    const getBoard = ()=> board;
    // Add marker to array

    const clearBoard = ()=> {
        board.forEach(row=> {
            row.forEach(square => {
                square.clear();
            })
        })
    };

    const addMarker = (row, column, player) => {
        // Fill square with marker if available
        const checkSquareAvailable = () => {
            return board[row][column].getValue() === "";
        }

        if (checkSquareAvailable()) {
            board[row][column].playerMarker(player)
        } else {
            console.log("Pick another square")
        }
    }

    // Print the values of the gameboard 
    const printBoard = () => {
        console.log(board.map(row=>row.map(square=>square.getValue())))
    }

    // Create individual squares on the board
    function square() {
        let value = "";

        // Get the appropriate player marker to change the square
        const playerMarker = (player) => {
            value = player.marker;
            // console.log(player.marker)
        };

        const clear = () => {
            value = "";
        };

        const getValue = () => {
            return value;
        }

        return {playerMarker, getValue, clear}
    }
    
    return {getBoard, addMarker, printBoard, clearBoard}

}



)();
// Create new players
const players = createPlayers();

// Gamecontroller manages game logic
const gameController = (() => {
    const board = gameBoard.getBoard();
    
    // Determines if the game is active or not
    let isGameActive = false;
    // Check if there is a win or lose
    const winLose = ()=> {

        // Check for 3 in a row for row
        for(let row=0; row<board.length; row++) {
            let checkRow = [];
            for(let column=0; column< board[row].length; column++) {
                checkRow.push(board[row][column].getValue())
            }  
            if (checkRow.every(square=>square==="X") || checkRow.every(square=>square==="O")) {
                console.log('It\'s a row win')
                return true;
            } ;
        }

        // Check for 3 in a row for column
        for (let column=0; column< 3; column++) {
            let checkCol = [];
            for(let row=0; row < board.length; row++) {
                checkCol.push(board[row][column].getValue());
            }

            if (checkCol.every(square=>square ==="X") || checkCol.every(square=>square ==="O")) {
                console.log('Column win')
                return true;
            } 
        }

        // Check for a diagonal win
        let checkDiagonalOne = [];
        for(let row=0; row<board.length; row++) {
            for(let column=0; column< board[row].length; column++) {
                if(row===column) {
                    checkDiagonalOne.push(board[row][column].getValue())
                }
            }  
        }
        if (checkDiagonalOne.every(square=>square==="X") || checkDiagonalOne.every(square=>square==="O")) {
            console.log('It\'s a diagonal win')
            return true;
        } ;

        let checkDiagonalTwo = [];
        for(let row=0; row<board.length; row++) {
            for(let column=0; column< board[row].length; column++) {
                if(row+column === board.length-1) {
                    checkDiagonalTwo.push(board[row][column].getValue())
                }
            }  
        }
        if (checkDiagonalTwo.every(square=>square==="X") || checkDiagonalTwo.every(square=>square==="O")) {
            console.log('It\'s a diagonal2 win')
            return true;
        } ;
        
    };

    // Check if there is a tie
    const checkTie = () => {
        const noAvailableSquare = () => {
            // Ff found is false that means there are no available squares
            const found = board.some((row)=> {
                return row.some(index=>index.getValue()==="")
            })
    
            // console.log("Has an empty square been found" + found)
            return !found;
        }
        // If there are no more empty squares and nobody won, then it is a tie
        // console.log("Are all squares filled?" + noAvailableSquare())
        return (noAvailableSquare())
    };

    // If someone has won or the game is tied, the game is over
    const gameOver = ()=> {
        console.log("is gameover" + (winLose() || checkTie()));
        return winLose() || checkTie();
    };

    // If gameOver is true, then isGameActive is false
    const updateGameStatus = () => {
        if(gameOver()) {
            isGameActive = false;
        }
    };

    // Get isGameActive status
    const getIsGameActive = ()=> {
        return isGameActive;
    };

    // Set playerOne active status to true
    players[0].toggleActive();

    // Get current player
    const getCurrentPlayer = () => {
        // If playerOne has active status of true, current player is player one, else player two is the current player
        let currentPlayer;
        for (let player of players) {
            if(player.getActiveStatus()) {
                currentPlayer = player;
            } 
        }
        return currentPlayer;
     };

    // Switch players for each turn
    const switchPlayer = () => {
        const currentPlayer = getCurrentPlayer();
        const otherPlayer = players.find(player=>player!==currentPlayer);
        currentPlayer.toggleActive();
        otherPlayer.toggleActive();

    };

    // Start game and restarts game regardless of isGameActive state
    const startGame = () => {
        isGameActive = true;
        console.log("startgame" + isGameActive)
        gameBoard.printBoard();
        gameBoard.clearBoard();
        gameBoard.printBoard();
        displayController.clear();
        displayController.activate();
    };

    // Play a round of tictactoe
    const playRound = (row, column) => {
        if (!getIsGameActive()) {
            displayController.deactivate();
            return;
        }
        gameBoard.addMarker(row, column, getCurrentPlayer())
        gameBoard.printBoard();
        switchPlayer();
        updateGameStatus();
        // console.log(gameOver());
        if (gameOver()) {
            console.log("Game Over");
            return;
        }
    };

    return {playRound, startGame}

})();

// Create all players
function createPlayers() {
    const inputOne = document.getElementById('player1');
    const inputTwo = document.getElementById('player2');
    const addPlayerOneBtn = document.querySelector('.add-player');
    const addPlayerTwoBtn = document.querySelector('.add-player:nth-of-type(2)');
    const players = [];
    const playerOne = createPlayer("PlayerOne", "X")
    players.push(playerOne);
    const playerTwo = createPlayer("PlayerTwo", "O");
    players.push(playerTwo)
    return players;
};

// Create each individual player 
function createPlayer(name, marker) {
    let active = false;
    const toggleActive = ()=> {
        active = !active;
    }
    const getActiveStatus = () => {
        return active
    }
    return {name, marker, toggleActive, getActiveStatus }
};

// Display controller dislays game on user interface
const displayController = (() => {
    const gameBoardDivs = document.querySelectorAll(".game-container > div");
    const startBtn = document.querySelector('.start');
    
    // Allow edits of gameboard divs
    const activate = () => {
        gameBoardDivs.forEach(div => {
            div.style.pointerEvents = 'auto';
        });
    };

    // Prevent gameboard divs from being edited
    const deactivate = () => {
        gameBoardDivs.forEach(div=> {
            div.style.pointerEvents = 'none';
        })
    };

    // Clear gameboard divs
    const clear = () => {
        gameBoardDivs.forEach(div=> {
            div.innerText = "";
        })
    }

    startBtn.addEventListener("click", gameController.startGame);

    // Render board with player markers
    const renderBoard = () => {
        (function getDivIndex() {
            gameBoardDivs.forEach((elem, i)=> {
                elem.dataset.rowIndex = Math.floor(i/3)
            })
            gameBoardDivs.forEach((elem, i)=> {
                elem.dataset.colIndex = i%3
            })
        })();
 
        gameBoardDivs.forEach((div) => {
            div.addEventListener('click', ()=> {
                // determine which div corresponds to which row number and column number to play round
                // div.dataset.rowIndex = row;
                // div.dataset.colIndex = col;
 
 
                // console.log(div.dataset.rowIndex, div.dataset.colIndex)
                gameController.playRound(div.dataset.rowIndex, div.dataset.colIndex)
                // Mark box based on current player marker
                div.innerText = gameBoard.getBoard()[div.dataset.rowIndex][div.dataset.colIndex].getValue();
            })
        })
    }

    renderBoard();

    return {
        activate,
        deactivate, 
        clear
    }

 })();
    
 
 
 
 
