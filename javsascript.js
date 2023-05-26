



//This function renders everything, each div has a unique id when it is created 
//Each div has an event listener 
//It returns render and update so the other funcs can use them
const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""]

    const render = () => {
        let boardHTML = "";
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${index}">${square}</div>`
        })
        document.querySelector("#gameboard").innerHTML = boardHTML;
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener("click", Game.handleClick)
        })
    }
    const update = (index, value) => {
        gameboard[index] = value;
        render();
    }

    //Access gameboard so it can disable rewriting X/Os on divs that already have them.
    //This ensures gameboard is copied and not modified in anyway
    const getGameBoard = () => gameboard;

    return {
        render,
        update,
        getGameBoard,
    }
})();

//creating factory for player list
//mark is either X or O symbol
const createPlayer = (name, mark) => {
    return {
        name,
        mark
    }
}




//Needed to add (); at the end of the const func, not too sure why.
//For these kind of funcs, needs to return start as it was declared inside this scope and needed to be accessible outside.
const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        players = [
            createPlayer(document.querySelector("#player1").value, "X"),
            createPlayer(document.querySelector("#player2").value, "O")
        ]
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();
    }
    //when clicked on a div (each div has it's unique id tag), the game will update/redner 
    //Checks if div has x/o in it, if yes then it returns, if not then the plyaer chucks in x/o then 
    //Switches player after turn is over
    const handleClick = (event) => {
        let index = parseInt(event.target.id.split("-")[1]);
            if (Gameboard.getGameBoard() [index] !== "")
            return;
        Gameboard.update(index, players[currentPlayerIndex].mark);

            if(checkForWin(Gameboard.getGameBoard(), players[currentPlayerIndex].mark)) {
                gameOver = true;
                alert = `${players[currentPlayerIndex].name} won!}`
            }
        
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }

    //Loops through each div and clear it
    //Renders everything again
    const restart = () => {
        for (let i=0; i<9; i++){
            Gameboard.update(i, "")
        }
        Gameboard.render();
    }

    return {
        start,
        handleClick,
        restart
    }
})();


function checkForWin(board){
    const winningCombo = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i=0; i< winningCombo.length; i++){
        const [a, b, c] = winningCombo [i]
        //first board[a] determines if there is something in that div, without it it'll return true if it's blank
        if (board[a] && board[a] === board[b] && board[a] === board[c]){
            return true;
        }
    }
    return false;
}

const startBtn = document.querySelector("#startbtn")
const restartBtn = document.querySelector("#restartbtn")
startBtn.addEventListener("click", () => {
    Game.start();
})
restartBtn.addEventListener("click", ()=> {
    Game.restart();
})

