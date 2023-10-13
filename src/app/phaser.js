import { LoadingScene } from "./LoadingScene";
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
        scene: [LoadingScene, Game3],
        // callbacks: {
        //     postBoot: function (game) {
        //         game.canvas.style.width = `100%`;
        //         game.canvas.style.height = `100%`;
        //     }
        // },
        scale: {
            mode: Phaser.Scale.ScaleModes.FIT,
            autoCenter: Phaser.Scale.Center.CENTER_BOTH
        }
    };
    // console.log('Scenes registered:', config.scene);
    const game = new Phaser.Game(config);
    game.scene.start('LoadingScene');
}