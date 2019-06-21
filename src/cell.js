const CHAR_ENCAPSULATE = 0x22
const CHAR_NEWLINE = 0xa
const CHAR_RETURN = 0xd
const DELIMITER = 0x2c

const char = String.fromCharCode
const toISODateString = require("./date.js").toISOString

const isDate = o => o instanceof Date

const needsEncapsulation = (value, wrapperChar = CHAR_ENCAPSULATE) => {
  const dangerChars = [DELIMITER, CHAR_NEWLINE, CHAR_RETURN, wrapperChar]
  const testRegex = new RegExp(`[${dangerChars.map(c => char(c))}]`)

  return value && value.toString && testRegex.test(value.toString())
}

const encapsulate = (string, wrapperChar = CHAR_ENCAPSULATE) => {
  const wrapChar =
    typeof wrapperChar === "number" ? char(wrapperChar) : wrapperChar
  const replaceWith = wrapChar + wrapChar
  let escapedValue = string
    .toString()
    .replace(new RegExp(wrapChar, "g"), replaceWith)

  return wrapChar + escapedValue + wrapChar
}

const encapsulateIfNeeded = (string, wrapperChar = CHAR_ENCAPSULATE) =>
  needsEncapsulation(string, wrapperChar)
    ? encapsulate(string, wrapperChar)
    : string

const toString = cell => {
  if (cell === null || cell === undefined) return
  if (isDate(cell)) return toISODateString(cell)
  if (typeof cell === "object") return encapsulateIfNeeded(JSON.stringify(cell))
  return encapsulateIfNeeded(cell)
}

module.exports = {
  toString,
  CHAR_NEWLINE,
  CHAR_RETURN,
  DELIMITER
}
