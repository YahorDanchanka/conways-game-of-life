import { Painter } from './Painter'
const painter = new Painter(document.querySelector('#canvas'))
painter.createGrid()

function startGame() {}

/** Sidebar settings */
const cellSizeInput = document.querySelector('#cell-size')
cellSizeInput.addEventListener('input', () => {
  const size = parseInt(cellSizeInput.value)
  if (size) {
    painter.createGrid(size)
  }
})

const startGameButton = document.querySelector('#start-game')
startGameButton.addEventListener('click', () => {
  setInterval(startGame, 500)
})

/** Game */
painter.onClick(cell => {
  cell.paint()
})
