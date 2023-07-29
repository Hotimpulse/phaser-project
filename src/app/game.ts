
export let createGameDiv = (): HTMLDivElement => {
    let mainWrapper = document.getElementById("main-wrapper") as HTMLDivElement;
    let gameArea = document.createElement("div") as HTMLDivElement;
    gameArea.setAttribute("id", "game");
    mainWrapper.appendChild(gameArea)
    return gameArea;
}