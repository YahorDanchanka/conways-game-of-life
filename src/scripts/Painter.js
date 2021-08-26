/**
 * @property {HTMLCanvasElement} canvas
 * @property {CanvasRenderingContext2D} context
 *
 * @property {Cell[]} cells
 */
export class Painter {
  cells = []

  constructor(canvas) {
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
  }

  createGrid(size = 50) {
    this.clearGrid()
    for (let x = 0; x < this.canvas.width; x += size) {
      for (let y = 0; y < this.canvas.height; y += size) {
        this.context.strokeRect(x, y, size, size)
        this.cells.push(new Cell(x, y, size, this))
      }
    }
  }

  clearGrid() {
    this.cells = []
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  /**
   * @param {function} callback
   */
  onClick(callback) {
    this.canvas.addEventListener('click', event => {
      this.cells.forEach(cell => {
        const [fromX, toX, fromY, toY] = [cell.x, cell.x + cell.size, cell.y, cell.y + cell.size]
        if (event.offsetX >= fromX && event.offsetX <= toX && event.offsetY >= fromY && event.offsetY <= toY) {
          callback(cell)
        }
      })
    })
  }
}

/**
 * @property {number} x
 * @property {number} y
 * @property {number} size
 * @property {Painter} painter
 */
export class Cell {
  constructor(x, y, size, painter) {
    this.x = x
    this.y = y
    this.size = size
    this.painter = painter
  }

  paint() {
    this.painter.context.fillRect(this.x, this.y, this.size, this.size)
  }

  getNeighbors() {
    return this.painter.cells.reduce((neighbors, cell) => {
      if (cell === this) {
        return neighbors
      }

      if (
        cell.x - this.x <= this.size &&
        cell.x - this.x >= -this.size &&
        cell.y - this.y <= this.size &&
        cell.y - this.y >= -this.size
      ) {
        neighbors.push(cell)
      }

      return neighbors
    }, [])
  }
}
