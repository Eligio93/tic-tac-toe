let playgrid=document.getElementById("playgrid");

let gameBoard=(()=>{
    let gameArray=["X","O","X","O","X","O","X","O","X"];
    return {
        gameArray
    }

})();
function createBoard(array){
    for(let i=0;i < array.length;i++){
        const cell=document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-cell", i);
        cell.textContent=array[i];
        playgrid.appendChild(cell);
    }
}
createBoard(gameBoard.gameArray);