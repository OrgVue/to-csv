const arrays = require("./arrays.js")

const toArrays = objects => {
  if ("object" !== typeof objects) throw new TypeError("expecting an array")

  objects = Array.isArray(objects) ? objects.slice() : [objects]

  if (!objects.length) throw new Error("expecting at least one object")

  const headers = [],
    lookup = {},
    buf = []

  let index

  while (objects.length) {
    let lbuf = [],
      object = objects.shift()

    for (let key in object) {
      if (!object.hasOwnProperty(key)) continue
      index = lookup[key]
      if (index === undefined) {
        index = lookup[key] = Object.keys(lookup).length
        headers[index] = key
      }

      lbuf[index] = object[key]
    }

    buf.push(lbuf)
  }

  buf.unshift(headers)

  return buf
}

const toCSV = objects => arrays.toCSV(toArrays(objects))

exports.toArrays = toArrays
exports.toCSV = toCSV
