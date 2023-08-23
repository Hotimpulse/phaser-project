// import init from "./phaser";
import upSound from '../assets/sounds/up.mp3';
import leftSound from '../assets/sounds/left.mp3';
import rightSound from '../assets/sounds/right.mp3';
import downSound from '../assets/sounds/down.mp3';
import { playTaskAudio } from "./scenarios";
import { init } from './phaser';


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

function loadGui(score, remainingLives) {
  scoreCount.innerText = `${score} points`;
  livesCount.innerText = `${remainingLives} lives`;
  if (remainingLives < 0) {
    localStorage.setItem('lesson3', 'failed');
    gridContainer.style.display = 'none';
    scoreCount.innerText = ``;
    livesCount.innerText = ``;
    return;
  }
}

// game logic

const gridCells = document.querySelectorAll('.grid-cell');
loadGui(0, 3);

const starImg = document.createElement('img');
starImg.src = './assets/imgs/star.png';
starImg.alt = 'Star';

const pacmanImg = document.createElement('img');
pacmanImg.src = './assets/imgs/pacman_left.png';
pacmanImg.alt = 'pacman hero icon';
pacmanImg.style.width = `2rem`;


function initializeGame(level) {
  let currentLevel = Number(localStorage.getItem('level'));
  let remainingLives = 3;
  let score = 0;
  switch (currentLevel) {

    case 1:
      gridCells[7].appendChild(pacmanImg);
      playTaskAudio(1);

      gridCells.forEach(cell => {

        const rowValue = parseInt(cell.getAttribute('data-row'));
        const colValue = parseInt(cell.getAttribute('data-col'));

        cell.addEventListener('click', () => {
          if (rowValue === 1 && colValue === 0) {
            console.log('Correct click! You won!');
            showStar(1, 0);
            setTimeout(() => {
              localStorage.setItem('level', String(level + 1));
              initializeGame(level + 1);
            }, 1000);
            
            score += 2;
            loadGui(score, remainingLives);
          }
          if (rowValue !== 1 && colValue !== 0) {
            score -= 1;
            remainingLives -= 1;
            loadGui(score, remainingLives);
            if (remainingLives < 0) {
              console.log(`Game over!`);
              return;
            }
          }
        });
      });
      break;

    case 2:
      gridCells[3].appendChild(pacmanImg);
      playTaskAudio(2);

      gridCells.forEach(cell => {
        const rowValue = parseInt(cell.dataset.row);
        const colValue = parseInt(cell.dataset.col);
        cell.addEventListener('click', () => {
          if (rowValue === 0 && colValue === 2) {
            console.log('Correct click! You won!');
            showStar(0, 2);
            setTimeout(() => {
              localStorage.setItem('level', String(level + 1));
              initializeGame(level + 1);
            }, 1000);
            score += 2;
            loadGui(score, remainingLives);
            // cell.removeEventListener('click', () => {});
          }
          if (rowValue !== 0 && colValue !== 2) {
            score -= 1;
            remainingLives -= 1;
            loadGui(score, remainingLives);
            if (remainingLives < 0) {
              console.log(`Game over!`);
              return;
            }
          }
        })
      })

      break;

    case 3:
      gridCells[2].appendChild(pacmanImg);
      playTaskAudio(3);
      gridCells.forEach(cell => {
        const rowValue = parseInt(cell.dataset.row);
        const colValue = parseInt(cell.dataset.col);
        cell.addEventListener('click', () => {
          if (rowValue === 0 && colValue === 1) {
            console.log('Correct click! You won!');
            showStar(0, 1);
            setTimeout(() => {
              localStorage.setItem('level', String(level + 1));
              initializeGame(level + 1);
            }, 1000);
            score += 2;
            loadGui(score, remainingLives);
          } else if (rowValue !== 0 && colValue !== 1) {
            score -= 1;
            remainingLives -= 1;
            loadGui(score, remainingLives);
            if (remainingLives < 0) {
              console.log(`Game over!`);
              return;
            }
          }
        })
      })

      break;

    case 4:
      gridCells[1].appendChild(pacmanImg);
      playTaskAudio(4);
      gridCells.forEach(cell => {
        const rowValue = parseInt(cell.dataset.row);
        const colValue = parseInt(cell.dataset.col);
        cell.addEventListener('click', () => {
          if (rowValue === 2 && colValue === 2) {
            console.log('Correct click! You won!');
            showStar(2, 2);
            setTimeout(() => {
              localStorage.setItem('level', String(level + 1));
              initializeGame(level + 1);
            }, 1000);
            score += 2;
            loadGui(score, remainingLives);
          } else if (rowValue !== 0 && colValue !== 0) {
            score -= 1;
            remainingLives -= 1;
            loadGui(score, remainingLives);
            if (remainingLives < 0) {
              console.log(`Game over!`);
              return;
            }
          }
        })
      })

      break;

    case 5:
      gridCells[8].appendChild(pacmanImg);
      playTaskAudio(5);
      gridCells.forEach(cell => {
        const rowValue = parseInt(cell.dataset.row);
        const colValue = parseInt(cell.dataset.col);
        cell.addEventListener('click', () => {
          if (rowValue === 0 && colValue === 0) {
            console.log('Correct click! You won!');
            showStar(0, 0);
            setTimeout(() => {
              gridCells[0].appendChild(pacmanImg);
            }, 1000);
            score += 2;
            loadGui(score, remainingLives);
            localStorage.setItem('lesson3', 'passed');
          } else if (rowValue !== 0 && colValue !== 0) {
            score -= 1;
            remainingLives -= 1;
            loadGui(score, remainingLives);
            if (remainingLives < 0) {
              console.log(`Game over!`);
            }
          }
        })
      })

      break;

    default:
      console.log(`Check the initializeGame func`);
  }
}

let handleStarCheck = (level, row, col) => {
  switch (level) {
    case 1:
      if (level === 1 && row === 1 && col === 0) {
        success = true;
        initializeGame(2);
      } else {
        alert(`Nothing was found here!`);
        showGhost();
      }
      break;
    case 2:
      if (row === 2 && col === 0) {
        success = true;
        initializeGame(3);
      } else {
        alert(`Nothing was found here!`);
      }
      break;
    case 3:
      if (row === 3 && col === 0) {
        success = true;
        initializeGame(4);
      } else {
        alert(`Nothing was found here!`);
      }
      break;
    case 4:
      if (row === 4 && col === 0) {
        success = true;
        initializeGame(5);
      } else {
        alert(`Nothing was found here!`);
      }
      break;
    case 5:
      if (row === 0 && col === 0) {
        success = true;
        alert(`You won the game!`);
      } else {
        alert(`Nothing was found here!`);
      }
      break;
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