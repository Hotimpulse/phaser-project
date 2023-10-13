import { Scene } from 'phaser';
import { playTaskAudio, correctAudio1, correctAudio2, endGameAudio, wrongChoiceAudio, tryAgainAudio, tryNextTimeAudio } from "./scenarios";
import { playMainTaskAudio } from './soundfile';

export class Game3 extends Scene {
  constructor() {
    super({ key: 'Game3' });
  }

  preload() {
    this.load.svg('startButton', './assets/SVG/close.svg');
    this.load.svg('full-screen-button', './assets/SVG/full_screen_icon.svg');
    this.load.image('layer1', './assets/imgs/bg_layer1.png');
    this.load.image('layer2', './assets/imgs/bg_layer2.png');
    this.load.image('final_screen', './assets/imgs/final_screen_graphics.png');
    this.load.svg('border', './assets/SVG/border.svg');

    this.load.svg('sound_icon', './assets/SVG/sound_icon.svg');
    this.load.svg('close_icon', './assets/SVG/close.svg');
    this.load.svg('profile_icon', './assets/SVG/profile_icon.svg');

    this.load.svg('rect_name', './assets/SVG/rect_name.svg');
    this.load.svg('rect_points', './assets/SVG/rect_points.svg');
    this.load.svg('rect_small', './assets/SVG/rect_small.svg');
    this.load.image('main-rect', './assets/imgs/rectangle-main.png');
    this.load.svg('card', './assets/SVG/tile.svg', { width: 240, height: 240 });

    // this.load.spritesheet('pacman', './assets/SVG/pacman.svg', { frameWidth: 107, frameHeight: 112 });
    this.load.svg('star', './assets/SVG/star.svg', { width: 100, height: 100 });
    this.load.svg('starSpecial', './assets/SVG/star.svg', { width: 100, height: 100 });
    this.load.svg('heart', './assets/SVG/heart.svg', { width: 100, height: 100 });
    this.load.svg('red_ghost', './assets/SVG/red_ghost.svg');
    this.load.svg('yellow_ghost', './assets/SVG/yellow_ghost.svg');
    this.load.svg('blue_ghost', './assets/SVG/blue_ghost.svg');
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
        ).setOrigin(0, 0).setAlpha(0.9);

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
    // full screen btn
    const fullScreenBtn = this.add.sprite(1920 - 100, 1080 - 100, 'full-screen-button');
    fullScreenBtn.setScale(3);
    fullScreenBtn.setInteractive().on('pointerup', function () {

      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
      } else {
        this.scale.startFullscreen();
      }
    }, this);

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
      window.location.reload();
    });

    // stars and hearts
    function trackStarsAndHearts() {
      const sceneWidth = 1920;
      let heartsNum = Number(localStorage.getItem('remainingLives')) || 0;
      let starsNum = Number(localStorage.getItem('score')) || 0;

      const existingHearts = scene.children.getChildren().filter(child => child.texture && child.texture.key === 'heart');
      const existingStars = scene.children.getChildren().filter(child => child.texture && child.texture.key === 'starSpecial');

      existingHearts.forEach(heart => heart.destroy());
      existingStars.forEach(star => star.destroy());

      for (let i = 0; i < heartsNum; i++) {
        const heart = scene.add.sprite(650, 300 + i * 150, 'heart');
        heart.setScale(1);
      }
      for (let i = 0; i < starsNum; i++) {
        const star = scene.add.sprite(sceneWidth - 200, 300 + i * 150, 'starSpecial');
        star.setScale(1);
      }
    }
    trackStarsAndHearts();
    let interval = setInterval(trackStarsAndHearts, 100);

    //  The text
    profileName = `User`;
    this.add.text(250, 100, `${profileName}`, { fontFamily: 'RecoletaRegular', fontSize: '1.5rem', fill: 'black' });
    text1 = this.add.text(650, 60, `Поиск сокровищ`, { fontFamily: 'RecoletaRegular', fontSize: '3.375rem', fill: '#B7C4DD' });
    text2 = this.add.text(650, 135, `Помоги пакману в поиске звёздочек. Получи 5 звёзд и открой секретный сундук!`, { fontFamily: 'RecoletaRegular', fontSize: '1.5rem', fill: '#B7C4DD' });
    let hasWon;
    localStorage.setItem('remainingLives', 3);
    localStorage.setItem('score', 0);
    let remainingLives = Number(localStorage.getItem('remainingLives'));
    let score = Number(localStorage.getItem('score'));

    let liveText = this.add.text(120, 350, `Жизни: ${localStorage.getItem('remainingLives')}`, { fontFamily: 'RecoletaRegular', fontSize: '1.5rem', fill: '#black' });
    let scoreText = this.add.text(120, 390, `Очки: ${localStorage.getItem('score')}`, { fontFamily: 'RecoletaRegular', fontSize: '1.5rem', fill: '#black' });

    const startX = 820;
    const startY = 220;
    const cellWidth = 240;
    const cellHeight = 240;
    const cellRowCount = 3;
    const cellColCount = 3;
    const grid = this.createGrid(cellRowCount, cellColCount, startX, startY, cellWidth, cellHeight);
    this.add.sprite(1180, 580, 'border');

    // const pacman = this.add.sprite(1130, 775, 'pacman').setOrigin(0, 0);

    // creating an animated pacman character
    let pacmanGraphics, pacmanTween;

    function createPacmanTween(scene, x, y) {
      return scene.tweens.addCounter({
        from: 0,
        to: 30,
        duration: 300,
        yoyo: true,
        repeat: -1,
        onUpdate: function (tween) {
          const t = tween.getValue();

          pacmanGraphics.clear();
          pacmanGraphics.fillStyle(0xffff00, 1);
          pacmanGraphics.slice(x, y, 60, Phaser.Math.DegToRad(330 + t), Phaser.Math.DegToRad(30 - t), true);
          pacmanGraphics.fillPath();
        }
      });
    }

    function createPacmanGraphics(scene) {
      pacmanGraphics = scene.add.graphics();
      pacmanTween = createPacmanTween(scene, 1180, 830);
    }

    createPacmanGraphics(this);


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
        playTaskAudio(this, 1);
        playGame(1, 0);
      },
      2: () => {
        playTaskAudio(this, 2);
        playGame(0, 2);
      },
      3: () => {
        playTaskAudio(this, 3);
        playGame(0, 1);
      },
      4: () => {
        playTaskAudio(this, 4);
        playGame(2, 2);
      },
      5: () => {
        playTaskAudio(this, 5);
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
        rotation: Math.PI * 4,
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

    function showGhost(scene, cell, ghostColor) {
      wrongChoiceAudio.play();
      const ghost = scene.add.sprite(cell.x, cell.y, `${ghostColor}`).setOrigin(0, 0);
      scene.tweens.add({
        targets: ghost,
        scaleX: 10,
        scaleY: 10,
        alpha: 0,
        duration: 600,
        ease: 'Linear',
        onComplete: () => {
          ghost.setVisible(false);

          // Blinking pacman logic
          blinkPacman(pacmanGraphics);
        }
      });
    }

    function blinkPacman(pacmanGraphics) {

      let isHidden = false;
      const blinkInterval = setInterval(() => {
        if (isHidden) {
          pacmanGraphics.setAlpha(1);
        } else {
          pacmanGraphics.setAlpha(0);
        }
        isHidden = !isHidden;
      }, 100);

      setTimeout(() => {
        clearInterval(blinkInterval);
        pacmanGraphics.setAlpha(1);
      }, 1000);
    }

    function onCellClick(cell) {

      if (!cell.isClicked) {
        cell.isClicked = true;
        const row = cell.row;
        const col = cell.col;

        const currentLevel = Number(localStorage.getItem('level'));
        const correctData = levelData[currentLevel - 1];

        const centerX = startX + col * cellWidth + cellWidth / 2;
        const centerY = startY + row * cellHeight + cellHeight / 2;
        if (correctData && row === correctData.row && col === correctData.col) {
          // pacmanGraphics.setPosition(centerX, centerY);

          // pacmanGraphics.x = centerX;
          // pacmanGraphics.y = centerY;
          pacmanTween.stop(); // Stop the tween before changing the position
          pacmanTween = createPacmanTween(scene, centerX, centerY); // Recreate the tween
          pacmanTween.restart(); // Restart the tween
          console.log(pacmanTween);
          showStar(scene, cell);
          increaseLevel();
          score += 1;
          localStorage.setItem('score', score.toString());
          updateScoreText();
        } else {
          if (score >= 0) {
            score -= 1;
            localStorage.setItem('score', score.toString());
            updateScoreText();
          }
          remainingLives -= 1;
          localStorage.setItem('remainingLives', remainingLives.toString());
          updateLiveText();
          if (localStorage.getItem('remainingLives') === "2") {
            showGhost(scene, cell, 'blue_ghost');
          } else if (localStorage.getItem('remainingLives') === "1") {
            showGhost(scene, cell, 'yellow_ghost');
          } else if (localStorage.getItem('remainingLives') === "0") {
            showGhost(scene, cell, 'red_ghost');
          }
          if (remainingLives >= 0) {
            tryAgainAudio.play();
          }

          if (remainingLives < 0) {
            console.log(`Game over!`);
            localStorage.setItem('lesson3', 'failed');
            tryNextTimeAudio.play();
            addDialogWindow();
          }
        }
      }
    }

    function addDialogWindow() {

      grid.forEach(row => {
        row.forEach(cell => {
          cell.disableInteractive();
        });
      });

      clearInterval(interval); // clearing the hearts and stars, prevents them from appearing on top of the game

      if (localStorage.getItem('lesson3') === 'failed') {

        scene.add.image(1920 / 2, 1080 / 2, 'final_screen');
        scene.add.text(1920 / 3, 1080 / 2, `В следующий раз получится!`, { fontFamily: 'RecoletaRegular', fontSize: '3.375rem', fill: '#FFF' });
        let closeIcon = scene.add.sprite(1920 / 2, 700, 'close_icon');
        closeIcon.setScale(1.5);
        closeIcon.setInteractive();

        closeIcon.on('pointerdown', () => {
          localStorage.clear();
          window.location.reload();
        });

      } else {

        scene.add.image(1920 / 2, 1080 / 2, 'final_screen');
        scene.add.text(1920 / 3, 1080 / 2, `Ты сегодня молодец!
        У тебя ${localStorage.getItem('score')}`, { fontFamily: 'RecoletaRegular', fontSize: '3.375rem', fill: '#FFF' });
        let lilStar = scene.add.sprite(990, 632, 'star');
        lilStar.setScale(0.5);
        let closeIcon = scene.add.sprite(1920 - 100, 100, 'close_icon');
        closeIcon.setScale(1.5);
        closeIcon.setInteractive();

        closeIcon.on('pointerdown', () => {
          localStorage.clear();
          window.location.reload();
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