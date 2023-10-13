import { Scene } from 'phaser';
import { playMainTaskAudio } from "./soundfile";
import css from "../styles/index.css";
export class LoadingScene extends Scene {
    constructor() {
        super({ key: 'LoadingScene' });
    }

    preload() {
        console.log('LoadingScene created');
        this.cameras.main.setBackgroundColor('#2AC98C');
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x264653, 0.4);
        progressBox.fillRect(1920 / 3, 300, 670, 50);

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Загрузка...',
            style: {
                fontFamily: 'RecoletaRegular',
                fontSize: '40px',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        const percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                fontFamily: 'RecoletaRegular',
                fontSize: '40px',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        this.load.on('progress', (value) => {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xE9C46A, 1);
            progressBar.fillRect(1920 / 3, 310, 670 * value, 30);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });

        const textStyle = {
            fontFamily: 'RecoletaRegular',
            fontSize: '40px',
            fill: 'white',
        };

        const instructionText = this.add.text(width / 2.8, height / 1.5, 'Приготовься слушать инструкции', textStyle);

        this.load.image('bg', './assets/imgs/screen_load.png');
        this.load.svg('startButton', './assets/SVG/icon_start.svg', { width: 200, height: 200 });
        this.load.svg('soundButton', './assets/SVG/sound_btn.svg', { width: 150, height: 150 });
        for (let i = 0; i < 10; i++) {
            this.load.image('bg' + i, './assets/imgs/screen_load.png');
        }
    }

    async create() {

        this.add.image(1920 / 2, 1080 / 2, 'bg');
        const blackOverlay = this.add.graphics();
        blackOverlay.fillStyle(0x000000, 0.5);
        blackOverlay.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);

        const startButton = this.add.sprite(
            this.game.config.width / 2,
            this.game.config.height / 2,
            'startButton'
        );

        startButton.on('pointerover', () => {
            startButton.setTexture('soundButton');
        });

        startButton.on('pointerout', () => {
            startButton.setTexture('startButton');
        });

        startButton.setInteractive();

        startButton.on('pointerdown', () => {

            let isPlaying = false;
            playMainTaskAudio(this);
            
            if (!isPlaying) {
                startButton.disableInteractive();
                setTimeout(() => {
                    startButton.setInteractive();
                    this.scene.start('Game3');
                }, 12000); 
            }
        });
    }
}
