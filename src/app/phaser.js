import { playTaskAudio } from "./scenarios";
import { playMainTaskAudio } from "./soundfile";
import { createGameDiv, initializeGame } from "./game";
import { pacmanGameRun } from "./game";
import { Game3 } from "./Game3";

export function init(targetDiv) {

    const config = {
        type: Phaser.AUTO,
        width: 1920,
        height: 1080,
        parent: targetDiv,
        audio: {
            disableWebAudio: true
        },
        dom: {
            createContainer: true
        },
        scene: {
            preload: preload,
            create: create,
            update: update,
            Game3: Game3
        },
        callbacks: {
            postBoot: function (game) {
                game.canvas.style.width = `70%`;
                game.canvas.style.height = `70%`;
            }
        },
    };

    const game = new Phaser.Game(config);
    game.scene.add('Game3', Game3);
    game.scene.start('Game3');
    
    let gameOver = false;
    let text1, text2, profileName, liveText, scoreText;
    
    function preload() {
        this.load.image('layer1', './assets/imgs/bg_layer1.png');
        this.load.image('layer2', './assets/imgs/bg_layer2.png');

        this.load.svg('sound_icon', './assets/SVG/sound_icon.svg');
        this.load.svg('close_icon', './assets/SVG/close.svg');
        this.load.svg('profile_icon', './assets/SVG/profile_icon.svg');

        this.load.svg('rect_name', './assets/SVG/rect_name.svg');
        this.load.svg('rect_points', './assets/SVG/rect_points.svg');
        this.load.svg('rect_small', './assets/SVG/rect_small.svg');

        this.load.image('main-rect', './assets/imgs/rectangle-main.png');

        this.load.image('ground', './assets/imgs/platform.png');
        

        // this.load.audio('wrongChoice', './assets/sounds/wrong_choice.mp3');
    }

    function create() {
        
        const gameDiv = document.querySelector('#game');

        // const wrongChoiceSound = this.sound.add('wrongChoice');
        this.add.image(1920 / 2, 1080 / 2, 'layer1');
        this.add.image(1920 / 2, 1080 / 2, 'layer2');
        this.add.image(240, 140, 'rect_name');
        this.add.image(240, 380, 'rect_points');
        this.add.image(240, 570, 'rect_small');
        this.add.image(240, 700, 'rect_small');
        this.add.image(150, 140, 'profile_icon');
        const mainRect = this.add.sprite(1180, 540, 'main-rect');

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
        this.add.text(250, 100, `${profileName}`, { fontFamily: 'Arial', fontSize: '1.5rem', fill: 'black' });
        text1 = this.add.text(650, 50, `Угадай слова нажимая`, { fontFamily: 'Arial', fontSize: '3.375rem', fill: '#B7C4DD' });
        text2 = this.add.text(650, 135, `Угадай слова нажимая на клеточки с нужными слогами. Инструкции: задание к игре`, { fontFamily: 'Arial', fontSize: '1.5rem', fill: '#B7C4DD' });
      
        
      }
      
      function update() {
        if (gameOver) {
          return;
        }
        
      }
    }