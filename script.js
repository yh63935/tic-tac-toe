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
const players = createPlayers();
players[0].toggleActive();

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