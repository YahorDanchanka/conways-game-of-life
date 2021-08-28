import { Game } from './Game'
const game = new Game()

const startGameButton = document.querySelector('#start-game')
startGameButton.addEventListener('click', game.run)

const refreshGameButton = document.querySelector('#refresh-game-button')
refreshGameButton.addEventListener('click', game.clear)

const gameSpeedInput = document.querySelector('#game-speed')
game.speed = gameSpeedInput.value
gameSpeedInput.addEventListener('input', () => {
  const speed = parseInt(gameSpeedInput.value)
  if (speed) {
    game.speed = speed
    game.stop()
    game.run()
  }
})

game.addEventListener('run', () => {
  gameSpeedInput.removeAttribute('disabled')
})

game.addEventListener('stop', () => {
  gameSpeedInput.setAttribute('disabled', 'disabled')
})

game.addEventListener('end', event => {
  if (event.message) {
    alert(event.message)
    return
  }
  alert('Игра закончена')
})
