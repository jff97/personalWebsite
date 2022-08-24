//this is a global variable
let tictactoe = null;

//this function gets called by the start game button
function gameStart() {
   console.log("game start");
   //instantiate the game object
   if (tictactoe == null) {
      let boardSize = 3;
      let elements = document.getElementsByClassName("space");
      for (let i = 0; i < elements.length; i++) {
         elements[i].style.display = "block";
         elements[i].style.pointerEvents = "auto";
      }
      tictactoe = new Game(boardSize);
      displayTurn();

      document.getElementById("startGame").remove();
      let endButton = document.createElement("div");
      endButton.className = "gameToggle";
      endButton.id = "endGame";
      endButton.setAttribute("onclick", "gameEnd();");
      endButton.innerHTML = "End Game";
      let container = document.getElementById("startEndContainer");
      container.appendChild(endButton);
   } 
}

//this function gets called by the end game button
function gameEnd() {
   console.log("game end");
   if (tictactoe != null) {
      let elements = document.getElementsByClassName("space");
      for (let i = 0; i < elements.length; i++) {
         elements[i].style.display = "none";
         elements[i].style.pointerEvents = "none";
         elements[i].innerHTML = "";
      }
      //wipe the display of game over
      let gameOver = document.getElementById("gameOver");
      if (gameOver != null) {
         gameOver.remove();
      }
      document.getElementById("turnDisplay").remove();
      //wipe the game object
      for (let x = 0; x < tictactoe.boardSize; x++) {
         for (let y = 0; y < tictactoe.boardSize; y++) {
            const curID = x + "," + y;
            const curSpace = document.getElementById(curID);
            curSpace.style.display = "none";
         }
      }
      //<div class="gameToggle" id="startGame" onclick="gameStart()">Start Game</div>
      tictactoe = null;

      document.getElementById("endGame").remove();
      let startButton = document.createElement("div");
      startButton.className = 'gameToggle';
      startButton.id = 'startGame';
      startButton.setAttribute("onclick", "gameStart();");
      startButton.innerHTML = "Start Game"
      let container = document.getElementById("startEndContainer");
      container.appendChild(startButton);
   }
}
function displayTurn() {
   let turnDisplay = document.createElement("div");
   turnDisplay.id = 'turnDisplay';
   const playerNumber = tictactoe.turn + 1;
   const toDisplay = " aka player " + playerNumber + " is up";

   let words = document.createElement("div");
   words.innerHTML = toDisplay;
   words.id = "words";
   let playerPiece = getPlayerPiece();
   turnDisplay.appendChild(playerPiece);
   turnDisplay.appendChild(words);
   //turnDisplay.innerHTML = toDisplay;
   let turnContainer = document.getElementById("turnContainer");
   turnContainer.appendChild(turnDisplay);
}
function getPlayerPiece() {
   let playerPiece = document.createElement("img");
   playerPiece.id = "playerPiece";
   if (tictactoe.turn == 0) {
      playerPiece.src = "../../assets/tictactoe/circle.png";
   } else {
      playerPiece.src = "../../assets/tictactoe/x.png";
   }
   return playerPiece;
}
function clickSpace(xCoord, yCoord) {
   const curID = xCoord + "," + yCoord;
   const curSpace = document.getElementById(curID);
   if (!tictactoe.gameOver) {
      if (tictactoe.grid[xCoord][yCoord].full == false) {
         //the space is empty so update Board
         tictactoe.placedMarks++;
         updateBoard(xCoord, yCoord, tictactoe.turn);
         updateBoardDisplay(xCoord, yCoord, tictactoe.turn);
         let winStatus = checkWin(xCoord, yCoord, tictactoe.turn);
         if (winStatus[0]) {
            //then somebody won
            tictactoe.gameOver = true;
            displayGameOver(xCoord, yCoord, winStatus, tictactoe.turn, "win");
         } else if (tictactoe.placedMarks == 9) {
            //there was a draw
            tictactoe.gameOver = true;
            displayGameOver(xCoord, yCoord, winStatus, tictactoe.turn, "draw");
         } else {
            //nobody won so change the turn
            tictactoe.turn = (tictactoe.turn + 1)% 2;
         }
      } else {
         //the space is allready full make error effect
         curSpace.classList.add("shake");
         setTimeout(function() {
            curSpace.classList.remove("shake");
         }, 261);
      }
   }
   document.getElementById("turnDisplay").remove();
   displayTurn();
}

function updateBoard(x, y, player) {
   tictactoe.grid[x][y].hasPlayersMark[player] = true;
   tictactoe.grid[x][y].full = true;
}
function updateBoardDisplay(x, y, player) {
   const curID = x + "," + y;
   const curSpace = document.getElementById(curID);
   if (player == 0) {
      //put x in slot
      insertImage(curSpace, player);
   } else if (player == 1) {
      //put o in slot
      insertImage(curSpace, player);
   } else {
      //this should never happen
   }
}

function winOnRow(x, player) {
   let status = 0;
   for (let i = 0; i < tictactoe.boardSize; i++) {
      if (tictactoe.grid[x][i].hasPlayersMark[player]) {
         status++;
      }
   }
   return status == tictactoe.boardSize;
}

function winOnCol(y, player) {
   let status = 0;
   for (let i = 0; i < tictactoe.boardSize; i++) {
      if (tictactoe.grid[i][y].hasPlayersMark[player]) {
         status++;
      }
   }
   return status == tictactoe.boardSize;
}

function winOnMainDiag(player) {
   let status = 0;
   for (let i = 0; i < tictactoe.boardSize; i++) {
      if (tictactoe.grid[i][i].hasPlayersMark[player]) {
         status++;
      }
   }
   return status == tictactoe.boardSize;
}

function winOnOffDiag(player) {
   let status = 0;
   for (let i = 0, j =2; i < tictactoe.boardSize; i++, j--) {
      if (tictactoe.grid[i][j].hasPlayersMark[player]) {
         status++;
      }
   }
   return status == tictactoe.boardSize;
}

//takes in the x coordinate and y coordinate of the most recent guess
//returns a number indicating in how many ways the guess won 0 = none
function checkWin(x, y, player) {
   //status[0] is if any wins happened
   //status[1] is if a row win happened
   //status[2] is if a column win happened
   //status[3] is if a off diagonal win happened
   //status[4] is if a main diagonal win happened
   let typeStatus = new Array(5);
   for (let i = 0; i < typeStatus.length; i++) {
      typeStatus[i] = false;
   }
   //this number keeps track if any win happened so you dont have to loop through the array to rule it out
   let totalStatus = 0;
   let won = false;
   
   won = winOnRow(x, player);
   if (won) {
      typeStatus[1] = true;
      totalStatus++;
   }
   won = winOnCol(y, player);
   if (won) {
      typeStatus[2] = true;
      totalStatus++;
   }
   if (x + y == 2) {
      won = winOnOffDiag(player);
      if (won) {
         typeStatus[3] = true;
         totalStatus++;
      }
   }
   if(x == y) {
      won = winOnMainDiag(player);
      if (won) {
         typeStatus[4] = true;
         totalStatus++;
      }
   }

   if (totalStatus !=0) {
      typeStatus[0] = true;
   }
   return typeStatus;
}
function displayGameOver(x, y, winStatus, turn, type) {
   
   let gameOverBox = document.createElement("div");
   let playerNumber = turn + 1;
   if (type === "draw") {
      gameOverBox.innerHTML = "Game was a draw";
   } else {
      gameOverBox.innerHTML = "Game Over Player " + playerNumber + " wins";
   }
   gameOverBox.id = 'gameOver';
   let gameOverContainer = document.getElementById("gameOverContainer");
   gameOverContainer.appendChild(gameOverBox);

   
   if (winStatus[1]) {
      //then a win on row x happened
      let dash = document.createElement("div");
      dash.className = "dash";
      dash.id = "row";
      const curID = x + "," + "0";
      const curSpace = document.getElementById(curID);
      curSpace.appendChild(dash);
   }
   if (winStatus[2]) {
      //then a win on column y happened
      let dash = document.createElement("div");
      dash.className = "dash";
      dash.id = "col";
      const curID = "0" + "," + y;
      const curSpace = document.getElementById(curID);
      curSpace.appendChild(dash);
   }
   if (winStatus[3]) {
      //then a win on off diagonal happened
      let dash = document.createElement("div");
      dash.className = "dash";
      dash.id = "offDiag";
      const curID = "2" + "," + "0";
      const curSpace = document.getElementById(curID);
      curSpace.appendChild(dash);
   }
   if (winStatus[4]) {
      //then a win on main diagonal happened
      let dash = document.createElement("div");
      dash.className = "dash";
      dash.id = "mainDiag";
      const curID = "0" + "," + "0";
      const curSpace = document.getElementById(curID);
      curSpace.appendChild(dash);
   }
}
function insertImage(curSpace, player) {
   let img = document.createElement('img');
   
   if (player == 0) {
      img.src = "../../assets/tictactoe/circle.png";
      img.alt = "bold circle";
   }
   if (player == 1) {
      img.src = "../../assets/tictactoe/x.png";
      img.alt = "bold x";
   }
   img.className = 'playerMark';
   curSpace.appendChild(img);
}

class Game {
   constructor(b) {
      this.boardSize = b;
      this.turn = 0;
      this.gameOver = false;
      this.placedMarks = 0;

      //make every space on the board have a status of empty
      let g = new Array(b);
      for (var i = 0; i < g.length; i++) {
         g[i] = new Array(b);
         for (var j = 0; j < g[i].length; j++) {
            g[i][j] = new Slot();
         }
      }
      //set it in the object
      this.grid = g;
   }
}
class Slot {
   constructor() {
      this.full = false;
      let p = new Array(2);
      p[0] = false;
      p[1] = false; 
      this.hasPlayersMark = p;
   }
}

