import {Scene} from 'phaser';


export class Game3 extends Scene {
    constructor () {
        super({ key: 'Game3' });
    }

    preload () {
        this.load.svg('card', './assets/SVG/tabler_square-filled.svg', { width: 264, height: 264 });
        this.load.spritesheet('pacman_left', './assets/imgs/pacman_left.png', { frameWidth: 107, frameHeight: 112 });
    }

    create () {

        //creating the cards 
        const cardArray = [];
        for (let i = 0; i < 9; i++) {
            cardArray.push(this.add.sprite(800, 800, 'card').setOrigin(0, 0));
        }
        let grid = Phaser.Actions.GridAlign(cardArray, {
            width: 3,
            height: 3,
            cellWidth: 250,
            cellHeight: 250,
            x: 800,
            y: 220
        });

        // card.setInteractive();
        
        // card.on('pointerdown', () => {
        //     alert(`hello`)
        // });

        // adding pacman
        const pacman = this.add.sprite(1130, 790, 'pacman_left').setOrigin(0, 0);;
        pacman.setInteractive({ draggable: true });

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {

            //  This will snap our drag to a 64x64 grid

            dragX = Phaser.Math.Snap.To(dragX, 32);
            dragY = Phaser.Math.Snap.To(dragY, 32);

            gameObject.setPosition(dragX, dragY);

        });
    }

    // update () {
    // }
}
