import upSound from '../assets/sounds/up.mp3';
import leftSound from '../assets/sounds/left.mp3';
import rightSound from '../assets/sounds/right.mp3';
import downSound from '../assets/sounds/down.mp3';

import clickSound from '../assets/sounds/click.mp3';
import correctSound from '../assets/sounds/correct_answer.mp3';
import correctSound2 from '../assets/sounds/correct2.mp3';
import endGameSound from '../assets/sounds/endgame.mp3';
import mainTaskSound from '../assets/sounds/game3_maintask.mp3';
import mainTaskSound2 from '../assets/sounds/game3_maintask1.mp3';
import mainTaskSound3 from '../assets/sounds/game3_maintask2.mp3';

import tryAgainSound from '../assets/sounds/try_again.mp3';
import tryNextTime from '../assets/sounds/try_next_time.mp3';
import wrongChoiceSound from '../assets/sounds/wrong_choice.mp3';

let leftAudio = new Audio(leftSound);
let rightAudio = new Audio(rightSound);
let downAudio = new Audio(downSound);
let upAudio = new Audio(upSound);
let click = new Audio(clickSound);

export function playTaskAudio(task) {
    switch (task) {
        case 1:
            playTask1();
            break;
        case 2:
            playTask2();
            break;
        case 3:
            playTask3();
            break;
        case 4:
            playTask4();
            break;
        case 5:
            playTask5();
            break;
        default:
            console.log(`playTaskAudio() plays the audio`);
    }
};

async function playTask1() {
    upAudio.play().then(setTimeout(() => { leftAudio.play() }, 1000))
        .then(setTimeout(() => { click.play() }, 2000));
};

async function playTask2() {
    rightAudio.play().then(setTimeout(() => { rightAudio.play() }, 1800))
        .then(setTimeout(() => { upAudio.play() }, 2500))
        .then(setTimeout(() => { click.play() }, 3500))
};

async function playTask3() {
    downAudio.play().then(setTimeout(() => { leftAudio.play() }, 1500))
        .then(setTimeout(() => { upAudio.play() }, 2500))
        .then(setTimeout(() => { click.play() }, 4000))
};

async function playTask4() {
    downAudio.play().then(setTimeout(() => { rightAudio.play() }, 2000))
        .then(setTimeout(() => { downAudio.play() }, 4000))
        .then(setTimeout(() => { click.play() }, 6000))
};

async function playTask5() {
    upAudio.play().then(setTimeout(() => { leftAudio.play() }, 2000))
        .then(setTimeout(() => { upAudio.play() }, 4000))
        .then(setTimeout(() => { leftAudio.play() }, 6000))
        .then(setTimeout(() => { click.play() }, 8000))
}; 