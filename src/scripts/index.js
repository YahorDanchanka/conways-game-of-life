import { Cell, Painter } from './Painter'

const painter = new Painter(document.querySelector('#canvas'))

function startGame() {
  window.generationCount = window.generationCount ?? 0
  window.generationCount++
  document.querySelector('.sidebar__item_generation-count').textContent = window.generationCount

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

  endGame()
}

function endGame() {
  const paintCells = painter.cells.reduce((paintCells, cell) => {
    if (cell.isPaint) {
      paintCells++
    }
    return paintCells
  }, 0)

  if (paintCells <= 0) {
    window.generationCount = 0
    clearInterval(window.gameVendor)
    alert('Игра окончена')
  }
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

addControl('#interval-generation', {
  init(control) {
    control.value = localStorage.getItem('interval-generation') ?? 500
  },
  events: {
    onInput(event) {
      const interval = parseInt(event.target.value)
      if (interval) {
        localStorage.setItem('interval-generation', interval.toString())
      }
    },
  },
})

addControl('#generation-cells', {
  events: {
    onClick() {
      painter.cells.forEach(cell => {
        cell.unpaint()
        if (Math.random() < 0.3) {
          cell.paint()
        }
      })
    },
  },
})

addControl('#stop-game', {
  events: {
    onClick() {
      if (window.gameVendor) {
        clearInterval(window.gameVendor)
      }
    },
  },
})

addControl('#clear-game', {
  events: {
    onClick() {
      const cellSize = localStorage.getItem('cell-size') ?? 50
      painter.createGrid(+cellSize)
    },
  },
})

const startGameButton = document.querySelector('#start-game')
startGameButton.addEventListener('click', () => {
  const paintCells = painter.cells.reduce((paintCells, cell) => {
    if (cell.isPaint) {
      paintCells++
    }
    return paintCells
  }, 0)
  if (paintCells <= 0) return
  const interval = localStorage.getItem('interval-generation') ?? 500
  window.gameVendor = setInterval(startGame, interval)
})

/** Game */
painter.onClick(cell => {
  cell.paint()
})
