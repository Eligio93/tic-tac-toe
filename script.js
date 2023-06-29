let playgrid=document.getElementById("playgrid");

let gameBoard=(()=>{
    let gameArray=["","","","","","","","",""];
    
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

const player=(name,mark,status)=>{

    return {
        name,mark
    }
}







const player1= player("Eligio","X","On");
const player2= player("Marco","O","Off");

gameBoard.createBoard(gameBoard.gameArray);