let playgrid=document.getElementById("playgrid");

let gameBoard=(()=>{
    //initialize the empty array
    let gameArray=["","","","","","","","",""];
    //create the gameboard from the array
    const createBoard=(array)=>{
        for(let i=0;i < array.length;i++){
            const cell=document.createElement("button");
            cell.classList.add("cell");
            cell.setAttribute("data-cell", i);
            cell.textContent=array[i];
            playgrid.appendChild(cell);
        }
    }

    return {
        gameArray,
        createBoard
    }

})();

let gameController=((player1,player2)=>{
    


})(player1,player2);

const Player=(name,mark,status)=>{
    const getName=()=>name;
    const getStatus =() =>status;

    return {
        getName,
        getStatus
    }
}







const player1= Player("Eligio","X","On");
const player2= Player("Marco","O","Off");
console.log(player1);

gameBoard.createBoard(gameBoard.gameArray);