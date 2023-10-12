import { init } from "./app/phaser";

let createGameDiv = () => {
    let gameArea = document.getElementById("game");
    localStorage.setItem('level', `1`);
    init(gameArea);
}

setTimeout(() => {
    createGameDiv();
}, 1000)