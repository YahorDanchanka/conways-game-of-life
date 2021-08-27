import { Painter, Cell } from './Painter'
const painter = new Painter(document.querySelector('#canvas'))
painter.createGrid()

function startGame() {
  const cells = []

  painter.cells.forEach(cell => {
    const nextCell = new Cell(cell.x, cell.y, cell.size, painter)
    const paintNeighbors = cell.getPaintNeighbors().length

    if (!cell.isPaint && paintNeighbors === 3) {
      nextCell.paint()
    } else if (cell.isPaint && (paintNeighbors === 2 || paintNeighbors === 3)) {
      nextCell.paint()
    } else if (cell.isPaint && (paintNeighbors < 2 || paintNeighbors > 3)) {
      nextCell.unpaint()
    }

    cells.push(nextCell)
  })

  painter.cells = cells
  painter.cells.forEach(cell => {
    if (cell.isPaint) {
      cell.paint()
    } else {
      cell.unpaint()
    }
  })
}

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
