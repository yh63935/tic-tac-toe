function createPlayers() {
    const inputOne = document.getElementById('player1');
    const inputTwo = document.getElementById('player2');
    const addPlayerOneBtn = document.querySelector('.add-player');
    const addPlayerTwoBtn = document.querySelector('.add-player:nth-of-type(2)');
    const players = [];
    addPlayerOneBtn.addEventListener('click', ()=> {
        if(!players[0]) {
            const playerOne = createPlayer(inputOne.value, "X")
            playerOne.toggleActive();
            players.push(playerOne);
            console.log(players)
        }
        else {
            console.log("You already added Player One")
        }
    });

    addPlayerTwoBtn.addEventListener('click', ()=> {
        if (!players[1]) {
            const playerTwo = createPlayer(inputTwo.value, "O");
            players.push(playerTwo)
            console.log(players)
        }
        else {
            console.log("You already added Player Two")
        }
        
    })

    console.log(players)
    // Maybe put this elsewhere
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

createPlayers();