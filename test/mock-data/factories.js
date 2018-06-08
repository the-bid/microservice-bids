const casual = require('casual')

function getBidAmounts() {
  return Array.from(new Array(casual.integer(1, 100)), () => ({
    amount: casual.double(0.1, 150)
  }))
}

module.exports = { getBidAmounts }
