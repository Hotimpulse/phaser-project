// import init from "./phaser";
import upSound from '../assets/sounds/up.mp3';
import leftSound from '../assets/sounds/left.mp3';
import rightSound from '../assets/sounds/right.mp3';
import downSound from '../assets/sounds/down.mp3';
import { playTaskAudio } from "./scenarios";
import { init } from './phaser';
import tryAgainSound from '../assets/sounds/try_again.mp3';


localStorage.setItem('level', `1`);
let level = Number(localStorage.getItem('level'));
export let createGameDiv = () => {
  // let gameArea = document.getElementById("game");
  // init(gameArea);
  initializeGame(Number(level));
}

//gui
let scoreCount = document.createElement("div");
scoreCount.setAttribute("id", "score-count");
let livesCount = document.createElement("div");
livesCount.setAttribute("id", "lives-count");
document.body.appendChild(scoreCount);
document.body.appendChild(livesCount);
let gridContainer = document.querySelector('.grid-container');



let remainingLives, score;
function loadGui(score, remainingLives) {

  scoreCount.textContent = `${score} points`;
  livesCount.textContent = `${remainingLives} lives`;
  if (remainingLives < 0) {
    localStorage.setItem('lesson3', 'failed');
    gridContainer.style.display = 'none';
    scoreCount.textContent = ``;
    livesCount.textContent = ``;
    return;
  }
}

// game logic

const gridCells = document.querySelectorAll('.grid-cell');

const starImg = document.createElement('img');
starImg.src = './assets/imgs/star.png';
starImg.alt = 'Star';

const pacmanImg = document.createElement('img');
pacmanImg.src = './assets/imgs/pacman_left.png';
pacmanImg.alt = 'pacman hero icon';
pacmanImg.style.width = `2rem`;


function addDialogWindow() {
  
  let dialogWindow = document.createElement('dialog');
  dialogWindow.setAttribute('id', 'dialog-loss');
  let closeDialogBtn = document.createElement('button');
  closeDialogBtn.innerText = `Закрыть`;
  
  if (localStorage.getItem('lesson3') === 'failed') {
    dialogWindow.textContent = `Тотальный провал! Так держать!`;
    document.body.appendChild(dialogWindow);
    dialogWindow.appendChild(closeDialogBtn);
    dialogWindow.showModal();
    dialogWindow.style.visibility = 'visible';
    closeDialogBtn.addEventListener('click', () => {
      dialogWindow.close();
      document.body.removeChild(dialogWindow);
      window.location.reload();
    });
  } else if (localStorage.getItem('lesson3') === 'passed') {
    dialogWindow.textContent = `Здорово! Так держать!`;
  }
}

loadGui(score = 0, remainingLives = 3);

function initializeGame(level) {
  let currentLevel = Number(localStorage.getItem('level'));

  switch (currentLevel) {

    case 1:
      gridCells[7].appendChild(pacmanImg);
      playTaskAudio(1);

      gridCells.forEach(cell => {

        const rowValue = parseInt(cell.getAttribute('data-row'));
        const colValue = parseInt(cell.getAttribute('data-col'));
        if (rowValue === 1 && colValue === 0) {
          cell.addEventListener('click', () => {
              console.log('Correct click! You won!');
              showStar(1, 0);
              setTimeout(() => {
                localStorage.setItem('level', String(level + 1));
                initializeGame(level + 1);
              }, 1000);
  
              score += 2;
              loadGui(score, remainingLives);

        })
      }
    }); 
      // else {
      //       score -= 1;
      //       remainingLives -= 1;
      //       loadGui(score, remainingLives);
      //       if (remainingLives < 0) {
      //         console.log(`Game over!`);
      //         addDialogWindow();
      //         return;
      //       }
      //       showGhost(e.target);
      //     }
      // });
      break;

    case 2:
      gridCells[3].appendChild(pacmanImg);
      playTaskAudio(2);

      gridCells.forEach(cell => {

        const rowValue = parseInt(cell.getAttribute('data-row'));
        const colValue = parseInt(cell.getAttribute('data-col'));
        if (rowValue === 0 && colValue === 2) {
          cell.addEventListener('click', () => {
              console.log('Correct click! You won!');
              showStar(0, 2);
              setTimeout(() => {
                localStorage.setItem('level', String(level + 1));
                initializeGame(level + 1);
              }, 1000);
  
              score += 2;
              loadGui(score, remainingLives);
        })
       } 
      //  else {
      //       score -= 1;
      //       remainingLives -= 1;
      //       loadGui(score, remainingLives);
      //       if (remainingLives < 0) {
      //         console.log(`Game over!`);
      //         addDialogWindow();
      //         return;
      //       }
      //       showGhost(e.target);
      //     }
      });

      break;

    case 3:
      gridCells[2].appendChild(pacmanImg);
      playTaskAudio(3);

      gridCells.forEach(cell => {

        const rowValue = parseInt(cell.getAttribute('data-row'));
        const colValue = parseInt(cell.getAttribute('data-col'));
        if (rowValue === 0 && colValue === 1) {
          cell.addEventListener('click', () => {
              console.log('Correct click! You won!');
              showStar(0, 1);
              setTimeout(() => {
                localStorage.setItem('level', String(level + 1));
                initializeGame(level + 1);
              }, 1000);
  
              score += 2;
              loadGui(score, remainingLives);
            } 

      )}

          
          // else {
          //   score -= 1;
          //   remainingLives -= 1;
          //   loadGui(score, remainingLives);
          //   if (remainingLives < 0) {
          //     console.log(`Game over!`);
          //     addDialogWindow();
          //     return;
          //   }
          //   showGhost(e.target);
          // }
      });

      break;

    case 4:
      gridCells[1].appendChild(pacmanImg);
      playTaskAudio(4);

      gridCells.forEach(cell => {

        const rowValue = parseInt(cell.getAttribute('data-row'));
        const colValue = parseInt(cell.getAttribute('data-col'));
        if (rowValue === 2 && colValue === 2) {
          cell.addEventListener('click', () => {
              console.log('Correct click! You won!');
              showStar(2, 2);
              setTimeout(() => {
                localStorage.setItem('level', String(level + 1));
                initializeGame(level + 1);
              }, 1000);
  
              score += 2;
              loadGui(score, remainingLives);
            } 
      )}

          
          // else {
          //   score -= 1;
          //   remainingLives -= 1;
          //   loadGui(score, remainingLives);
          //   if (remainingLives < 0) {
          //     console.log(`Game over!`);
          //     addDialogWindow();
          //     return;
          //   }
          //   showGhost(e.target);
          // }
      });

      break;

    case 5:
      gridCells[8].appendChild(pacmanImg);
      playTaskAudio(5);

      gridCells.forEach(cell => {

        const rowValue = parseInt(cell.getAttribute('data-row'));
        const colValue = parseInt(cell.getAttribute('data-col'));
        if (rowValue === 0 && colValue === 0) {
          cell.addEventListener('click', () => {
              console.log('Correct click! You won!');
              showStar(0, 0);
              setTimeout(() => {
                gridCells[0].appendChild(pacmanImg);
              }, 1000);
  
              score += 2;
              loadGui(score, remainingLives);
              localStorage.setItem('lesson3', 'passed');
            } 

      )}

          
          // else {
          //   score -= 1;
          //   remainingLives -= 1;
          //   loadGui(score, remainingLives);
          //   if (remainingLives < 0) {
          //     console.log(`Game over!`);
          //     addDialogWindow();
          //     return;
          //   }
          //   showGhost(e.target);
          // }
      });

      break;

    default:
      console.log(`Check the initializeGame func`);
  }
}

function showStar(row, col) {
  const cellIndex = row * 3 + col;
  const cell = gridCells[cellIndex];
  cell.innerHTML = '';
  cell.appendChild(starImg);
  setTimeout(() => {
    starImg.classList.add('star-animation');
  }, 100)
}

function showGhost(cell) {
  const redGhost = document.createElement('img');

  redGhost.src = './assets/imgs/red_ghost.png';
  redGhost.alt = 'red ghost icon';
  redGhost.setAttribute('id', 'red-ghost');
  cell.appendChild(redGhost);

  setTimeout(() => {
    redGhost.style.transition = 'transform 0.2s, visibility 0.2s';
    redGhost.style.transform = 'scale(10)';
    redGhost.style.visibility = 'hidden';
    let tryAgainAudio = new Audio(tryAgainSound);
    tryAgainAudio.play();
    setTimeout(() => {
      blinkPacman(pacmanImg);
    }, 10);
  }, 500);
}

function blinkPacman(pacmanImg) {
  let isHidden = false;
  const blinkInterval = setInterval(() => {
    if (isHidden) {
      pacmanImg.style.visibility = 'visible';
    } else {
      pacmanImg.style.visibility = 'hidden';
    }
    isHidden = !isHidden;
  }, 100);

  setTimeout(() => {
    clearInterval(blinkInterval);
    pacmanImg.style.visibility = 'visible';
  }, 1000);
}