import upSound from '../assets/sounds/up.mp3';
import leftSound from '../assets/sounds/left.mp3';
import rightSound from '../assets/sounds/right.mp3';
import downSound from '../assets/sounds/down.mp3';
import goSound from '../assets/sounds/go.mp3';

import clickSound from '../assets/sounds/stop.mp3';
import correctSound from '../assets/sounds/correct_answer.mp3';
import correctSound2 from '../assets/sounds/correct2.mp3';
import endGameSound from '../assets/sounds/endgame.mp3';

import try_again from '../assets/sounds/try_again.mp3';
import tryNextTime from '../assets/sounds/try_next_time.mp3';
import wrongChoiceSound from '../assets/sounds/wrong_choice.mp3';

export let leftAudio = new Audio(leftSound);
export let rightAudio = new Audio(rightSound);
export let downAudio = new Audio(downSound);
export let upAudio = new Audio(upSound);
export let click = new Audio(clickSound);
export let go = new Audio(goSound);

export let correctAudio1 = new Audio(correctSound);
export let correctAudio2 = new Audio(correctSound2);
export let endGameAudio = new Audio(endGameSound);
export let wrongChoiceAudio = new Audio(wrongChoiceSound);
export let tryAgainAudio = new Audio(try_again);
export let tryNextTimeAudio = new Audio(tryNextTime);
