// Gameboard that represents the board in an array
function gameBoard() {
    // Create a new board
    const createBoard = () => {
        const newBoard = [];
        for (let row = 0; row < 3; row++) {
            newBoard[row] = [];
            for(let column = 0; column < 3; column++) {
                newBoard[row].push(square());
            }
        }
        return newBoard;
    }
    const getBoard = ()=> board;
    // Add marker to array


    const addMarker = (row, column, player) => {
        // check if the square is available, if yes, fill square with marker
        // if no, stop
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

    return {getBoard, addMarker, printBoard}

}

// Create new players
const players = createPlayers();


// Create individual squares on the board
function square() {
    let value = "";

    // Get the appropriate player marker to change the square
    const playerMarker = (player) => {
        value = player.marker;

        console.log(player.marker)

    }

    // Get the marker value of the square
    const getValue = () => {
        return value;
    }
    return {playerMarker, getValue}
}


// Gamecontroller manages game logic
function gameController(gameBoard) {
    const board = gameBoard.getBoard();
    // Check if there is a win or lose
    const winLose = ()=> {
        // Win cases
        // board[0][0], board[0][1], board[0][2] are the same
        // board[1][0], board[1][1], board[1][2] are the same
        // board[2][0], board[2][1], board[1][2] are the same
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
        
    }

    const checkTie = () => {
        const noAvailableSquare = () => {
            // if found is false that means, there are no available squares
            const found = board.some((row)=> {
                return row.some(index=>index.getValue()==="")
            })
        
            console.log("Has an empty square been found" + found)
            return !found;
        }
        // If there are no more empty squares and nobody won, then it is a tie
        console.log("Are all squares filled?" + noAvailableSquare())
        return (noAvailableSquare())
    }
    winLose()

    // If someone has won or the game is tied, the game is over
    const gameOver = ()=> {
        console.log("WinLose " + winLose())
        console.log("checktie" + checkTie())
        return winLose() || checkTie();
        
    }
    // you can check if winLose is true each time you play a turn
    // Current Player makes turn --> check for Win --> if true, current player must be winner --> else switch turn
    // something like if(winLose) currentPlayer().name, then switch turn??
    // another alternative is to return the player name with the associated marker from win lose function itself
    // then create a function that accepts the currentPlayer() as a player parameter

    // Get the current player

    // Start off with the first player being the current player, set active status to true
    players[0].toggleActive();

    const getCurrentPlayer = () => {
        // If playerOne has active status of true, current player is player one, else player two is the current player
        let currentPlayer;
        for (let player of players) {
            if(player.getActiveStatus()) {
                currentPlayer = player;
            } 
        }
        return currentPlayer;
     }

    // Switch player turn
    const switchPlayer = () => {
        const currentPlayer = getCurrentPlayer();
        const otherPlayer = players.find(player=>player!==currentPlayer);
        currentPlayer.toggleActive();
        otherPlayer.toggleActive();

    }
    // Play a round of tictactoe
    const playRound = (row, column) => {
        gameBoard.addMarker(row, column, getCurrentPlayer())
        gameBoard.printBoard();
        switchPlayer();
        console.log(gameOver());
        if (gameOver()) {
            displayController.deactivate();
            console.log("Game Over");
            return;
        }
    }
    return {playRound}
}
<<<<<<< Updated upstream
=======

// Gamecontroller manages game logic
function gameController(gameBoard) {
    const board = gameBoard.getBoard();

    // Check if there is a win or lose
    const winLose = ()=> {
        // Win cases
        // board[0][0], board[0][1], board[0][2] are the same
        // board[1][0], board[1][1], board[1][2] are the same
        // board[2][0], board[2][1], board[1][2] are the same
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
        
    }

    const checkTie = () => {
        const checkAllSquaresEmpty = () => {
            const found = board.some((row, index) => row[index].getValue()==="")

            // console.log("Is there empty square?" + found )
            // if found is true, all squares are not empty, so return false
            return !found;
        }
        // If there are no more empty squares and nobody won, then it is a tie
        return (checkAllSquaresEmpty())
    }
    winLose()

    // If someone has won or the game is tied, the game is over
    const gameOver = ()=> {
        return winLose() || checkTie();
        
    }
    
    // Get the current player

    // Start off with the first player being the current player, set active status to true
    players[0].toggleActive();

    const getCurrentPlayer = () => {
        // If playerOne has active status of true, current player is player one, else player two is the current player
        let currentPlayer;
        for (let player of players) {
            if(player.getActiveStatus()) {
                currentPlayer = player;
            } 
        }
        return currentPlayer;
     }

    // Switch player turn
    const switchPlayer = () => {
        const currentPlayer = getCurrentPlayer();
        const otherPlayer = players.find(player=>player!==currentPlayer);
        currentPlayer.toggleActive();
        otherPlayer.toggleActive();

    }
    // Play a round of tictactoe
    const playRound = (row, column) => {
        gameBoard.addMarker(row, column, getCurrentPlayer())
        gameBoard.printBoard();
        switchPlayer();
        console.log(gameOver());
        if (gameOver()) {
        console.log("Game Over");
            return;
        }
    }
    return {playRound}
}

// const game = gameController();
// game.playRound(0,2) //X
// game.playRound(0,0) //O
// game.playRound(1,0) //X

// game.playRound(0,1) //O
// game.playRound(1,1) //X
// game.playRound(1,2) //O
// game.playRound(2,1) //X
// game.playRound(2,0) //O
// game.playRound(2,2) //X



>>>>>>> Stashed changes
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
}

function createPlayer(name, marker) {
    let active = false;
    const toggleActive = ()=> {
        active = !active;
    }
    const getActiveStatus = () => {
        return active
    }
    return {name, marker, toggleActive, getActiveStatus }
}


<<<<<<< Updated upstream
function getCurrentPlayer() {
    // If playerOne has active status of true, current player is player one, else player two is the current player
    let currentPlayer = players[0].getActiveStatus() ? players[0] : players[1];
    console.log(currentPlayer.getActiveStatus, currentPlayer)
    return currentPlayer;
 }

// Display game on user interface
const displayController = (function() {
    const gameBoardDivs = document.querySelectorAll(".game-container > div");
    const newGameBoard = gameBoard();
    const game = new gameController(newGameBoard);
 
    const activate = () => {
        gameBoardDivs.forEach(div => {
            div.style.pointerEvents = 'auto';
        });
    };

    const deactivate = () =>{
        gameBoardDivs.forEach(div=> {
            div.style.pointerEvents = 'none';
        })
    };

    const clear = () => {
        gameBoardDivs.forEach(div=> {
            div.innerText = "";
        })
    }
    const renderBoard = () => {
        function getDivIndex() {
            gameBoardDivs.forEach((elem, i)=> {
                elem.dataset.rowIndex = Math.floor(i/3)
            })
            gameBoardDivs.forEach((elem, i)=> {
                elem.dataset.colIndex = i%3
            })
        }
        getDivIndex();
 
 
        gameBoardDivs.forEach((div) => {
            div.addEventListener('click', ()=> {
                // divArray = [0, 1,2,3,4,5,6,7,8]
                // play round for each div clicked
                // determine which div corresponds to which row number and column number to play round
                // div.dataset.rowIndex = row;
                // div.dataset.colIndex = col;
 
 
                console.log(div.dataset.rowIndex, div.dataset.colIndex)
                game.playRound(div.dataset.rowIndex, div.dataset.colIndex)
               
                // Mark box based on current player marker
                div.innerText = newGameBoard.getBoard()[div.dataset.rowIndex][div.dataset.colIndex].getValue();
            })
        })
    }
    renderBoard()
    return {
        activate,
        deactivate, 
        clear
    }

 })();
    
 
 
 
 
createPlayers();
drawMarker();
=======
    }
    renderBoard()


}
    

displayController();
>>>>>>> Stashed changes
