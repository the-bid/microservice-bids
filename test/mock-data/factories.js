const casual = require('casual')

function getBidAmounts() {
  return Array.from(new Array(casual.integer(1, 100)), () => ({
    amount: parseFloat(casual.double(0.1, 150).toFixed(2))
  }))
}

module.exports = { getBidAmounts }
