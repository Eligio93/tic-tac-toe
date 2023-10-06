function Player(name, mark, active) {
    return {
        name,
        mark,
        active
    }
}

let gameBoard = (() => {
    let gameArray = [];

    //Append to DOM the gameboard from the array
    const createBoard = () => {
        let playgrid = document.createElement("div");
        playgrid.id = "playgrid";
        document.body.appendChild(playgrid)
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("button");
            cell.classList.add("cell");
            cell.setAttribute("data-cell", i);
            gameArray.push("");
            playgrid.appendChild(cell);
        }
        let buttonNav = document.createElement("div");
        buttonNav.id = "buttonNav";
        document.body.appendChild(buttonNav);
        let restart = document.createElement("button");
        restart.id = "restart";
        restart.textContent = "Restart";
        buttonNav.appendChild(restart);
        let newGame = document.createElement("button");
        newGame.id = "newGame";
        newGame.textContent = "New Game";
        buttonNav.appendChild(newGame);

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
    //Get the active player
    let activePlayer = () => {

        if (playerOne.active == true) {
            return playerOne.name
        } else {
            return playerTwo.name
        }

    }
    //Check winner function
    let checkWinner = (playerOne, playerTwo) => {
        let array = gameBoard.getBoard();
        let cellButtons = document.querySelectorAll(".cell");
        //give all the possible winning combinations
        let winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        //check if all the wiining combinations matching the board
        for (let element of winningCombinations) {
            const [a, b, c] = element;
            if (array[a] === playerOne.mark && array[b] === playerOne.mark && array[c] === playerOne.mark) {
                for (let i = 0; i < cellButtons.length; i++) {
                    cellButtons[i].disabled = true;
                }
                document.getElementById("turnMessage").textContent=playerOne.name+" wins the game"
                
            } else if (array[a] === playerTwo.mark && array[b] === playerTwo.mark && array[c] === playerTwo.mark) {
                for (let i = 0; i < cellButtons.length; i++) {
                    cellButtons[i].disabled = true;
                }
                document.getElementById("turnMessage").textContent=playerTwo.name+" wins the game"
               
            }
            //if there is no more cells available is a tie
            if (array.every(cell => cell !== "")) {
                document.getElementById("turnMessage").textContent="It's a tie"; 
            }
        }
    }

    return {
        switchPlayer,
        checkWinner,
        activePlayer
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


function checkValidity(name1, mark1, name2, mark2) {
    if (name1 == "" || name2 == "" || name1 == name2) {
        alert("Please check the names entered")
        return false
    } else if (mark1 == mark2) {
        alert("The markers can not be the same");
        return false
    } else {
        return true
    }

}

function playGame() {
    //get data from user input

    let name1 = document.getElementById("name1").value;
    let mark1 = document.getElementById("mark1").value;
    let name2 = document.getElementById("name2").value;
    let mark2 = document.getElementById("mark2").value;
    //Check data validity
    if (checkValidity(name1, mark1, name2, mark2)) {
        document.getElementById("startNewGame").style.display = "none";
        document.getElementById("main").style.display = "none";
        //Assign values to players
        playerOne.name = name1;
        playerOne.mark = mark1;
        playerTwo.name = name2;
        playerTwo.mark = mark2;
        document.getElementById("title").style.fontSize = "30px";
        let turn = document.createElement("p");
        turn.id="turnMessage";
        turn.textContent = gameController.activePlayer() + "'s turn"
        document.body.appendChild(turn);
        gameBoard.createBoard();
        // event when restart button clicked
        let restart = document.getElementById("restart");
        restart.addEventListener("click", function () {
            gameBoard.cleanBoard(gameBoard.getBoard());
            displayController.printBoard(gameBoard.getBoard());
            playerOne.active = true;
            playerTwo.active = false;
            turn.textContent = playerOne.name + "'s turn";
            let cellButtons = document.querySelectorAll(".cell");
            for (let i = 0; i < cellButtons.length; i++) {
                cellButtons[i].disabled = false;
            }
        })
        //event when newGame get clicked
        let newGame = document.getElementById("newGame");
        newGame.addEventListener("click", function () {
            location.reload();
        })

        let allCell = document.querySelectorAll(".cell");
        allCell.forEach(function (element) {
            element.addEventListener("click", function () {
                let index = element.getAttribute("data-cell");

                if (playerOne.active == true && element.textContent == "") {
                    gameBoard.getBoard()[index] = playerOne.mark;
                    displayController.printBoard(gameBoard.getBoard());
                    gameController.switchPlayer();
                    turn.textContent = gameController.activePlayer() + "'s turn"
                    gameController.checkWinner(playerOne, playerTwo);


                } else if (playerTwo.active == true && element.textContent == "") {
                    gameBoard.getBoard()[index] = playerTwo.mark;
                    displayController.printBoard(gameBoard.getBoard());
                    gameController.switchPlayer();
                    turn.textContent = gameController.activePlayer() + "'s turn"
                    gameController.checkWinner(playerOne, playerTwo);

                }
            })

        })
    }


}

let playerOne = new Player("", "", true);
let playerTwo = new Player("", "", false);

document.getElementById("startNewGame").addEventListener("click", playGame);




