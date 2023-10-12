// this is the vanilla JS implementation; I adapted the following code to work in Phaser.js;

// import upSound from '../assets/sounds/up.mp3';
// import leftSound from '../assets/sounds/left.mp3';
// import rightSound from '../assets/sounds/right.mp3';
// import downSound from '../assets/sounds/down.mp3';
// import { playTaskAudio, correctAudio1, correctAudio2, endGameAudio, wrongChoiceAudio, tryAgainAudio, tryNextTimeAudio } from "./scenarios";
// import tryNextTime from '../assets/sounds/try_next_time.mp3';

// export function pacmanGameRun() {
//   //gui
//   let scoreCount = document.createElement("div");
//   scoreCount.setAttribute("id", "score-count");
//   let livesCount = document.createElement("div");
//   livesCount.setAttribute("id", "lives-count");
//   document.body.appendChild(scoreCount);
//   document.body.appendChild(livesCount);
//   let gridContainer = document.createElement('div');
//   gridContainer.setAttribute('class', 'grid-container');
//   let remainingLives, score;

//   for (let i = 0; i < 9; i++) {
//     let gridCell = document.createElement('div');
//     gridCell.setAttribute('class', 'grid-cell');
//     gridContainer.appendChild(gridCell);
//   }
//   document.body.appendChild(gridContainer);


//   function loadGui(score, remainingLives) {

//     scoreCount.textContent = `${score} points`;
//     livesCount.textContent = `${remainingLives} lives`;
//     if (remainingLives < 0) {
//       localStorage.setItem('lesson3', 'failed');
//       gridContainer.style.display = 'none';
//       scoreCount.textContent = ``;
//       livesCount.textContent = ``;
//       return;
//     }
//   }

//   // game logic

//   const gridCells = document.querySelectorAll('.grid-cell');

//   const starImg = document.createElement('img');
//   starImg.src = './assets/imgs/star.png';
//   starImg.alt = 'Star';

//   const pacmanImg = document.createElement('img');
//   pacmanImg.src = './assets/imgs/pacman_left.png';
//   pacmanImg.alt = 'pacman hero icon';
//   pacmanImg.style.width = `2rem`;

//   function addDialogWindow() {

//     let dialogWindow = document.createElement('dialog');
//     dialogWindow.setAttribute('id', 'dialog-loss');
//     document.body.appendChild(dialogWindow);
//     let closeDialogBtn = document.createElement('button');
//     closeDialogBtn.innerText = `Закрыть`;

//     if (localStorage.getItem('lesson3') === 'failed') {
//       dialogWindow.showModal();
//       dialogWindow.style.visibility = 'visible';
//       dialogWindow.textContent = `Тотальный провал! Так держать!`;
//       dialogWindow.appendChild(closeDialogBtn);

//       closeDialogBtn.addEventListener('click', () => {
//         dialogWindow.close();
//         document.body.removeChild(dialogWindow);
//         window.location.reload();
//         localStorage.clear();
//       });
//     } else {
//       dialogWindow.showModal();
//       dialogWindow.style.visibility = 'visible';
//       dialogWindow.textContent = `Здорово! Так держать!`;
//       dialogWindow.appendChild(closeDialogBtn);

//       closeDialogBtn.addEventListener('click', () => {
//         dialogWindow.close();
//         document.body.removeChild(dialogWindow);
//         window.location.reload();
//         localStorage.clear();
//       });
//     }
//   }

//   loadGui(score = 0, remainingLives = 3);

//   function playGame(row, col) {

//     let targetCellIndex = row * 3 + col;
//     let hasWon = false;

//     function winClick() {
//       let level = Number(localStorage.getItem('level'));
//       if (!hasWon) {
//         hasWon = true;
//         showStar(row, col);
//         increaseLevel();
//         score += 2;
//         loadGui(score, remainingLives);
//         if (level === 5) {
//           localStorage.setItem('lesson3', 'passed');
//           setTimeout(() => {
//             gridCells[0].appendChild(pacmanImg);
//           }, 700);
//           setTimeout(() => {
//             addDialogWindow();
//           }, 1200);
//         }
//       }
//     }

//     function loseClick() {
//       if (!hasWon) {
//         score -= 1;
//         remainingLives -= 1;
//         loadGui(score, remainingLives);
//         showGhost(this);
//         tryAgainAudio.play();
//         if (remainingLives < 0) {
//           console.log(`Game over!`);
//           setTimeout(() => {
//             tryNextTimeAudio.play();
//           }, 1500);
//           addDialogWindow();
//         }
//       }
//     }

//     for (let i = 0; i < gridCells.length; i++) {
//       if (i === targetCellIndex) {
//         gridCells[i].addEventListener('click', winClick);
//       } else {
//         gridCells[i].addEventListener('click', loseClick);
//       }
//     }
//   }

//   function increaseLevel() {
//     let level = Number(localStorage.getItem('level'));
//     setTimeout(() => {
//       localStorage.setItem('level', String(level + 1));
//       let newLevel = Number(localStorage.getItem('level'));

//       initializeGame(newLevel);
//     }, 1000);
//   }

//   function initializeGame() {
//     try {
//       let currentLevel = Number(localStorage.getItem('level'));
//       switch (currentLevel) {

//         case 1:
//           gridCells[7].appendChild(pacmanImg);
//           playTaskAudio(1);
//           playGame(1, 0);

//           break;

//         case 2:
//           gridCells[3].appendChild(pacmanImg);
//           playTaskAudio(2);
//           playGame(0, 2);

//           break;

//         case 3:
//           gridCells[2].appendChild(pacmanImg);
//           playTaskAudio(3);

//           playGame(0, 1);

//           break;

//         case 4:
//           gridCells[1].appendChild(pacmanImg);
//           playTaskAudio(4);
//           playGame(2, 2);

//           break;

//         case 5:
//           gridCells[8].appendChild(pacmanImg);
//           playTaskAudio(5);
//           playGame(0, 0);
//           break;

//         default:
//           console.log(`Check the initializeGame func`);
//       }
//     } catch (err) {
//       console.log(`Your error is:`, err);
//     }
//   }

//   function showStar(row, col) {
//     const cellIndex = row * 3 + col;
//     const cell = gridCells[cellIndex];
//     cell.innerHTML = '';
//     cell.appendChild(starImg);
//     setTimeout(() => {
//       starImg.classList.add('star-animation');
//     }, 100)
//   }

//   function showGhost(cell) {
//     const redGhost = document.createElement('img');

//     redGhost.src = './assets/imgs/red_ghost.png';
//     redGhost.alt = 'red ghost icon';
//     redGhost.setAttribute('id', 'red-ghost');
//     cell.appendChild(redGhost);

//     setTimeout(() => {
//       redGhost.style.transition = 'transform 0.2s, visibility 0.2s';
//       redGhost.style.transform = 'scale(10)';
//       redGhost.style.visibility = 'hidden';
//       setTimeout(() => {
//         blinkPacman(pacmanImg);
//       }, 100);
//     }, 500);
//   }

//   function blinkPacman(pacmanImg) {
//     let isHidden = false;
//     const blinkInterval = setInterval(() => {
//       if (isHidden) {
//         pacmanImg.style.visibility = 'visible';
//       } else {
//         pacmanImg.style.visibility = 'hidden';
//       }
//       isHidden = !isHidden;
//     }, 100);

//     setTimeout(() => {
//       clearInterval(blinkInterval);
//       pacmanImg.style.visibility = 'visible';
//     }, 1000);
//   }
// }
