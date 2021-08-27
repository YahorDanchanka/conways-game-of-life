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
        this.cells.push(new Cell(x, y))
        this.context.strokeRect(x, y, width, height)
      }
    }
  }

  clearGrid() {
    this.cells = []
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

/**
 * @property {number} x
 * @property {number} y
 */
export class Cell {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}
