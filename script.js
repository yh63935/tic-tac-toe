// Gameboard that represents the board in an array
function gameBoard() {
    const board = [];
    for (let row = 0; row < 3; row++) {
        board[row] = [];
        for(let column = 0; column < 3; column++) {
            board[row].push(square());
        }
    }
    // Add marker to array
    const addMarker = (row, column, player) => {
        // check if the square is available, if yes, fill square with marker
        // if no, stop
        const checkSquareAvailable = () => {
            return board[row][column].getValue() === "";
        }

        if (checkSquareAvailable()) {
            board[row][column].addMarker(player)
        } else {
            console.log("Pick another square")
        }
    }

    // Print the values of the gameboard 
    const printBoard = () => {
        console.log(board.map(row=>row.map(square=>square.getValue())))
    }

    return {addMarker, printBoard}

}

const players = createPlayers();
players[0].toggleActive();
const gmb = gameBoard();
gmb.addMarker(0, 1, players[0])
gmb.printBoard();

// Create individual squares on the board
function square() {
    let value = "";

    const addMarker = (player) => {
        value = player.marker;
        console.log(player.marker)
    }
    const getValue = () => {
        return value;
    }
    return {addMarker, getValue}
}
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
    console.log(players)
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


function getCurrentPlayer() {
    // If playerOne has active status of true, current player is player one, else player two is the current player
    let currentPlayer = players[0].getActiveStatus() ? players[0] : players[1];
    console.log(currentPlayer.getActiveStatus, currentPlayer)
    return currentPlayer;
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
 
 
createPlayers();
drawMarker();