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

        if(checkSquareAvailable()) {
            board[row][column].playerMarker(player);
            return true;
        } else {
            displayController.displayMessage("Pick another square");
            setTimeout(displayController.clearMessages, 2000);
            return false;
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

// Gamecontroller manages game logic
const gameController = (() => {
    const board = gameBoard.getBoard();
    let isGameActive = false;

    // Create all players
    function createPlayers() {
        const inputOne = document.getElementById('player1');
        const inputTwo = document.getElementById('player2');
        const addPlayerOneBtn = document.querySelector('.add-player');
        const addPlayerTwoBtn = document.querySelector('.add-player:nth-of-type(2)');
        const players = [];

        // Create each individual player 
        const createPlayer = (playerInstance, marker) => {
            let name = "";
            let active = false;
            const toggleActive = ()=> {
                active = !active;
            }
            const getActiveStatus = () => {
                return active
            };

            const resetPlayerName = () => {
                name = "";
            };

            const addName = (inputEl) => {
                    if(!isGameActive) {
                        displayController.clearResults();
                        displayController.displayMessage(`Press the start button first to start the game`);
                        setTimeout(displayController.clearMessages, 500);
                    } else if(!name) {
                        name = inputEl.value;
                    } else {
                        displayController.displayMessage(`${playerInstance} has already been named as ${name}`);
                        setTimeout(displayController.clearMessages, 2000);
                    }
                    // Clear input value after inserted
                    inputEl.value = "";
                };

            const getName = () => name;


            return {addName, getName, marker, toggleActive, getActiveStatus, resetPlayerName }
        };

        const playerOne = createPlayer("PlayerOne", "X")
        players.push(playerOne);
        const playerTwo = createPlayer("PlayerTwo", "O");
        players.push(playerTwo)

        addPlayerOneBtn.addEventListener("click", ()=> {
            playerOne.addName(inputOne);
        });
    
        addPlayerTwoBtn.addEventListener("click", ()=> {
            playerTwo.addName(inputTwo);
        });
    
        return players;
    };
    const players = createPlayers();

    const resetPlayerNames = () => {
        players.forEach(player => player.resetPlayerName())
    }
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
        resetPlayerNames();
        gameBoard.printBoard();
        gameBoard.clearBoard();
        gameBoard.printBoard();
        displayController.clearBoardInterface();
        displayController.clearResults();
        displayController.clearMessages();
        displayController.activateBoard();
    };

    // Play a round of tictactoe
    const playRound = (row, column) => {
        if (!getIsGameActive()) {
            displayController.deactivateBoard();
            return;
        }
        let currentPlayer = getCurrentPlayer();
        // Only proceed with the game if the player was able to add a marker successfully
        if (gameBoard.addMarker(row, column, currentPlayer)) {
            gameBoard.printBoard();
            switchPlayer();
            updateGameStatus();
            if (gameOver()) {
                displayController.displayResults(currentPlayer.getName());
                return;
            }
        }
        
    };

    return {playRound, startGame, winLose}

})();


// Display controller dislays game on user interface
const displayController = (() => {
    const gameBoardDivs = document.querySelectorAll(".game-container > div");
    const startBtn = document.querySelector('.start');
    const resultEl = document.querySelector('h2');
    const messageEl = document.querySelector('h3');


    // Allow edits of gameboard divs
    const activateBoard = () => {
        gameBoardDivs.forEach(div => {
            div.style.pointerEvents = 'auto';
        });
    };

    // Prevent gameboard divs from being edited
    const deactivateBoard = () => {
        gameBoardDivs.forEach(div=> {
            div.style.pointerEvents = 'none';
        })
    };

    const displayResults = (playerName) => {
        let result = "";
        if (gameController.winLose()) {
            result = `${playerName} has won!`;
        } else {
            result = "Tied game! Play again to determine the real winner!"
        }
        resultEl.innerText = result;
 
    };
 
 
    const displayMessage = (warning) => {
        messageEl.innerText = warning;
    }
 
    // Clear gameboard divs
    const clearBoardInterface = () => {
        gameBoardDivs.forEach(div=> {
            div.innerText = "";
        })
    }

    const clearMessages = () => {
        messageEl.innerText = "";
    };

    const clearResults = () => {
        resultEl.innerText = "";
    }


    startBtn.addEventListener("click", gameController.startGame);

    // Render board with player markers
    const renderBoard = (() => {
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
    })();

    return {
        activateBoard,
        deactivateBoard, 
        clearBoardInterface,
        clearMessages,
        clearResults,
        displayResults, 
        displayMessage
    }

 })();
    
 
 
 
 
