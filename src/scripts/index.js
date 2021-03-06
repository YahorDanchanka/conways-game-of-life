import { Game } from './Game'
import LocalStorage from './LocalStorage'

const canvas = document.querySelector('#game')
const game = new Game(canvas)

document.addEventListener('keydown', event => {
  if (event.code === 'Space') {
    game.run()
  } else if (event.code === 'KeyR') {
    game.clear()
  } else if (event.code === 'KeyG') {
    randomCellGenerationButton.click()
  } else if (event.code === 'ArrowUp') {
    if (+gameSpeedInput.value) {
      gameSpeedInput.value = +gameSpeedInput.value + 100
      gameSpeedInput.dispatchEvent(new Event('input'))
    }
  } else if (event.code === 'ArrowDown') {
    if (+gameSpeedInput.value && +gameSpeedInput.value > 100) {
      gameSpeedInput.value = +gameSpeedInput.value - 100
      gameSpeedInput.dispatchEvent(new Event('input'))
    }
  }
})

const startGameButton = document.querySelector('#start-game')
startGameButton.addEventListener('click', game.run)

const refreshGameButton = document.querySelector('#refresh-game-button')
refreshGameButton.addEventListener('click', game.clear)
const gameSpeedInput = document.querySelector('#game-speed')
gameSpeedInput.value = LocalStorage.getItem('game-speed') ?? 100
gameSpeedInput.setAttribute('disabled', 'disabled')
game.speed = gameSpeedInput.value
gameSpeedInput.addEventListener('input', () => {
  const speed = parseInt(gameSpeedInput.value)
  if (speed) {
    LocalStorage.setItem('game-speed', speed.toString())
    game.speed = speed
    game.stop()
    game.run()
  }
})

const horizontalCountInput = document.querySelector('#horizontal-count')
const verticalCountInput = document.querySelector('#vertical-count')
horizontalCountInput.value = LocalStorage.getItem('horizontal-count') ?? game.painter.options.grid.horizontal
verticalCountInput.value = LocalStorage.getItem('vertical-count') ?? game.painter.options.grid.vertical
redraw()

function redraw() {
  if (parseInt(horizontalCountInput.value) && parseInt(verticalCountInput.value)) {
    LocalStorage.setItem('horizontal-count', horizontalCountInput.value)
    LocalStorage.setItem('vertical-count', verticalCountInput.value)
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

const fullscreenButton = document.querySelector('#fullscreen')
fullscreenButton.addEventListener('click', () => {
  game.painter.canvas.requestFullscreen()
})
game.painter.canvas.addEventListener('fullscreenchange', () => {
  if (document.fullscreenElement) {
    game.painter.canvas.width = window.screen.width
    game.painter.canvas.height = window.screen.height
    alert('?????????????????????? ?????????????? ?????????????? ?????? ????????????????????')
  } else {
    game.painter.canvas.width = 800
    game.painter.canvas.height = 400
  }
  game.drawMap()
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
