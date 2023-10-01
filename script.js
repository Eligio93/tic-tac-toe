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

        //Clean the board in case of a new game
        const cleanBoard=function(array){
            for(let i=0;i<array.length;i++){
                array[i]="";
            }
            return array;
        }


    return {
        printBoard,
        getBoard,
        cleanBoard
        
    }

})();
console.log(gameBoard.getBoard());
console.log(gameArray);