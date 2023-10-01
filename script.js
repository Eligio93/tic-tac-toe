
//let gameArray=["X","","","","","","","",""];

let gameBoard = (() => {
    let gameArray=[];
        //Append to DOM the gameboard from the array
        const createBoard = () => {
            let playgrid = document.getElementById("playgrid");
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement("button");
                cell.classList.add("cell");
                cell.setAttribute("data-cell", i);
                gameArray.push("X");
                //cell.textContent =array[i];
                playgrid.appendChild(cell);
            }
            
        }

        // Get the current array from the board
        let getBoard=()=>gameArray;

        //Clean the board in case of a new game
        const cleanBoard=function(array){
            for(let i=0;i<array.length;i++){
                array[i]="";
            }
            return array;
        }


    return {
        createBoard,
        getBoard,
        cleanBoard,
        
        
    }

})();

function Player(name,mark,active){
    return {
        name,
        mark,
        active
    }
}


let gameController=(()=>{
    //Change player function
    let switchPlayer=()=>{
        if (playerOne.active== true){
            playerOne.active=false;
            playerTwo.active=true;
        }else{
            playerOne.active=true;
            playerTwo.active=false;

        }
    }
    //Check winner function


    //
    return{
        switchPlayer
    }
})();

let displayController=(()=>{
    const printBoard=()=>{
       
    }

})();



let playerOne=new Player("Eligio","O", true);
let playerTwo=new Player("Marco","X",false);

gameBoard.createBoard();

