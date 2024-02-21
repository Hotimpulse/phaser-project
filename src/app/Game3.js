import { Scene } from 'phaser';
import { correctAudio1, wrongChoiceAudio, tryNextTimeAudio, upAudio, downAudio, leftAudio, rightAudio, click, go } from "./scenarios";
import { playMainTaskAudio } from './soundfile';
import css from "../styles/index.css";

export class Game3 extends Scene {
  constructor() {
    super({ key: 'Game3' });
  }

  preload() {
    this.load.svg('startButton', './assets/SVG/close.svg');
    this.load.svg('greyMedal', './assets/SVG/grey_medal.svg');
    this.load.svg('full-screen-button', './assets/SVG/full_screen_icon.svg');
    this.load.image('layer1', './assets/imgs/bg_layer1.png');
    this.load.image('layer2', './assets/imgs/bg_layer2.png');
    this.load.image('final_screen', './assets/imgs/final_screen_graphics.png');
    this.load.image('great_job', './assets/imgs/great_job.png');
    this.load.svg('border', './assets/SVG/border.svg');

    this.load.svg('sound_icon', './assets/SVG/sound_icon.svg');
    this.load.svg('close_icon', './assets/SVG/close.svg');
    this.load.svg('profile_icon', './assets/SVG/profile_icon.svg');

    this.load.svg('rect_name', './assets/SVG/rect_name.svg');
    this.load.svg('rect_points', './assets/SVG/rect_points.svg');
    this.load.svg('rect_small', './assets/SVG/rect_small.svg');
    this.load.image('main-rect', './assets/imgs/rectangle-main.png');
    this.load.svg('card', './assets/SVG/tile.svg', { width: 240, height: 240 });

    this.load.svg('greyedStar', './assets/SVG/greyed_star.svg', { width: 100, height: 100 });
    this.load.svg('star', './assets/SVG/star2.svg', { width: 100, height: 100 });
    this.load.svg('starSpecial', './assets/SVG/star2.svg', { width: 100, height: 100 });
    this.load.svg('heart', './assets/SVG/heart.svg', { width: 100, height: 100 });
    this.load.svg('greyedHeart', './assets/SVG/greyed_heart.svg', { width: 100, height: 100 });
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
    playMainTaskAudio(this);
    const scene = this;
    //global variables
    let fontInPixels = '24px';
    let mainBlue = '3C90DE';
    let sceneWidth = 1920;
    let sceneHeight = 1080;
    let timedEvent;
    let initialTime;
    let progressBar, greyMedal;
    let text1, text2, profileName;
    let gameOver = false;
    this.add.image(sceneWidth / 2, sceneHeight / 2, 'layer1');
    this.add.image(sceneWidth / 2, sceneHeight / 2, 'layer2');
    this.add.image(240, 140, 'rect_name');
    this.add.image(240, 380, 'rect_points');
    this.add.image(240, 570, 'rect_small');
    this.add.image(240, 700, 'rect_small');
    this.add.image(150, 140, 'profile_icon');
    this.add.sprite(1180, 540, 'main-rect');
    let timerText = scene.add.text(110, 430, 'До конца уровня: 3:00', { fontFamily: 'Inter', fontSize: fontInPixels, fill: `#${mainBlue}` });

    // timer-countdown

    function startTimer() {
      initialTime = 180;

      timerText.setText('До конца уровня: ' + formatTime(initialTime));

      timedEvent = scene.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });

      if (initialTime === 0) {
        resetTimer();
      }
    }

    function formatTime(seconds) {
      var minutes = Math.floor(seconds / 60);
      var partInSeconds = seconds % 60;
      partInSeconds = partInSeconds.toString().padStart(2, '0');
      return `${minutes}:${partInSeconds}`;
    }

    function onEvent() {
      if (initialTime > 0) {
        initialTime -= 1;
        timerText.setText('До конца уровня: ' + formatTime(initialTime));

        if (initialTime === 0) {
          timerText.setText('До конца уровня: 00:00');
          addDialogWindow();
        }
      }
    }

    function resetTimer() {
      console.log('resetting the timer');
      timedEvent.remove(false);
      timerText.destroy();
      timerText = scene.add.text(110, 430, 'До конца уровня: 3:00', { fontFamily: 'Inter', fontSize: fontInPixels, fill: `#${mainBlue}` });
      startTimer();
    }

    // progressbar and medals
    for (let i = 0; i < 6; i++) {
      greyMedal = scene.add.sprite(90 + i * 60, 580, 'greyMedal');
    }

    function createProgressBar() {
      progressBar = scene.add.graphics();
      updateProgressBar(0);
    }

    function updateProgressBar(value) {
      progressBar.clear();
      progressBar.fillStyle(0xB6C5DF, 0.8);
      progressBar.fillRect(70, 685, 340, 30);

      progressBar.fillStyle(`0x${mainBlue}`, 1);
      progressBar.fillRect(70, 685, (340) * value, 30);
    }

    createProgressBar(this);

    // full screen btn
    const fullScreenBtn = this.add.sprite(sceneWidth - 100, sceneHeight - 100, 'full-screen-button');
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
      let heartsNum = Number(localStorage.getItem('remainingLives')) || 0;
      let starsNum = Number(localStorage.getItem('score')) || 0;

      const existingHearts = scene.children.getChildren().filter(child => child.texture && child.texture.key === 'heart');
      const existingStars = scene.children.getChildren().filter(child => child.texture && child.texture.key === 'starSpecial');

      existingHearts.forEach(heart => heart.destroy());
      existingStars.forEach(star => star.destroy());

      for (let i = 0; i < 5; i++) {
        const greyedStar = scene.add.sprite(sceneWidth - 1280, 270 + i * 150, 'greyedStar');
        // greyedStar.setScale(1);
      }
      for (let i = 0; i < 3; i++) {
        const greyedHeart = scene.add.sprite(sceneWidth - 220, 270 + i * 150, 'greyedHeart');
        // greyedHeart.setScale(1);
      }
      for (let i = 0; i < heartsNum; i++) {
        const heart = scene.add.sprite(sceneWidth - 220, 270 + i * 150, 'heart');
        // heart.setScale(1);
      }
      for (let i = 0; i < starsNum; i++) {
        const star = scene.add.sprite(sceneWidth - 1280, 270 + i * 150, 'starSpecial');
        // star.setScale(1);
      }
    }
    trackStarsAndHearts();
    let interval = setInterval(trackStarsAndHearts, 100);

    //  The text
    profileName = `Игрок`;
    scene.add.text(250, 100, `${profileName}`, { fontFamily: 'Inter', fontSize: fontInPixels, fill: `#${mainBlue}` });
    text1 = scene.add.text(650, 60, `Путешественник`, { fontFamily: 'Recoleta', fontSize: '3.375rem', fill: '#2DADA0' });
    text2 = scene.add.text(650, 135, `Помоги пакману собрать звёздочки. По команде мысленно перемещай его 
на 1 шаг по полю. Нажми на клетку, где он остановился. У тебя в запасе 3 попытки.`, { fontFamily: 'Inter', fontSize: fontInPixels, fill: '#2DADA0' });
    let hasWon;
    localStorage.setItem('remainingLives', 3);
    localStorage.setItem('score', 0);
    let remainingLives = Number(localStorage.getItem('remainingLives'));
    let score = Number(localStorage.getItem('score'));
    let liveText = scene.add.text(175, 330, `${localStorage.getItem('remainingLives')}`, { fontFamily: 'Inter', fontSize: fontInPixels, fill: `#${mainBlue}` });
    let scoreText = scene.add.text(175, 380, `${localStorage.getItem('score')}`, { fontFamily: 'Inter', fontSize: fontInPixels, fill: `#${mainBlue}` });
    updateText();

    let lilStar = scene.add.sprite(150, 393, 'star');
    lilStar.setScale(0.3);
    let lilHearts = scene.add.sprite(150, 345, 'greyedHeart');
    lilHearts.setScale(0.3);

    const startX = 820;
    const startY = 220;
    const cellWidth = 240;
    const cellHeight = 240;
    const cellRowCount = 3;
    const cellColCount = 3;
    const grid = scene.createGrid(cellRowCount, cellColCount, startX, startY, cellWidth, cellHeight);
    scene.add.sprite(1180, 580, 'border');

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
          pacmanGraphics.fillStyle(0xF4CD53, 0.9);
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

    function randomizeLevelData(max, previousPosition) {
      let newPosition;
      do {
        newPosition = {
          row: Math.floor(Math.random() * max),
          col: Math.floor(Math.random() * max)
        };
      } while (
        (previousPosition &&
          ((Math.abs(newPosition.row - previousPosition.row) < 1 &&
              Math.abs(newPosition.col - previousPosition.col) < 1) ||
          (Math.abs(newPosition.row - previousPosition.row) < 1) ||
          (Math.abs(newPosition.col - previousPosition.col) < 1))) ||
      (!previousPosition &&
          (newPosition.row === 2 && newPosition.col === 1)) // Ensure the initial position is not too close
  );
      return newPosition;
    }

    const levelData = [];

    for (let index = 0; index < 5; index++) {
      let previousPosition = index > 0 ? levelData[index - 1] : null;
      levelData.push(randomizeLevelData(3, previousPosition));
    }

    function updateText() {
      let livesNumber = Number(localStorage.getItem('remainingLives'));
      liveText.setText(`Жизни: ${livesNumber}`);
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
        setTimeout(() => {
          const { row, col } = levelData[0];
          playGame(row, col);
          startTimer();
        }, 12000)
      },
      2: () => {
        const { row, col } = levelData[1];
        playGame(row, col);
      },
      3: () => {
        const { row, col } = levelData[2];
        playGame(row, col);
      },
      4: () => {
        const { row, col } = levelData[3];
        playGame(row, col);
      },
      5: () => {
        const { row, col } = levelData[4];
        playGame(row, col);
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
        rotation: Math.PI * 4,
        scaleX: 6,
        scaleY: 6,
        alpha: 0,
        duration: 1600,
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
          updateProgressBar(currentLevel * 0.2); // 0.2 is the coefficient for the percentages in the progress bar, stems from having 5 levels (0.2 * 5 = 100% filled)
          pacmanTween.stop();
          pacmanTween = createPacmanTween(scene, centerX, centerY);
          pacmanTween.restart();

          showStar(scene, cell);
          increaseLevel();
          score += 1;
          localStorage.setItem('score', score.toString());
          localStorage.setItem('remainingLives', '3');
          updateText();
          resetTimer();

        } else {
          remainingLives -= 1;
          localStorage.setItem('remainingLives', remainingLives.toString());
          updateText();
          if (remainingLives >= 0) replayLastInstructions();
          if (localStorage.getItem('remainingLives') === "2") {
            showGhost(scene, cell, 'blue_ghost');
          } else if (localStorage.getItem('remainingLives') === "1") {
            showGhost(scene, cell, 'yellow_ghost');
          } else if (localStorage.getItem('remainingLives') === "0") {
            showGhost(scene, cell, 'red_ghost');
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

      clearInterval(interval);

      if (localStorage.getItem('lesson3') === 'failed') {

        scene.add.image(sceneWidth / 2, sceneHeight / 2, 'final_screen');
        scene.add.text(sceneWidth / 3.5, sceneHeight / 2.5, `В следующий раз получится!`, { fontFamily: 'Recoleta', fontSize: '5rem', fill: '#000000' });
        let closeIcon = scene.add.sprite(sceneWidth / 2, 700, 'close_icon');
        closeIcon.setScale(1.5);
        closeIcon.setRecolettaactive();

        closeIcon.on('pointerdown', () => {
          localStorage.clear();
          window.location.reload();
        });

      } else {

        scene.add.image(sceneWidth / 2, sceneHeight / 2, 'final_screen');
        scene.add.text(sceneWidth / 3.4, sceneHeight / 2.5, `Ты сегодня молодец!
        У тебя ${localStorage.getItem('score')} звёзд`, { fontFamily: 'Recoleta', fontSize: '5rem', fill: '#000000' });
        // let lilStar = scene.add.sprite(1020, 635, 'star');
        // lilStar.setScale(0.5);
        let closeIcon = scene.add.sprite(sceneWidth - 100, 100, 'close_icon');
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

    // logic related to automated sound instructions based on randomly generated levelData - console.log(levelData) to see the unique levels generated with each new game

    let currentPos = { row: 2, col: 1 };
    let lastInstructions = [];

    function playGame(row, col) {
      const initialPos = { ...currentPos };
      const targetPos = { row, col };

      lastInstructions = generateAudioInstructions(initialPos, targetPos);
      playAudioInstructions(lastInstructions);

      grid.forEach(rowArray => {
        rowArray.forEach(cell => {
          cell.isClicked = false;
        });
      });

      currentPos = { ...targetPos };

      let targetCellIndex = row * 3 + col;

      attachClickEventsToCells(grid, targetCellIndex, row, col);
    }

    function replayLastInstructions() {
      playAudioInstructions(lastInstructions);
    }

    function generateAudioInstructions(initialPos, targetPos) {
      let instructions = [];

      let rowDiff = targetPos.row - initialPos.row;
      let colDiff = targetPos.col - initialPos.col;

      instructions.push("go");

      if (rowDiff !== 0 || colDiff !== 0) {
        if (rowDiff !== 0) {
          for (let i = 0; i < Math.abs(rowDiff); i++) {
            if (rowDiff > 0) {
              instructions.push("down");
            } else if (rowDiff < 0) {
              instructions.push("up");
            }
          }
        }

        if (colDiff !== 0) {
          for (let i = 0; i < Math.abs(colDiff); i++) {
            if (colDiff > 0) {
              instructions.push("right");
            } else if (colDiff < 0) {
              instructions.push("left");
            }
          }
        }

        instructions.push("stop");
      }

      return instructions;
    }

    function playAudioInstructions(instructions) {
      scene.input.enabled = false;
      let index = 0;

      function playNextInstruction() {
        if (index < instructions.length) {
          const instruction = instructions[index];
          let audio;

          switch (instruction) {
            case "up":
              audio = upAudio;
              break;
            case "down":
              audio = downAudio;
              break;
            case "left":
              audio = leftAudio;
              break;
            case "right":
              audio = rightAudio;
              break;
            case "stop":
              audio = click;
              break;
            case "go":
              audio = go;
              break;
            default:
              break;
          }

          if (audio) {
            audio.play();
            audio.onended = () => {
              index++;
              playNextInstruction();
            };
          }
        } else {
          scene.input.enabled = true;
        }
      }

      playNextInstruction();
    }
  }
}