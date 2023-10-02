
    let restart=document.getElementById("restart");
    restart.addEventListener("click", function(){
        gameBoard.cleanBoard(gameBoard.getBoard());
        console.log(gameBoard.getBoard());
        displayController.printBoard(gameBoard.getBoard());
    })




let gameBoard = (() => {
    let gameArray=[];
    let playgrid = document.getElementById("playgrid");
        //Append to DOM the gameboard from the array
        const createBoard = () => {
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement("button");
                cell.classList.add("cell");
                cell.setAttribute("data-cell", i);
                gameArray.push("");
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
    //print the game array on the board
    const printBoard=(array)=>{
        for(let i=0;i<array.length;i++){
            let cell = document.querySelector('[data-cell="' + i + '"]');
            cell.textContent=array[i];
        }
        
       
    }

    return{
        printBoard
    }

})();

function playGame(){
    let allCell=document.querySelectorAll(".cell");
    allCell.forEach(function(element){
        element.addEventListener("click",function(){
            let index=element.getAttribute("data-cell");
            if(playerOne.active==true && element.textContent==""){
                gameBoard.getBoard()[index]=playerOne.mark;
                displayController.printBoard(gameBoard.getBoard());
                gameController.switchPlayer();
                console.log(gameBoard.getBoard());

            }else if(playerTwo.active==true && element.textContent==""){
                gameBoard.getBoard()[index]=playerTwo.mark;
                displayController.printBoard(gameBoard.getBoard());
                gameController.switchPlayer();
                console.log(gameBoard.getBoard());
            }
        })
    })

}



let playerOne=new Player("Eligio","O", true);
let playerTwo=new Player("Marco","X",false);

gameBoard.createBoard();
playGame();



