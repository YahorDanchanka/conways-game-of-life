/**
 * @property {HTMLCanvasElement} canvas
 * @property {CanvasRenderingContext2D} context
 *
 * @property {Cell[]} cells Клетки
 */
export class Painter {
  cells = []
  options = {}

  constructor(selector) {
    this.canvas = document.querySelector(selector)
    this.context = this.canvas.getContext('2d')
  }

  /**
   * @param {number} horizontal Число клеток по горизонтали
   * @param {number} vertical Число клеток по вертикали
   */
  createGrid(horizontal, vertical) {
    this.clearGrid()
    const [width, height] = [this.canvas.width / Math.round(horizontal), this.canvas.height / Math.round(vertical)]
    this.options = { cell: { width, height } }
    for (let i = 0; i < horizontal; i++) {
      for (let j = 0; j < vertical; j++) {
        const [x, y] = [width * i, height * j]
        this.cells.push(new Cell(x, y, this))
        this.context.strokeRect(x, y, width, height)
      }
    }
  }

  redraw() {
    this.cells.forEach(cell => {
      if (cell.isPaint) {
        cell.paint()
      } else {
        cell.unpaint()
      }
    })
  }

  clearGrid() {
    this.cells = []
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

/**
 * @property {number} x
 * @property {number} y
 * @property {Painter} painter
 *
 * @property {boolean} isPaint
 */
export class Cell {
  isPaint = false

  constructor(x, y, painter) {
    this.x = x
    this.y = y
    this.painter = painter
  }

  paint() {
    this.isPaint = true
    this.painter.context.fillRect(this.x, this.y, this.painter.options.cell.width, this.painter.options.cell.height)
  }

  unpaint() {
    this.isPaint = false
    this.painter.context.clearRect(this.x, this.y, this.painter.options.cell.width, this.painter.options.cell.height)
    this.painter.context.strokeRect(this.x, this.y, this.painter.options.cell.width, this.painter.options.cell.height)
  }

  getNeighbors() {
    return this.painter.cells.reduce((neighbors, cell) => {
      if (cell === this) {
        return neighbors
      }

      if (
        Math.round(cell.x - this.x) <= Math.round(this.painter.options.cell.width) &&
        Math.round(cell.x - this.x) >= -Math.round(this.painter.options.cell.width) &&
        Math.round(cell.y - this.y) <= Math.round(this.painter.options.cell.height) &&
        Math.round(cell.y - this.y) >= -Math.round(this.painter.options.cell.height)
      ) {
        neighbors.push(cell)
      }

      return neighbors
    }, [])
  }

  getPaintNeighbors() {
    return this.getNeighbors().reduce((paintNeighbors, neighbor) => {
      if (neighbor.isPaint) {
        paintNeighbors.push(neighbor)
      }
      return paintNeighbors
    }, [])
  }
}
