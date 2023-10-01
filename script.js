let playgrid = document.getElementById("playgrid");
let gameArray=["","","","","","","","",""];

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

function Player(name,mark,active){
    return {
        name,
        mark,
        active
    }
}
let playerOne=new Player("Eligio","O", true);
let playerTwo=new Player("Marco","X",false);

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


    return{
        switchPlayer
    }
})();
console.log(playerOne,playerTwo);
gameController.switchPlayer();
console.log(playerOne,playerTwo);


