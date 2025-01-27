let board = document.querySelector(".board");
let message = document.querySelector(".turn-message")
let playerX = 0;
let playerO = 0;
let startTurn = "playerX";
let currentTurn = startTurn;
let selectedInstances = [];
let resulted = false;

//close popup
let closePopup = document.querySelector(".popup-close");
let overlay = document.querySelector(".overlay");
let popup = document.querySelector(".popup");
closePopup.addEventListener("click", () => {
    overlay.style.display = "none";
    popup.style.display = "none";
})


board.addEventListener("click", (event) => {
    target = event.target.closest(".tile");
    const selectedOption = target.querySelector(".option");
    if (selectedOption.textContent === "") {
        if (!resulted) {
            const tileId = target.dataset.id;
            updateList(tileId);
            selectedOptionUpdate(selectedOption, currentTurn);
            currentTurn = switchTurn(currentTurn);
            turnUpdaterScreen(currentTurn);
            if (selectedInstances.length > 4) {
                gameEvaluater();
            }
        }
    }

})

function updateList(tileId) {
    selectedInstances[tileId - 1] = currentTurn === "playerX" ? "X" : "O";
}

function selectedOptionUpdate(selectedOption, currentTurn) {
    if (currentTurn === "playerX") {
        selectedOption.textContent = "X";
        selectedOption.classList.add("X");
    }
    else {
        selectedOption.textContent = "O";
        selectedOption.classList.add("O");
    }
}

function switchTurn(currentTurn) {
    return (currentTurn === "playerX") ? "playerO" : "playerX";
}

function turnUpdaterScreen(currentTurn) {
    if (currentTurn === "playerX") {
        message.textContent = "It's Player X turn"
    }
    else if (currentTurn === "playerO") {
        message.textContent = "It's Player O turn"
    }
}

function gameEvaluater() {
    let allPossibilities = [];
    allPossibilities.push(selectedInstances[0] + selectedInstances[1] + selectedInstances[2]);
    allPossibilities.push(selectedInstances[3] + selectedInstances[4] + selectedInstances[5]);
    allPossibilities.push(selectedInstances[6] + selectedInstances[7] + selectedInstances[8]);
    allPossibilities.push(selectedInstances[0] + selectedInstances[3] + selectedInstances[6]);
    allPossibilities.push(selectedInstances[1] + selectedInstances[4] + selectedInstances[7]);
    allPossibilities.push(selectedInstances[2] + selectedInstances[5] + selectedInstances[8]);
    allPossibilities.push(selectedInstances[0] + selectedInstances[4] + selectedInstances[8]);
    allPossibilities.push(selectedInstances[2] + selectedInstances[4] + selectedInstances[6]);
    if (allPossibilities.includes("XXX")) {
        return gameOver("X");
    }
    else if (allPossibilities.includes("OOO")) {
        return gameOver("O");
    }
    else if (selectedInstances.filter(item => item).length === 9) {
        return gameOver("Draw");
    }
}

function gameOver(winner) {
    resulted = true;
    if (winner === "X") {
        message.textContent = "Player X is the winner"
        playerX++;
    }
    else if (winner === "O") {
        message.textContent = "Player O is the winner"
        playerO++;
    }
    else {
        message.textContent = "It is Draw"
    }
    scoreUpdater();
}

function scoreUpdater() {
    let Xscore = document.querySelector(".playerXscore");
    let Oscore = document.querySelector(".playerOscore");
    Xscore.textContent = `player X: ${playerX}`;
    Oscore.textContent = `player O: ${playerO}`;
}

