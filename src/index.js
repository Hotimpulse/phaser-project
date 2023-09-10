import { playSound } from './app/soundfile';
import { init } from "./app/phaser";
import css from './styles/index.css';
import { pacmanGameRun } from './app/game';

// let startBtn = document.getElementById('btn2');

// startBtn.addEventListener('click', async () => {
//     createGameDiv();
// })


let createGameDiv = () => {
    let gameArea = document.getElementById("game");
    localStorage.setItem('level', `1`);
    init(gameArea);
}

setTimeout(() => {
    createGameDiv();
}, 1000)