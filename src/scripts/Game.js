import { Cell, Painter } from './Painter'
/**
 * @property {Painter} painter
 *
 * @property speed Скорость генерации нового поколения
 * @property process Игровой цикл
 */
export class Game extends EventTarget {
  speed = 500
  process = null

  constructor() {
    super()
    this.painter = new Painter('#game')
    this.drawMap()
    this.painter.canvas.addEventListener('click', this.onPainterClick)
  }

  drawMap() {
    this.painter.createGrid(30, 15)
  }

  onPainterClick = event => {
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

  run = () => {
    this.dispatchEvent(new Event('run'))
    if (!this.process) {
      this.process = setInterval(this.generateGeneration, this.speed)
    } else {
      this.stop()
    }
  }

  stop() {
    this.dispatchEvent(new Event('stop'))
    clearInterval(this.process)
    this.process = null
  }

  clear = () => {
    this.stop()
    this.drawMap()
  }

  generateGeneration = () => {
    this.painter.cells = this.painter.cells.reduce((generation, cell) => {
      const generateCell = new Cell(cell.x, cell.y, this.painter)
      const paintNeighborsCount = cell.getPaintNeighbors().length

      if (!cell.isPaint && paintNeighborsCount === 3) {
        generateCell.paint()
      } else if (cell.isPaint && (paintNeighborsCount === 2 || paintNeighborsCount === 3)) {
        generateCell.paint()
      } else if (cell.isPaint && (paintNeighborsCount < 2 || paintNeighborsCount > 3)) {
        generateCell.unpaint()
      }

      generation.push(generateCell)
      return generation
    }, [])
    this.painter.redraw()

    const isEmpty = this.painter.cells.every(cell => !cell.isPaint)
    if (isEmpty) {
      const event = new Event('end')
      event.message = 'На поле не осталось ни одной живой клетки'
      this.dispatchEvent(event)
      this.stop()
    }
  }
}