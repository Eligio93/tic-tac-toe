let playgrid = document.getElementById("playgrid");
let gameArray=["X","O","X","O","X","","",""];

let gameBoard = (() => {
        //Append to DOM the gameboard from the array
        const printBoard = (array) => {   
            for (let i = 0; i < array.length; i++) {
                const cell = document.createElement("button");
                cell.classList.add("cell");
                cell.setAttribute("data-cell", i);
                cell.textContent =array[i];
                playgrid.appendChild(cell);
            }
            
        }
        // Get the current array from the board
        const getBoard=()=>gameArray;    

    return {
        printBoard,
        getBoard,
        
    }

})();
console.log(gameBoard.getBoard());