import { Game } from './Game'
const game = new Game()

const startGameButton = document.querySelector('#start-game')
startGameButton.addEventListener('click', game.run)

const refreshGameButton = document.querySelector('#refresh-game-button')
refreshGameButton.addEventListener('click', game.clear)

const gameSpeedInput = document.querySelector('#game-speed')
gameSpeedInput.value = localStorage.getItem('game-speed') ?? 100
gameSpeedInput.setAttribute('disabled', 'disabled')
game.speed = gameSpeedInput.value
gameSpeedInput.addEventListener('input', () => {
  const speed = parseInt(gameSpeedInput.value)
  if (speed) {
    localStorage.setItem('game-speed', speed.toString())
    game.speed = speed
    game.stop()
    game.run()
  }
})

const horizontalCountInput = document.querySelector('#horizontal-count')
const verticalCountInput = document.querySelector('#vertical-count')
horizontalCountInput.value = localStorage.getItem('horizontal-count') ?? game.painter.options.grid.horizontal
verticalCountInput.value = localStorage.getItem('vertical-count') ?? game.painter.options.grid.vertical
redraw()

function redraw() {
  if (parseInt(horizontalCountInput.value) && parseInt(verticalCountInput.value)) {
    localStorage.setItem('horizontal-count', horizontalCountInput.value)
    localStorage.setItem('vertical-count', verticalCountInput.value)
    game.painter.options.grid.horizontal = +horizontalCountInput.value
    game.painter.options.grid.vertical = +verticalCountInput.value
    game.drawMap()
  }
}

horizontalCountInput.addEventListener('input', redraw)
verticalCountInput.addEventListener('input', redraw)

const randomCellGenerationButton = document.querySelector('#random-cell-generation')
randomCellGenerationButton.addEventListener('click', () => {
  game.painter.cells.forEach(cell => {
    if (Math.random() < 0.3) {
      cell.paint()
    }
  })
})

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
