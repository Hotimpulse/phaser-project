import { Scene } from 'phaser';
import upSound from '../assets/sounds/up.mp3';
import leftSound from '../assets/sounds/left.mp3';
import rightSound from '../assets/sounds/right.mp3';
import downSound from '../assets/sounds/down.mp3';
import { playTaskAudio, correctAudio1, correctAudio2, endGameAudio, wrongChoiceAudio, tryAgainAudio, tryNextTimeAudio } from "./scenarios";
import tryNextTime from '../assets/sounds/try_next_time.mp3';

export class Game3 extends Scene {
  constructor() {
    super({ key: 'Game3' });
  }

  preload() {
    this.load.svg('card', './assets/SVG/tabler_square-filled.svg', { width: 264, height: 264 });
    this.load.spritesheet('pacman_left', './assets/imgs/pacman_left.png', { frameWidth: 107, frameHeight: 112 });
    this.load.svg('star', './assets/SVG/star.svg', { width: 100, height: 100 });
  }

  create() {
    let remainingLives = localStorage.setItem('remainingLives', '3');
    let score = localStorage.setItem('score', '0');
    let liveText;
    let scoreText;
    liveText = this.add.text(120, 350, `Жизни: ${localStorage.getItem('remainingLives')}`, { fontFamily: 'Arial', fontSize: '1.5rem', fill: '#black' });
    scoreText = this.add.text(120, 390, `Очки: ${localStorage.getItem('score')}`, { fontFamily: 'Arial', fontSize: '1.5rem', fill: '#black' });
    const startX = 800;
    const startY = 220;
    const cellWidth = 264;
    const cellHeight = 264;
    const cellRowCount = 3;
    const cellColCount = 3;
    const grid = this.createGrid(cellRowCount, cellColCount, startX, startY, cellWidth, cellHeight);

    const pacman = this.add.sprite(1150, 820, 'pacman_left').setOrigin(0, 0);
    const star = this.add.sprite(0, 0, 'star');
    star.setVisible(false);

    const levelData = [
      { row: 1, col: 0 },
      { row: 0, col: 2 },
      { row: 0, col: 1 },
      { row: 2, col: 2 },
      { row: 0, col: 0 }
    ];

    grid.forEach(row => {
      row.forEach(cell => {
        cell.setInteractive();
        cell.on('pointerdown', () => {
          const row = cell.row;
          const col = cell.col;

          const currentLevel = Number(localStorage.getItem('level'));

          const correctData = levelData[currentLevel - 1];

          if (correctData && row === correctData.row && col === correctData.col) {
            showStar(cell.x, cell.y);
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
          }

          const topLeftX = startX + col * cellWidth + cellWidth / 3.5;
          const topLeftY = startY + row * cellHeight + cellHeight / 3.5;

          pacman.setPosition(topLeftX, topLeftY);
        });
      });
    });


    function updateLiveText() {
      liveText.text = `Жизни: ${localStorage.getItem('remainingLives')}`;
    }

    function updateScoreText() {
      scoreText.text = `Очки: ${localStorage.getItem('score')}`;
    }
    function increaseLevel() {
      let level = Number(localStorage.getItem('level'));
      setTimeout(() => {
        localStorage.setItem('level', String(level + 1));
        let newLevel = Number(localStorage.getItem('level'));

        initializeGame(newLevel);
      }, 1000);
    }

    function initializeGame() {
      try {
        let currentLevel = Number(localStorage.getItem('level'));

        switch (currentLevel) {

          case 1:
            playTaskAudio(1);
            playGame(1, 0);

            break;

          case 2:
            playTaskAudio(2);
            playGame(0, 2);

            break;

          case 3:
            playTaskAudio(3);

            playGame(0, 1);

            break;

          case 4:
            playTaskAudio(4);
            playGame(2, 2);

            break;

          case 5:
            playTaskAudio(5);
            playGame(0, 0);
            break;

          default:
            console.log(`Check the initializeGame func`);
        }
      } catch (err) {
        console.log(`Your error is:`, err);
      }
    }
    function showStar(x, y) {
      // Place the star image at the specified position and play the animation
      star.setPosition(x, y);
      star.setScale(1); // Reset the scale
      star.setVisible(true);
      star.setAlpha(1); // Reset alpha
      // star.play('star-animation'); // Start the animation
    }

    // Creating the star animation
    this.anims.create({
      key: 'star-animation',
      frames: this.anims.generateFrameNumbers('star', { start: 0, end: 10 }),
      frameRate: 10,
      hideOnComplete: true,
    });
    // Implementing logic to check if the clicked cell is correct
    // function checkIfCorrect(row, col) {
    //   let targetCellIndex = row * 3 + col;
    //   let hasWon = false;

    // }
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


  update() {


  }
}
