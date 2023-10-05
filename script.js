let playerOne= new Player("","",true);
let playerTwo=new Player("","",false);
// let restart = document.getElementById("restart");
// restart.addEventListener("click", function () {
//     gameBoard.cleanBoard(gameBoard.getBoard());
//     displayController.printBoard(gameBoard.getBoard());
// })




let gameBoard = (() => {
    let gameArray = [];
   
    //Append to DOM the gameboard from the array
    const createBoard = () => {
        let playgrid = document.createElement("div");
        playgrid.id="playgrid";
        document.body.appendChild(playgrid)
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
                return console.log(playerOne.name+" wins");
            } else if (array[a] === playerTwo.mark && array[b] === playerTwo.mark && array[c] === playerTwo.mark) {
                return console.log(playerOne.name+" wins")
            }
            //if there is no more cells available is a tie
            if (array.every(cell => cell !== "")) {
                return console.log("Tie");
            }
        }
    }

    return {
        switchPlayer,
        checkWinner,
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
    document.getElementById("main").style.display="none";
    let name1=document.getElementById("name1").value;
    let mark1=document.getElementById("mark1").value;
    let name2=document.getElementById("name2").value;
    let mark2=document.getElementById("mark2").value;
    playerOne.name=name1;
    playerOne.mark=mark1;
    playerTwo.name=name2;
    playerTwo.mark=mark2;   
    gameBoard.createBoard();
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

//check if the inputs are correctly done
document.getElementById("newGame").addEventListener("click",playGame);









//playGame();



