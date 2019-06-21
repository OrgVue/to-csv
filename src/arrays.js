const cell = require("./cell.js")
const char = String.fromCharCode

const { CHAR_NEWLINE, CHAR_RETURN, DELIMITER } = cell

const padArray = len => array =>
  array.slice(0, len).concat(new Array(Math.max(0, len - array.length)).fill())

const rowToCSV = (array, len) => {
  len = len || array.length
  return (
    padArray(len)(array)
      .map(cell.toString)
      .join(char(DELIMITER)) + char(CHAR_RETURN, CHAR_NEWLINE)
  )
}

const toCSV = arrays =>
  arrays.map(row => rowToCSV(row, arrays[0].length)).join("")

exports.toCSV = toCSV
