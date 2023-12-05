import mainTaskSound from '../assets/sounds/game3_maintask.mp3';
import mainTaskSound2 from '../assets/sounds/game3_maintask1.mp3';
import mainTaskSound3 from '../assets/sounds/game3_maintask2.mp3';
import gameTaskSound from '../assets/sounds/new_game_task.mp3';

export async function playMainTaskAudio(scene) {
    scene.input.enabled = false;
    gameTask.play();
}

export let task1Sound = new Audio(mainTaskSound);
export let task2Sound = new Audio(mainTaskSound2);
export let task3Sound = new Audio(mainTaskSound3);
export let gameTask = new Audio(gameTaskSound);