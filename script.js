let playgrid = document.getElementById("playgrid");
let gameArray=["","","","","","","",""];

let gameBoard = (() => {
    //initialize the empty array
    gameArray=["X"];
    //create the gameboard from the array
    const createBoard = (array) => {   
        for (let i = 0; i < array.length; i++) {
            const cell = document.createElement("button");
            cell.classList.add("cell");
            cell.setAttribute("data-cell", i);
            cell.textContent =array[i];
            playgrid.appendChild(cell);
        }
        
    }
    let getBoard= function(){
        return gameArray
    }
    

    return {
        getBoard,
        createBoard,
        // gameArray
        
    }

})();



const Player = (name, mark, status) => {


    return {
        name,
        mark,
        status
    }
}
const switchPlayer = function (player1, player2) {
    if (player1.status == "On") {
        player1.status = "Off";
        player2.status = "On";
    } else {
        player1.status = "On";
        player2.status = "Off"
    }

}



//function playRound
function playRound(){
   

}

let player1 = Player("Eligio", "X", "On");
let player2 = Player("Marco", "O", "Off");






console.log(player1.status,player2.status);

switchPlayer(player1,player2);
console.log(player1.status,player2.status);
switchPlayer(player1,player2);
console.log(player1.status,player2.status);

//gameBoard.createBoard();
//console.log(createBoard.gameArray)


function handleButtonClick(event) {
    const button = event.target;
    console.log(event);
    const dataCell = button.getAttribute('data-cell');
    console.log(dataCell);
    //qua andrà la funzione di playround

}
const buttons = document.querySelectorAll("button[data-cell]");
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});
