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

  stop(reason = '') {
    const event = new Event('stop')
    event.reason = reason
    this.dispatchEvent(event)
    clearInterval(this.process)
    this.process = null
  }

  clear = () => {
    this.stop()
    this.drawMap()
  }

  generateGeneration = () => {
    const generation = this.painter.cells.reduce((generation, cell) => {
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

    const isLoop = generation.every((cell, i) => cell.isPaint === this.painter.cells[i].isPaint)
    if (isLoop) {
      this.stop('Ни одна из клеток не меняет своего состояния')
    }

    this.painter.cells = generation
    this.painter.redraw()

    const isEmpty = this.painter.cells.every(cell => !cell.isPaint)
    if (isEmpty) {
      this.stop('На поле не осталось ни одной живой клетки')
    }
  }
}
