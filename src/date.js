const toISOString = function(date) {
  return date.toISOString().substr(0, 10)
}

exports.toISOString = toISOString
