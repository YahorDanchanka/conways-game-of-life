import { Painter } from './Painter'

/**
 * @property {Painter} painter
 */
export class Game {
  constructor() {
    this.painter = new Painter('#game')
    this.painter.createGrid(30, 15)
    this.painter.canvas.addEventListener('click', this.onClick)
  }

  onClick = event => {
    const cell = this.painter.cells.reduce((findCell, cell) => {
      const [fromX, toX, fromY, toY] = [
        cell.x,
        cell.x + this.painter.options.cell.width,
        cell.y,
        cell.y + this.painter.options.cell.height,
      ]
      if (event.offsetX >= fromX && event.offsetX <= toX && event.offsetY >= fromY && event.offsetY <= toY) {
        findCell = cell
      }
      return findCell
    }, null)
    cell.paint()
  }
}
