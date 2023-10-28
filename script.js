function renderGame() {
    let gameBoardArr = ["X", "X", "O", "X", "X", "O", "X", "X", "O" ];
    const gameBoardDivs = document.querySelectorAll(".game-container > div");
    console.log(gameBoardDivs);
    gameBoardDivs.forEach((div, i) => {
        div.innerText = gameBoardArr[i];
    })
}

renderGame();
