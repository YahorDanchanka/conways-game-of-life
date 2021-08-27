import { Cell, Painter } from './Painter'

const painter = new Painter(document.querySelector('#canvas'))

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

function addControl(selector, options) {
  const control = document.querySelector(selector)

  if (options.hasOwnProperty('init') && typeof options.init === 'function') {
    options.init(control)
  }

  if (options.hasOwnProperty('events') && typeof options.events === 'object') {
    for (const event in options.events) {
      if (options.events.hasOwnProperty(event)) {
        if (typeof event !== 'string' || !event.includes('on')) break
        let eventName = event.substr(2).toLowerCase()
        control.addEventListener(eventName, options.events[event])
      }
    }
  }
}

addControl('#cell-size', {
  init(control) {
    control.value = localStorage.getItem('cell-size') ?? 50
    painter.createGrid(+control.value)
  },
  events: {
    onInput(event) {
      const cellSize = parseInt(event.target.value)
      if (cellSize && cellSize >= 10) {
        localStorage.setItem('cell-size', cellSize.toString())
        painter.createGrid(cellSize)
      }
    },
  },
})

const startGameButton = document.querySelector('#start-game')
startGameButton.addEventListener('click', () => {
  setInterval(startGame, 500)
})

/** Game */
painter.onClick(cell => {
  cell.paint()
})
