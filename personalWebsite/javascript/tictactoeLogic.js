/**
 * @file the logic behind the tic tac toe game displayed on its own page Under ancademic.html
 * author John Fox
 * This code is all original and not copied from a tutorial
 */

//this is a global game object that every function calls
let tictactoe = null;

/**
 * This code initializes tic tac toe object and displays the board
 * It gets called when the start game button gets clicked on the html page
 * start game and end game alternate between the same button.
 * only one of the buttons shows up at a time
 */
function gameStart() {
   //Checking if the tictactoe object is null is just a double check it should allways be null when gameStart() gets called
   if (tictactoe == null) {
      //width of the board in spaces
      let boardSize = 3;
      //instantiate the currently null global game obj to a board with board size width and height
      tictactoe = new Game(boardSize);
      //get an array of all of the divs that are aligned in a grid that represent a space you can place a tictactoe piece
      let elements = document.getElementsByClassName("space");
      //loop through the array of space elements
      for (let i = 0; i < elements.length; i++) {
         //for each element un hide and allow pointer events for it
         elements[i].style.display = "block";
         elements[i].style.pointerEvents = "auto";
      }

      //call the function that changes the display that tells the players who is up
      displayTurn();
      //get rid of start game button
      document.getElementById("startGame").remove();

      //these 7 lines below put the end game button where start game used to be
      let endButton = document.createElement("div");
      endButton.className = "gameToggle";
      endButton.id = "endGame";
      endButton.setAttribute("onclick", "gameEnd();");
      endButton.innerHTML = "End Game";
      let container = document.getElementById("startEndContainer");
      container.appendChild(endButton);
   } 
}

/**
 * This code deletes the current  tic tac toe game object and clears the display
 * It gets called when the start game button gets clicked on the html page
 * start game and end game alternate between the same button.
 * only one of the buttons shows up at a time
 */
function gameEnd() {
   //Checking if the tictactoe object isn't null is just a double check it should never be null when gameEnd() gets called
   if (tictactoe != null) {
      let elements = document.getElementsByClassName("space");
      for (let i = 0; i < elements.length; i++) {
         elements[i].style.display = "none";
         elements[i].style.pointerEvents = "none";
         //innerHtml = "" overrides all other child elements or content within the space elements
         elements[i].innerHTML = "";
      }

      //get rid of the game over display
      let gameOver = document.getElementById("gameOver");
      if (gameOver != null) {
         gameOver.remove();
      }

      //get rid of the turn display
      document.getElementById("turnDisplay").remove();
      
      //wipe the game display
      //for rows of the display
      for (let x = 0; x < tictactoe.boardSize; x++) {    
         //for columns of the display
         for (let y = 0; y < tictactoe.boardSize; y++) {
            const curID = x + "," + y;
            const curSpace = document.getElementById(curID);
            curSpace.style.display = "none";
         }
      }
      //wipe the global game object
      tictactoe = null;
      //remove the end game button
      document.getElementById("endGame").remove();

      //these 7 lines below put the start game button where end game button was
      let startButton = document.createElement("div");
      startButton.className = 'gameToggle';
      startButton.id = 'startGame';
      startButton.setAttribute("onclick", "gameStart();");
      startButton.innerHTML = "Start Game"
      let container = document.getElementById("startEndContainer");
      container.appendChild(startButton);
   }
}

/**
 * create the content that goes in the turn display based on the turn then put in it the container 
 * responsible for positioning it called turnContainer
 */
function displayTurn() {
   //create the element to put the turn display content in
   let turnDisplay = document.createElement("div");
   turnDisplay.id = 'turnDisplay';

   //tictactoe.turn cycles between turn 0 and turn 1 thats why you can allways get the player number by adding 1
   const playerNumber = tictactoe.turn + 1;

   //the div words exists to seperate the words from the picture of the game piece
   let words = document.createElement("div");
   words.innerHTML = " aka player " + playerNumber + " is up";;
   words.id = "words";

   //use a function to determine which picture of a player piece to get depending on turn
   let playerPiece = getPlayerPiece();
   //put the player piece image in the turn display
   turnDisplay.appendChild(playerPiece);
   //put the words indicating which player is up in the turn display
   turnDisplay.appendChild(words);
   //get the div that positions where the turn display goes
   let turnContainer = document.getElementById("turnContainer");
   //put the turn display in the position container for it
   turnContainer.appendChild(turnDisplay);
}

/**
 * depending on turn it gets the different images associated with the 2 player pieces
 * @returns {Element} the image that is the player piece
 */
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

/**
 * This function handles when a player tries to click a space to place a piece
 * It is the main flow of the game
 * @param {number} xCoord the number 0-2 that represents the row the space is in
 * @param {number} yCoord the nubmer 0-2 that represents the column the space is in
 */
function clickSpace(xCoord, yCoord) {
   //curID has the pattern of the space divs in the html document
   const curID = xCoord + "," + yCoord;
   const curSpace = document.getElementById(curID);
   //dont let a player click anything if the game is over
   if (!tictactoe.gameOver) {
      if (tictactoe.grid[xCoord][yCoord].full == false) {
         //the space is empty so update Board
         tictactoe.placedMarks++;
         //update the game object that represents the game board
         updateBoard(xCoord, yCoord);
         //update the game display to match the object
         updateBoardDisplay(xCoord, yCoord);

         //every time a piece is placed check if it was a winning move
         let winStatus = checkWin(xCoord, yCoord);
         if (winStatus[0]) {
            //then somebody won
            tictactoe.gameOver = true;
            displayGameOver(xCoord, yCoord, winStatus, "win");
         } else if (tictactoe.placedMarks == 9) {
            //there was a draw
            tictactoe.gameOver = true;
            displayGameOver(xCoord, yCoord, winStatus, "draw");
         } else {
            //nobody won so change the turn on a cycle between 0 and 1
            tictactoe.turn = (tictactoe.turn + 1)%2;
         }
      } else {
         //the space is allready full make error effect
         curSpace.classList.add("shake");
         setTimeout(function() {
            curSpace.classList.remove("shake");
         }, 261);
      }
   }
   //no matter what happens update the turn disply every time a piece is clicked
   document.getElementById("turnDisplay").remove();
   displayTurn();
}

/**
 * update the global game object with the new placed piece in the x,y slot
 * @param {number} xCoord the number 0-2 that represents the row the space is in
 * @param {number} yCoord the nubmer 0-2 that represents the column the space is in
 */
function updateBoard(xCoord, yCoord) {
   tictactoe.grid[xCoord][yCoord].hasPlayersMark[tictactoe.turn] = true;
   tictactoe.grid[xCoord][yCoord].full = true;
}

/**
 * update the game display with the new placed piece in the x,y slot
 * @param {number} xCoord the number 0-2 that represents the row the space is in
 * @param {number} yCoord the nubmer 0-2 that represents the column the space is in
 */
function updateBoardDisplay(xCoord, yCoord) {
   const curID = xCoord + "," + yCoord;
   const curSpace = document.getElementById(curID);
   if (tictactoe.turn == 0) {
      //put x in slot
      insertImage(curSpace);
   } else if (tictactoe.turn == 1) {
      //put o in slot
      insertImage(curSpace);
   }
}

/**
 * Checks if the last placed move caused that player to win on that row
 * @param {number} xCoord the row where the win might have happened
 * @param {number} player  the player that just place the piece
 * @returns {number} a number where 1 indicates the player won and 0 indicates not
 */
function winOnRow(xCoord, player) {
   let status = 0;
   for (let i = 0; i < tictactoe.boardSize; i++) {
      if (tictactoe.grid[xCoord][i].hasPlayersMark[player]) {
         status++;
      }
   }
   //status = 1 means the player won on that row
   //status = 0 means the player did not win on that row
   return status == tictactoe.boardSize;
}

/**
 * Checks if the last placed move caused that player to win on that column
 * @param {number} yCoord the column where the win might have happened
 * @param {number} player  the player that just place the piece
 * @returns {number} a number where 1 indicates the player won and 0 indicates not
 */
function winOnCol(yCoord, player) {
   let status = 0;
   for (let i = 0; i < tictactoe.boardSize; i++) {
      if (tictactoe.grid[i][yCoord].hasPlayersMark[player]) {
         status++;
      }
   }
   //status = 1 means the player won on that column
   //status = 0 means the player did not win on that column
   return status == tictactoe.boardSize;
}

/**
 * Checks if the last placed move caused that player to win on the main diagonal
 * @param {number} player  the player that just place the piece
 * @returns {number} a number where 1 indicates the player won and 0 indicates not
 */
function winOnMainDiag(player) {
   let status = 0;
   for (let i = 0; i < tictactoe.boardSize; i++) {
      if (tictactoe.grid[i][i].hasPlayersMark[player]) {
         status++;
      }
   }
   //status = 1 means the player won on the main diagonal
   //status = 0 means the player did not win on that main diagonal
   return status == tictactoe.boardSize;
}

/**
 * Checks if the last placed move caused that player to win on the off diagonal
 * @param {number} player  the player that just place the piece
 * @returns {number} a number where 1 indicates the player won and 0 indicates not
 */
function winOnOffDiag(player) {
   let status = 0;
   for (let i = 0, j =2; i < tictactoe.boardSize; i++, j--) {
      if (tictactoe.grid[i][j].hasPlayersMark[player]) {
         status++;
      }
   }
   //status = 1 means the player won on the off diagonal
   //status = 0 means the player did not win on that off diagonal
   return status == tictactoe.boardSize;
}

//takes in the x coordinate and y coordinate of the most recent guess
//returns a number indicating in how many ways the guess won 0 = none
/**
 * 
 * @param {number} xCoord
 * @param {number} yCoord 
 * @returns a boolean array representing the status of each type of win
 */
function checkWin(xCoord, yCoord) {
   //typeStatus[0] is if any wins happened
   //typeStatus[1] is if a row win happened
   //typeStatus[2] is if a column win happened
   //typeStatus[3] is if a off diagonal win happened
   //typeStatus[4] is if a main diagonal win happened

   //make the status array
   let typeStatus = new Array(5);
   //set all of the values of the array to false
   for (let i = 0; i < typeStatus.length; i++) {
      typeStatus[i] = false;
   }
   //this number keeps track if any win happened so you dont have to loop through the array to rule it out
   //it goes in the 0th slot of the typeStatus array
   let totalStatus = 0;
   
   
   //check if the player won on the row
   if (winOnRow(xCoord, tictactoe.turn)) {
      typeStatus[1] = true;
      totalStatus++;
   }

   //check if the player won on the column
   if (winOnCol(yCoord, tictactoe.turn)) {
      typeStatus[2] = true;
      totalStatus++;
   }

   //check if the player won on the off diagonal
   if (xCoord + yCoord == 2 && winOnOffDiag(tictactoe.turn)) {
      typeStatus[3] = true;
      totalStatus++;
   }

   //check if the player won on the main diagonal
   if(xCoord == yCoord && winOnMainDiag(tictactoe.turn)) {
      typeStatus[4] = true;
      totalStatus++;
   }

   //if totalStatus was incremented the some type of win happened
   if (totalStatus !=0) {
      typeStatus[0] = true;
   }
   return typeStatus;
}

/**
 * Displays different game over content in a box dedicated for the end of game display
 * It can display game over player x wins 
 * or it can display game over game was a draw
 * @param {number} x 
 * @param {number} y 
 * @param {Array} winStatus 
 * @param {string} type 
 */
function displayGameOver(xCoord, yCoord, winStatus, type) {
   //make the element to put the content into
   let gameOverBox = document.createElement("div");
   //this if else determines what type of game end it was and puts different content in the game over box
   if (type === "draw") {
      gameOverBox.innerHTML = "Game was a draw";
   } else {
      let playerNumber = tictactoe.turn + 1;
      gameOverBox.innerHTML = "Game Over Player " + playerNumber + " wins";
   }
   gameOverBox.id = 'gameOver';
   let gameOverContainer = document.getElementById("gameOverContainer");

   //put the game over box in the div responsible for positioning it
   gameOverContainer.appendChild(gameOverBox);

   //check to see if a win happened on a row
   //if a win happened on a row put a dash in that row
   if (winStatus[1]) {
      //then a win on row x happened
      let dash = document.createElement("div");
      dash.className = "dash";
      dash.id = "row";
      const curID = xCoord + "," + "0";
      const curSpace = document.getElementById(curID);
      curSpace.appendChild(dash);
   }

   //check to see if a win happened on a column
   //if a win happened on a row put a dash in that column
   if (winStatus[2]) {
      //then a win on column y happened
      let dash = document.createElement("div");
      dash.className = "dash";
      dash.id = "col";
      const curID = "0" + "," + yCoord;
      const curSpace = document.getElementById(curID);
      curSpace.appendChild(dash);
   }

   //check to see if a win happened on the off diagonal
   //if a win happened on a row put a dash in the off diagonal
   if (winStatus[3]) {
      //then a win on off diagonal happened
      let dash = document.createElement("div");
      dash.className = "dash";
      dash.id = "offDiag";
      const curID = "2" + "," + "0";
      const curSpace = document.getElementById(curID);
      curSpace.appendChild(dash);
   }

   //check to see if a win happened in the main diagonal
   //if a win happened on a row put a dash in the off diagonal
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

/**
 * This function inserts a player piece image as a child in the element it was passed in
 * @param {Element} curSpace the space div that represents where to put the player piece image
 */
function insertImage(curSpace) {
   //create a new image element
   let img = document.createElement('img');
   
   //this if else determines which picture to put in by looking at the global game variables turn value
   if (tictactoe.turn == 0) {
      img.src = "../../assets/tictactoe/circle.png";
      img.alt = "bold circle";
   } else if (tictactoe.turn == 1) {
      img.src = "../../assets/tictactoe/x.png";
      img.alt = "bold x";
   }
   img.className = 'playerMark';

   //insert the player piece image into the space
   curSpace.appendChild(img);
}

/**
 * a object representing an entire tic tac toe game
 * This needs to be instantiated as a global variable in order for all the functions to work correcly
 */
class Game {
   /**
    * Create a game object
    * @param {number} b the width and height of a square tic tac toe board
    */
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

/**
 * slots go in the grid var of a game object
 * Slots 
 */
class Slot {
   /**
    * creates a slot for the grid with player placement information in it
    */
   constructor() {
      //full is a shortcut boolean var that saves us having to look at the array all the time
      this.full = false;
      //the hasPlayersMark array stores whether a player has put a piece in this slot
      //0th slot represents player 1
      //1st slot represents player 2
      this.hasPlayersMark = new Array(2);
      this.hasPlayersMark[0] = false;
      this.hasPlayersMark[1] = false; 
   }
}

