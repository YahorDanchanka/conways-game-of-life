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

const horizontalCountInput = document.querySelector('#horizontal-count')
const verticalCountInput = document.querySelector('#vertical-count')

function redraw() {
  if (parseInt(horizontalCountInput.value) && parseInt(verticalCountInput.value)) {
    game.painter.options.grid.horizontal = horizontalCountInput.value
    game.painter.options.grid.vertical = verticalCountInput.value
    game.drawMap()
  }
}

horizontalCountInput.value = game.painter.options.grid.horizontal
verticalCountInput.value = game.painter.options.grid.vertical
horizontalCountInput.addEventListener('input', redraw)
verticalCountInput.addEventListener('input', redraw)

game.addEventListener('run', () => {
  gameSpeedInput.removeAttribute('disabled')
  horizontalCountInput.setAttribute('disabled', 'disabled')
  verticalCountInput.setAttribute('disabled', 'disabled')
})

game.addEventListener('stop', event => {
  if (event.reason) {
    alert(event.reason)
  }
  gameSpeedInput.setAttribute('disabled', 'disabled')
  horizontalCountInput.removeAttribute('disabled')
  verticalCountInput.removeAttribute('disabled')
})
