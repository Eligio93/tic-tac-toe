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
        let buttonNav=document.createElement("div");
        buttonNav.id="buttonNav";
        document.body.appendChild(buttonNav);
        let restart=document.createElement("button");
        restart.id="restart";
        restart.textContent="Restart";
        buttonNav.appendChild(restart);
        let newGame2=document.createElement("button");
        newGame2.id="newGame2";
        newGame2.textContent="New Game";
        buttonNav.appendChild(newGame2);

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
    //Get the active player
    let activePlayer=()=>{
        console.log(playerOne,playerTwo)
        if(playerOne.active==true){
            return playerOne.name
        }else{
            return playerTwo.name
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

function playGame() {
    //get data from user input
    
    let name1=document.getElementById("name1").value;
    let mark1=document.getElementById("mark1").value;
    let name2=document.getElementById("name2").value;
    let mark2=document.getElementById("mark2").value;
    //Check data validity
    if(checkValidity(name1,mark1,name2,mark2)){
    document.getElementById("newGame").style.display="none";
    document.getElementById("main").style.display="none";
    //Assign values to players
    playerOne.name=name1;
    playerOne.mark=mark1;
    playerTwo.name=name2;
    playerTwo.mark=mark2;
    document.getElementById("title").style.fontSize="30px";
    let turn=document.createElement("p");
    turn.textContent=gameController.activePlayer()+"'s turn"
    document.body.appendChild(turn);    
    gameBoard.createBoard();
    let allCell = document.querySelectorAll(".cell");
    allCell.forEach(function (element) {
        element.addEventListener("click", function () {
            let index = element.getAttribute("data-cell");
           
            if (playerOne.active == true && element.textContent == "") {
                gameBoard.getBoard()[index] = playerOne.mark;
                displayController.printBoard(gameBoard.getBoard());
                gameController.switchPlayer();
                turn.textContent=gameController.activePlayer()+"'s turn"
                gameController.checkWinner(playerOne, playerTwo);


            } else if (playerTwo.active == true && element.textContent == "") {
                gameBoard.getBoard()[index] = playerTwo.mark;
                displayController.printBoard(gameBoard.getBoard());
                gameController.switchPlayer();
                turn.textContent=gameController.activePlayer()+"'s turn"
                gameController.checkWinner(playerOne, playerTwo);

            }
        })

    })
    }
    

}
function checkValidity(name1,mark1,name2,mark2){
    if(name1=="" || name2=="" || name1==name2){
        alert ("Please check the names entered")
        return false
    }else if(mark1==mark2){
        alert ("The markers can not be the same");
        return false
    }else{
        return true
    }

}

document.getElementById("newGame").addEventListener("click",playGame);




