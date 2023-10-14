import mainTaskSound from '../assets/sounds/game3_maintask.mp3';
import mainTaskSound2 from '../assets/sounds/game3_maintask1.mp3';
import mainTaskSound3 from '../assets/sounds/game3_maintask2.mp3';

export async function playMainTaskAudio(scene) {
    scene.input.enabled = false;
    task2Sound.play();
    task2Sound.onended = () => {
        task3Sound.play();
        task3Sound.onended = () => {
            task1Sound.play();
        }
    }
}

export let task1Sound = new Audio(mainTaskSound);
export let task2Sound = new Audio(mainTaskSound2);
export let task3Sound = new Audio(mainTaskSound3);