import { Game } from './Game'
const game = new Game()

const startGameButton = document.querySelector('#start-game')
startGameButton.addEventListener('click', game.run)

const refreshGameButton = document.querySelector('#refresh-game-button')
refreshGameButton.addEventListener('click', game.clear)
