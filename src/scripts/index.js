import { Painter } from './Painter'
const painter = new Painter(document.querySelector('#canvas'))
painter.createGrid()

/** Sidebar settings */
const cellSizeInput = document.querySelector('#cell-size')
cellSizeInput.addEventListener('input', () => {
  const size = parseInt(cellSizeInput.value)
  if (size) {
    painter.createGrid(size)
  }
})

/** Game */
painter.onClick(cell => {
  cell.paint()
})
