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
        scale: {
            mode: Phaser.Scale.ScaleModes.FIT,
            autoCenter: Phaser.Scale.Center.CENTER_BOTH
        }
    };
    const game = new Phaser.Game(config);
    game.scene.start('LoadingScene');
}