import { playTaskAudio } from "./scenarios";
import { playMainTaskAudio } from "./soundfile";
import { createGameDiv, initializeGame } from "./game";
import { pacmanGameRun } from "./game";
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
        callbacks: {
            postBoot: function (game) {
                game.canvas.style.width = `70%`;
                game.canvas.style.height = `70%`;
            }
        },
    };

    const game = new Phaser.Game(config);
    game.scene.start('LoadingScene');
}