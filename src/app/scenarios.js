import upSound from '../assets/sounds/up.mp3';
import leftSound from '../assets/sounds/left.mp3';
import rightSound from '../assets/sounds/right.mp3';
import downSound from '../assets/sounds/down.mp3';

import clickSound from '../assets/sounds/click.mp3';
import correctSound from '../assets/sounds/correct_answer.mp3';
import correctSound2 from '../assets/sounds/correct2.mp3';
import endGameSound from '../assets/sounds/endgame.mp3';

import try_again from '../assets/sounds/try_again.mp3';
import tryNextTime from '../assets/sounds/try_next_time.mp3';
import wrongChoiceSound from '../assets/sounds/wrong_choice.mp3';

let leftAudio = new Audio(leftSound);
let rightAudio = new Audio(rightSound);
let downAudio = new Audio(downSound);
let upAudio = new Audio(upSound);
let click = new Audio(clickSound);

export let correctAudio1 = new Audio(correctSound);
export let correctAudio2 = new Audio(correctSound2);
export let endGameAudio = new Audio(endGameSound);
export let wrongChoiceAudio = new Audio(wrongChoiceSound);
export let tryAgainAudio = new Audio(try_again);
export let tryNextTimeAudio = new Audio(tryNextTime);

export function playTaskAudio(scene, task) {
    scene.input.enabled = false;

    switch (task) {
        case 1:
            playTask1(scene);
            break;
        case 2:
            playTask2(scene);
            break;
        case 3:
            playTask3(scene);
            break;
        case 4:
            playTask4(scene);
            break;
        case 5:
            playTask5(scene);
            break;
        default:
            console.log(`playTaskAudio() plays the audio`);
    }
};

function playTask1(scene) {
    upAudio.play();
    upAudio.onended = () => {
        leftAudio.play();
        leftAudio.onended = () => {
            click.play();
            scene.input.enabled = true;
        };
    };
    // upAudio.play().then(setTimeout(() => { leftAudio.play() }, 1000))
    //     .then(setTimeout(() => { click.play() }, 2000));
    // this.scene.setInteractive();
};

function playTask2(scene) {
    rightAudio.play();
    rightAudio.onended = () => {
        rightAudio.play();
        rightAudio.onended = () => {
            upAudio.play();
            upAudio.onended = () => {
                click.play();
                scene.input.enabled = true;
            }
        }
    }
    // rightAudio.play().then(setTimeout(() => { rightAudio.play() }, 1800))
    //     .then(setTimeout(() => { upAudio.play() }, 2500))
    //     .then(setTimeout(() => { click.play() }, 3500))
};

function playTask3(scene) {
    downAudio.play();
    downAudio.onended = () => {
        leftAudio.play();
        leftAudio.onended = () => {
            upAudio.play();
            upAudio.onended = () => {
                click.play();
                scene.input.enabled = true;
            }
        }
    }
    // downAudio.play().then(setTimeout(() => { leftAudio.play() }, 1500))
    //     .then(setTimeout(() => { upAudio.play() }, 2500))
    //     .then(setTimeout(() => { click.play() }, 4000))
};

function playTask4(scene) {
    downAudio.play();
    downAudio.onended = () => {
        rightAudio.play();
        rightAudio.onended = () => {
            downAudio.play();
            downAudio.onended = () => {
                click.play();
                scene.input.enabled = true;
            }
        }
    }
    // downAudio.play().then(setTimeout(() => { rightAudio.play() }, 1500))
    //     .then(setTimeout(() => { downAudio.play() }, 3000))
    //     .then(setTimeout(() => { click.play() }, 5000))
};

function playTask5(scene) {
    upAudio.play();
    upAudio.onended = () => {
        leftAudio.play();
        leftAudio.onended = () => {
            upAudio.play();
            upAudio.onended = () => {
                leftAudio.play();
                leftAudio.onended = () => {
                    click.play();
                    scene.input.enabled = true;
                }
            }
        }
    }
    // upAudio.play().then(setTimeout(() => { leftAudio.play() }, 1600))
    //     .then(setTimeout(() => { upAudio.play() }, 3000))
    //     .then(setTimeout(() => { leftAudio.play() }, 4800))
    //     .then(setTimeout(() => { click.play() }, 6000))
}; 