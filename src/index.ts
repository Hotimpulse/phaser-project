import "./styles/index.css";
import { init } from "./app/phaser";

import { createGameDiv } from "./app/game";

const main = () => {
    let gameArea = createGameDiv();
    init(gameArea);
}

main()