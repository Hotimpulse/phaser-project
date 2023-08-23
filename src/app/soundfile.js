import upSound from '../assets/sounds/up.mp3';
import leftSound from '../assets/sounds/left.mp3';
import rightSound from '../assets/sounds/right.mp3';

import clickSound from '../assets/sounds/click.mp3';
import correctSound from '../assets/sounds/correct_answer.mp3';
import correctSound2 from '../assets/sounds/correct2.mp3';
import downSound from '../assets/sounds/down.mp3';
import endGameSound from '../assets/sounds/endgame.mp3';
import mainTaskSound from '../assets/sounds/game3_maintask.mp3';
import mainTaskSound2 from '../assets/sounds/game3_maintask1.mp3';
import mainTaskSound3 from '../assets/sounds/game3_maintask2.mp3';

import tryAgainSound from '../assets/sounds/try_again.mp3';
import tryNextTime from '../assets/sounds/try_next_time.mp3';
import wrongChoiceSound from '../assets/sounds/wrong_choice.mp3';


    let btn = document.getElementById('btn1');
    btn.addEventListener('click', () => {
        const playMainTaskAudio = async () => {
            task2Sound.play().then(setTimeout(() => {
                task3Sound.play();
            }, 3000)).then(setTimeout(() => {
                task1Sound.play();
            }, 8000))
        }
        let task1Sound = new Audio(mainTaskSound);
        let task2Sound = new Audio(mainTaskSound2);
        let task3Sound = new Audio(mainTaskSound3);
        playMainTaskAudio();
    })
    // document.addEventListener('DOMContentLoaded', () => {
    //     const playMainTaskAudio = async () => {
    //         task2Sound.play().then(setTimeout(() => {
    //             task3Sound.play();
    //         }, 3000)).then(setTimeout(() => {
    //             task1Sound.play();
    //         }, 8000))
    //     }
    //     let task1Sound = new Audio(mainTaskSound);
    //     let task2Sound = new Audio(mainTaskSound2);
    //     let task3Sound = new Audio(mainTaskSound3);
    //     playMainTaskAudio();
    // })