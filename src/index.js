import { playSound } from './app/soundfile';
import { createGameDiv } from "./app/game.js";
import css from './styles/index.css';

let startBtn = document.getElementById('btn2');

startBtn.addEventListener('click', async () => {
    createGameDiv();
})