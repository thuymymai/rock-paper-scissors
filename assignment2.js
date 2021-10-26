let winHistory = [];
let pScore = 0;
let cScore = 0;
const game = () => {
const outtroScreen = document.querySelector(".outtro");
const replayBtn = document.querySelector(".button2");
const match = document.querySelector(".match");
const options = document.querySelectorAll(".options button");
const playerScore = document.querySelector(".player-score p");
const computerScore = document.querySelector(".computer-score p");
const winner_info = document.querySelector(".winner_info");
const winner = document.querySelector(".winner");

//Start the Game
  const startGame = () => {
  const playBtn = document.querySelector(".intro button");
  const introScreen = document.querySelector(".intro");
  const circle = document.querySelector('.circle');
  const hands1 = document.querySelector('.hands1');
  
// Fade in the match screen  
  playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      circle.classList.add("fadeOut"); 
      hands1.classList.add("fadeOut");
      match.classList.add("fadeIn");
    });
  };
  
  //Play Match
  const playMatch = () => {
  const playerHand = document.querySelector(".player-hand");
  const computerHand = document.querySelector(".computer-hand");
  const hands = document.querySelectorAll(".hands img");

  hands.forEach(hand => {
    hand.addEventListener("animationend", function() {
        this.style.animation = "";
      });
    });
    
  //Computer Options
   const computerOptions = ["rock", "paper", "scissors"];

   options.forEach(option => {
    option.addEventListener("click", function() {
    
  //Computer Choice
   const computerNumber = Math.floor(Math.random() * 3);
   const computerChoice = computerOptions[computerNumber];
    
  //Function to fadeInOuttro
   const fadeInOuttro = () => {
   match.classList.remove('fadeIn');
   outtroScreen.classList.add("fadeIn");
   }; 

  //Check 10 wins function
   const whoWins = function() { 
    if (pScore === 10){
      console.log('Player is the winner');
      winner_info.textContent = "You win 10 times!" 
      fadeInOuttro();
      }
    if (cScore === 10){
      console.log('Computer is the winner');
      winner_info.textContent = "Computer wins 10 times!"
      fadeInOuttro();
      }
    };

  //Check 3 wins in a row function
   const checkWinsInARow = (winCount) => {
    if (winHistory.length < winCount) {
    return false;
    }
   const itemsCompared = winHistory.slice(winHistory.length - winCount);
   const last = itemsCompared[winCount-1];
   let counter = 1;
   for (let i=[winCount-2]; i>=0; i--) {
     console.log(itemsCompared[i]);
    if (itemsCompared[i] === last){
        counter++;
    }else{
      break;
    }
    if (counter === winCount){
      if (last === 'c'){
        winner_info.textContent = "Computer wins 3 times in a row!";
        return winCount + 'wins in a row for commputer';
      }
      if (last === 'p'){
        winner_info.textContent = "You win 3 times in a row!";
        return winCount + 'wins in a row for player';
        }
      }
    }
      return false;
  }  
    
  setTimeout(() => {
  //Compare playerChoice vs computerRandom
      compareHands(this.textContent, computerChoice);
    
  //Update Images
      playerHand.src = `${this.textContent}.png`;
      computerHand.src = `${computerChoice}.png`;

  //Call functions to check who wins first
      whoWins();

    if (checkWinsInARow(3)) {
      console.log('game over');
      console.log(checkWinsInARow(3));
      fadeInOuttro();
    }else {
      console.log('game continues');
    } 
    
  }, 2000);
    
  //Shake hand with rock always
      playerHand.src = `rock.png`;
      computerHand.src = `rock.png`;
        
  //Animation
      playerHand.style.animation = "shakePlayer 2s ease";
      computerHand.style.animation = "shakeComputer 2s ease";
     
     });
    });
  };
  //Update score
    const updateScore = () => {
      playerScore.textContent = pScore;
      computerScore.textContent = cScore;
  };
   
  //Compare computer hand and player hand
    const compareHands = (playerChoice, computerChoice) => {
    
  //Checking for a tie
    if (playerChoice === computerChoice) {
      winner.textContent = "It is a tie";
      winHistory.push('t');
      console.log('It is a tie')
      return;
    }
  //Check for Rock
    if (playerChoice === "rock") {
      if (computerChoice === "scissors") {
        winner.textContent = "Player Wins";
        winHistory.push('p');
        pScore++;
        console.log('Player wins');
        updateScore();
        return;
      } else {
        winner.textContent = "Computer Wins";
        cScore++;
        console.log('Computer wins');
        winHistory.push('c');
        updateScore();
        return;
      }
    }
  //Check for Paper
    if (playerChoice === "paper") {
      if (computerChoice === "scissors") {
        winner.textContent = "Computer Wins";
        cScore++;
        console.log('Computer wins');
        winHistory.push('c');
        updateScore();
        return;
      } else {
        winner.textContent = "Player Wins";
        pScore++;
        console.log('Player wins');
        winHistory.push('p');
        updateScore();
        return;
      }
    }
  //Check for Scissors
    if (playerChoice === "scissors") {
      if (computerChoice === "rock") {
        winner.textContent = "Computer Wins";
        cScore++;
        console.log('Computer wins');
        winHistory.push('c');
        updateScore();
        return;
      } else {
        winner.textContent = "Player Wins";
        pScore++;
        console.log('Player wins');
        winHistory.push('p');
        updateScore();
        return;
      }
    }
  
  };
  //Restart game
    replayBtn.addEventListener("click", function(){
      pScore = 0;
      cScore = 0;
      playerScore.textContent = 0;
      computerScore.textContent = 0;
      winner.textContent = "Choose an option";
      winHistory =[];
      outtroScreen.classList.remove('fadeIn');
      match.classList.add('fadeIn');
  });
  
  //Call all the inner function
  startGame();
  playMatch();

};

//Call the 'start the game function'
game();
