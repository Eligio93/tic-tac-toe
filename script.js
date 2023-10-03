
let restart = document.getElementById("restart");
restart.addEventListener("click", function () {
    gameBoard.cleanBoard(gameBoard.getBoard());
    displayController.printBoard(gameBoard.getBoard());
})




let gameBoard = (() => {
    let gameArray = [];
    let playgrid = document.getElementById("playgrid");
    //Append to DOM the gameboard from the array
    const createBoard = () => {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("button");
            cell.classList.add("cell");
            cell.setAttribute("data-cell", i);
            gameArray.push("");
            playgrid.appendChild(cell);
        }

    }

    // Get the current array from the board
    let getBoard = () => gameArray;

    //Clean the board in case of a new game
    const cleanBoard = function (array) {
        for (let i = 0; i < array.length; i++) {
            array[i] = "";
        }
        return array;
    }


    return {
        createBoard,
        getBoard,
        cleanBoard,


    }

})();

function Player(name, mark, active) {
    return {
        name,
        mark,
        active
    }
}


let gameController = (() => {
    //Change player function
    let switchPlayer = () => {
        if (playerOne.active == true) {
            playerOne.active = false;
            playerTwo.active = true;
        } else {
            playerOne.active = true;
            playerTwo.active = false;

        }
    }
    //Check winner function

    let checkWinner = (playerOne, playerTwo) => {
        let array = gameBoard.getBoard();
        let winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Righe
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonne
            [0, 4, 8], [2, 4, 6] // Diagonali
        ];
        for (let element of winningCombinations) {
            const [a, b, c] = element;
            if (array[a] === playerOne.mark && array[b] === playerOne.mark && array[c] === playerOne.mark) {
                return console.log("player one wins");
            } else if (array[a] === playerTwo.mark && array[b] === playerTwo.mark && array[c] === playerTwo.mark) {
                return console.log("Player 2 wins")
            }
            if (array.every(cell => cell !== "")) {
                return console.log("Tie");
            }
        }

    }

    return {
        switchPlayer,
        checkWinner
    }
})();





let displayController = (() => {
    //print the game array on the board
    const printBoard = (array) => {
        for (let i = 0; i < array.length; i++) {
            let cell = document.querySelector('[data-cell="' + i + '"]');
            cell.textContent = array[i];
        }


    }

    return {
        printBoard
    }

})();

function playGame() {
    let allCell = document.querySelectorAll(".cell");
    allCell.forEach(function (element) {
        element.addEventListener("click", function () {
            let index = element.getAttribute("data-cell");
            if (playerOne.active == true && element.textContent == "") {
                gameBoard.getBoard()[index] = playerOne.mark;
                displayController.printBoard(gameBoard.getBoard());
                gameController.switchPlayer();
                gameController.checkWinner(playerOne, playerTwo);


            } else if (playerTwo.active == true && element.textContent == "") {
                gameBoard.getBoard()[index] = playerTwo.mark;
                displayController.printBoard(gameBoard.getBoard());
                gameController.switchPlayer();
                gameController.checkWinner(playerOne, playerTwo);

            }
        })
    })

}



let playerOne = new Player("Eligio", "O", true);
let playerTwo = new Player("Marco", "X", false);

gameBoard.createBoard();
playGame();



