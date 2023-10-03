import { Scene } from 'phaser';
import upSound from '../assets/sounds/up.mp3';
import leftSound from '../assets/sounds/left.mp3';
import rightSound from '../assets/sounds/right.mp3';
import downSound from '../assets/sounds/down.mp3';
import { playTaskAudio, correctAudio1, correctAudio2, endGameAudio, wrongChoiceAudio, tryAgainAudio, tryNextTimeAudio } from "./scenarios";
import tryNextTime from '../assets/sounds/try_next_time.mp3';
import { playMainTaskAudio } from './soundfile';

export class Game3 extends Scene {
  constructor() {
    super({ key: 'Game3' });
  }

  preload() {
    this.load.svg('startButton', './assets/SVG/close.svg');
    this.load.image('layer1', './assets/imgs/bg_layer1.png');
    this.load.image('layer2', './assets/imgs/bg_layer2.png');

    this.load.svg('sound_icon', './assets/SVG/sound_icon.svg');
    this.load.svg('close_icon', './assets/SVG/close.svg');
    this.load.svg('profile_icon', './assets/SVG/profile_icon.svg');

    this.load.svg('rect_name', './assets/SVG/rect_name.svg');
    this.load.svg('rect_points', './assets/SVG/rect_points.svg');
    this.load.svg('rect_small', './assets/SVG/rect_small.svg');
    this.load.image('main-rect', './assets/imgs/rectangle-main.png');

    this.load.svg('card', './assets/SVG/tabler_square-filled.svg', { width: 264, height: 264 });
    this.load.spritesheet('pacman_left', './assets/imgs/pacman_left.png', { frameWidth: 107, frameHeight: 112 });
    this.load.svg('star', './assets/SVG/star.svg', { width: 100, height: 100 });
    this.load.image('red_ghost', './assets/imgs/red_ghost.png');
    this.load.image('yellow_ghost', './assets/imgs/yellow_ghost.png');
    this.load.image('blue_ghost', './assets/imgs/blue_ghost.png');
  }

  createGrid(rows, cols, startX, startY, cellWidth, cellHeight) {
    const grid = [];
    for (let row = 0; row < rows; row++) {
      grid[row] = [];
      for (let col = 0; col < cols; col++) {
        const cell = this.add.image(
          startX + col * cellWidth,
          startY + row * cellHeight,
          'card'
        ).setOrigin(0, 0);

        cell.row = row;
        cell.col = col;

        grid[row][col] = cell;
      }
    }
    return grid;
  }

  create() {
    const scene = this;
    let isAudioPlaying = false;
    let text1, text2, profileName;
    let gameOver = false;
    this.add.image(1920 / 2, 1080 / 2, 'layer1');
    this.add.image(1920 / 2, 1080 / 2, 'layer2');
    this.add.image(240, 140, 'rect_name');
    this.add.image(240, 380, 'rect_points');
    this.add.image(240, 570, 'rect_small');
    this.add.image(240, 700, 'rect_small');
    this.add.image(150, 140, 'profile_icon');
    this.add.sprite(1180, 540, 'main-rect');
    // sound button behavior
    const soundIcon = this.add.sprite(660, 145, 'sound_icon');
    soundIcon.setInteractive();
    soundIcon.on('pointerdown', async () => {
      playMainTaskAudio();
    });
    // x button behavior
    const closeIcon = this.add.sprite(1820, 105, 'close_icon');
    closeIcon.setInteractive();
    closeIcon.on("pointerdown", () => {
      window.close();
    });

    //  The text
    profileName = `User`;
    this.add.text(250, 100, `${profileName}`, { fontFamily: 'RecoletaRegular', fontSize: '1.5rem', fill: 'black' });
    text1 = this.add.text(650, 60, `Помоги пакману попасть на нужную клетку`, { fontFamily: 'RecoletaRegular', fontSize: '3.375rem', fill: '#B7C4DD' });
    text2 = this.add.text(650, 135, `Следуй голосовым инструкциям`, { fontFamily: 'RecoletaRegular', fontSize: '1.5rem', fill: '#B7C4DD' });
    let hasWon;
    localStorage.setItem('remainingLives', 3);
    localStorage.setItem('score', 0);
    let remainingLives = Number(localStorage.getItem('remainingLives'));
    let score = Number(localStorage.getItem('score'));

    let liveText = this.add.text(120, 350, `Жизни: ${localStorage.getItem('remainingLives')}`, { fontFamily: 'RecoletaRegular', fontSize: '1.5rem', fill: '#black' });
    let scoreText = this.add.text(120, 390, `Очки: ${localStorage.getItem('score')}`, { fontFamily: 'RecoletaRegular', fontSize: '1.5rem', fill: '#black' });

    const startX = 800;
    const startY = 220;
    const cellWidth = 264;
    const cellHeight = 264;
    const cellRowCount = 3;
    const cellColCount = 3;
    const grid = this.createGrid(cellRowCount, cellColCount, startX, startY, cellWidth, cellHeight);

    const pacman = this.add.sprite(1150, 820, 'pacman_left').setOrigin(0, 0);

    const levelData = [
      { row: 1, col: 0 },
      { row: 0, col: 2 },
      { row: 0, col: 1 },
      { row: 2, col: 2 },
      { row: 0, col: 0 }
    ];

    function updateLiveText() {
      let livesNumber = Number(localStorage.getItem('remainingLives'));
      liveText.setText(`Жизни: ${livesNumber}`);
    }

    function updateScoreText() {
      let scoreNumber = Number(localStorage.getItem('score'));
      scoreText.setText(`Очки: ${scoreNumber}`);
    }

    function increaseLevel() {
      let level = Number(localStorage.getItem('level'));
      setTimeout(() => {
        localStorage.setItem('level', String(level + 1));
        let newLevel = Number(localStorage.getItem('level'));

        initializeGame(newLevel);
        hasWon = false;
      }, 1000);
    }

    const loadLevel = {
      1: () => {
        playTaskAudio(1);
        playGame(1, 0);
      },
      2: () => {
        playTaskAudio(2);
        playGame(0, 2);
      },
      3: () => {
        playTaskAudio(3);
        playGame(0, 1);
      },
      4: () => {
        playTaskAudio(4);
        playGame(2, 2);
      },
      5: () => {
        playTaskAudio(5);
        playGame(0, 0);
      },
      6: () => {
        addDialogWindow();
      },
      default: () => {
        console.log(`Check the init func`);
      },
    };

    function initializeGame() {
      try {
        let currentLevel = Number(localStorage.getItem('level'));
        (loadLevel[currentLevel] || loadLevel.default)();
      } catch (err) {
        console.log(`Your error is:`, err);
      }
    }
    initializeGame();

    function showStar(scene, cell) {
      correctAudio1.play();
      const star = scene.add.sprite(cell.x, cell.y, 'star').setOrigin(0, 0);
      star.setScale(0);
      star.setAlpha(1);

      scene.tweens.add({
        targets: star,
        scale: 1,
        duration: 500,
        ease: 'In',
        onComplete: () => {
          scene.tweens.add({
            targets: star,
            y: cell.y - cellHeight,
            duration: 200,
            ease: 'Out',
            onComplete: () => {
              scene.tweens.add({
                targets: star,
                alpha: 0,
                duration: 100,
                ease: 'Out',
                onComplete: () => {
                  star.destroy();
                },
              });
            },
          });
        },
      });
    }

    function showGhost(scene, cell) {
      wrongChoiceAudio.play();
      const redGhost = scene.add.sprite(cell.x, cell.y, 'red_ghost').setOrigin(0, 0);
      scene.tweens.add({
        targets: redGhost,
        scaleX: 10,
        scaleY: 10,
        alpha: 0,
        duration: 600,
        ease: 'Linear',
        onComplete: () => {
          redGhost.setVisible(false);

          // Blinking pacman logic
          blinkPacman(pacman);
        }
      });
    }

    function blinkPacman(pacman) {
      let isHidden = false;
      const blinkInterval = setInterval(() => {
        if (isHidden) {
          pacman.setVisible(true);
        } else {
          pacman.setVisible(false);
        }
        isHidden = !isHidden;
      }, 100);

      setTimeout(() => {
        clearInterval(blinkInterval);
        pacman.setVisible(true);
      }, 1000);
    }

    function onCellClick(cell) {

      if (!cell.isClicked) {
        cell.isClicked = true;
        const row = cell.row;
        const col = cell.col;

        const currentLevel = Number(localStorage.getItem('level'));
        const correctData = levelData[currentLevel - 1];

        if (correctData && row === correctData.row && col === correctData.col) {
          showStar(scene, cell);
          increaseLevel();
          score += 2;
          localStorage.setItem('score', score.toString());
          updateScoreText();
        } else {
          score -= 1;
          localStorage.setItem('score', score.toString());
          updateScoreText();
          remainingLives -= 1;
          localStorage.setItem('remainingLives', remainingLives.toString());
          updateLiveText();
          showGhost(scene, cell);
          tryAgainAudio.play();

          if (remainingLives < 0) {
            console.log(`Game over!`);
            localStorage.setItem('lesson3', 'failed');
            setTimeout(() => {
              tryNextTimeAudio.play();
            }, 1500);
            addDialogWindow();
          }
        }

        const centerX = startX + col * cellWidth + cellWidth / 3.5;
        const centerY = startY + row * cellHeight + cellHeight / 3.5;
        pacman.setPosition(centerX, centerY);

      }
    }

    function addDialogWindow() {
      grid.forEach(row => {
        row.forEach(cell => {
          cell.disableInteractive();
        });
      });

      let dialogWindow = document.createElement('dialog');
      dialogWindow.setAttribute('id', 'dialog-loss');
      document.body.appendChild(dialogWindow);
      let closeDialogBtn = document.createElement('button');
      closeDialogBtn.innerText = `Закрыть`;

      if (localStorage.getItem('lesson3') === 'failed') {
        dialogWindow.showModal();
        dialogWindow.style.visibility = 'visible';
        dialogWindow.textContent = `В следующий раз получится!`;
        dialogWindow.appendChild(closeDialogBtn);

        closeDialogBtn.addEventListener('click', () => {
          dialogWindow.close();
          document.body.removeChild(dialogWindow);
          window.location.reload();
          localStorage.clear();
        });
      } else {
        dialogWindow.showModal();
        dialogWindow.style.visibility = 'visible';
        dialogWindow.textContent = `Здорово! Так держать!`;
        dialogWindow.appendChild(closeDialogBtn);

        closeDialogBtn.addEventListener('click', () => {
          dialogWindow.close();
          document.body.removeChild(dialogWindow);
          window.location.reload();
          localStorage.clear();
        });
      }
    }

    grid.forEach(row => {
      row.forEach(cell => {
        cell.setInteractive();
        cell.on('pointerdown', () => {
          onCellClick(cell);
        });
      });
    });

    function attachClickEventsToCells(grid, targetCellIndex) {
      grid.forEach(rowArray => {
        rowArray.forEach(cell => {
          cell.isClicked = false;
          cell.setInteractive();
          cell.on('pointerdown', () => {
            onCellClick(cell);
          });
        });
      });
    }

    function playGame(row, col) {
      let targetCellIndex = row * 3 + col;

      // Resetting the click flags when starting a new level
      grid.forEach(rowArray => {
        rowArray.forEach(cell => {
          cell.isClicked = false;
        });
      });

      attachClickEventsToCells(grid, targetCellIndex, row, col);
    }
  }
}