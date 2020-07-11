const CODES = {
  A: 65,
  Z: 90,
  COUNT: 26
}

export function createTable(rowsCount = 15, colsCount = 30) {
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')
  rows.push(createRow(null, colsCount, cols))

  for (let i=0; i<rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('')
    rows.push(createRow(i + 1, colsCount, cells))
  }
  return rows.join('')
}

function createRow(rowNumber, colsCount, content) {
  return `
    <div class="row">
        <div class="row-info">${rowNumber ? rowNumber : ''}</div>
        <div class="row-data">${content}</div>
    </div>`
}

function toColumn(colName) {
  return `<div class="column">${colName}</div>`
}

function toCell() {
  return `<div contenteditable class="cell"></div>`
}

function toChar(_, index) {
  if (index / CODES.COUNT > CODES.COUNT) {
    throw new Error('Too big column index')
  }
  if (index < CODES.COUNT) {
    return String.fromCharCode(CODES.A + index)
    // alphabet.charAt(index)
  }
  return String.fromCharCode(CODES.A + index / CODES.COUNT - 1) + String.fromCharCode(CODES.A + index % CODES.COUNT)
  // alphabet.charAt(index / 26 - 1) + alphabet.charAt(index % 26)
}
