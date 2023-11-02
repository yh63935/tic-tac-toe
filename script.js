// Gameboard that represents the board in an array
function gameBoard() {
    const board = [];
    for (let row = 0; row < 3; row++) {
        board[row] = [];
        for(let column = 0; column < 3; column++) {
            board[row].push(square());
        }
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

const players = createPlayers();


// Create individual squares on the board
function square() {
    let value = "";

    // Get the appropriate player marker to change the square
    const playerMarker = (player) => {
        value = player.marker;


    }
    const getValue = () => {
        return value;
    }
    return {playerMarker, getValue}
}

// Gamecontroller manages game logic
function gameController() {
    // Switch players
    // Play round
        const gmb = gameBoard();
        // gmb.addMarker(0, 0, players[0])
        // gmb.addMarker(1, 0, players[0])
        // gmb.addMarker(2, 0, players[0])


    // Check if there is a win or lose
    const winLose = ()=> {
        // Win cases
        // board[0][0], board[0][1], board[0][2] are the same
        // board[1][0], board[1][1], board[1][2] are the same
        // board[2][0], board[2][1], board[1][2] are the same
        const board = gmb.getBoard();
        // Check for 3 in a row for row
        for(let row=0; row<board.length; row++) {
            let checkRow = [];
            console.log(board.map((elem, index)=>elem.map((inner, i)=> board[index][i].getValue())))
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
                console.log(board[row][column].getValue())
            }

            if (checkCol.every(square=>square ==="X") || checkCol.every(square=>square ==="O")) {
                console.log('Column win')
                return true;
            } 
        }

        // Check for a diagonal win
        for(let row=0; row<board.length; row++) {
            let checkDiagonalOne = [];
            for(let column=0; column< row.length; row++) {
                if(row===column) {
                    checkDiagonalOne.push(board[row][column].getValue())
                }
            }  
            if (checkDiagonalOne.every(square=>square==="X") || checkDiagonalOne.every(square=>square==="O")) {
                console.log('It\'s a diagonal win')
                return true;
            } ;
        }

        for(let row=0; row<board.length; row++) {
            let checkDiagonalTwo = [];
            for(let column=0; column< row.length; row++) {
                if(row+column === board.length-1) {
                    checkDiagonalTwo.push(board[row][column].getValue())
                }
            }  
            if (checkDiagonalTwo.every(square=>square==="X") || checkDiagonalTwo.every(square=>square==="O")) {
                console.log('It\'s a diagonal2 win')
                return true;
            } ;
        }

        
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
        console.log("Current player" + currentPlayer.getActiveStatus(), currentPlayer.name)
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
        gmb.addMarker(row, column, getCurrentPlayer())
        if (winLose()) {
            console.log("They win");
            return;
        }
        switchPlayer();
    }
    return {playRound}
}

const game = gameController();
game.playRound(0,0)
game.playRound(0,1)

game.playRound(0,2)

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




 function drawMarker() {
    const gameBoardDivs = document.querySelectorAll(".game-container > div");
    gameBoardDivs.forEach((div) => {
        div.addEventListener('click', ()=> {
            // Mark box based on current player marker
            div.innerText = getCurrentPlayer().marker;
            // Switch player
            getCurrentPlayer().toggleActive();
 
 
        })
    })
 }
 
