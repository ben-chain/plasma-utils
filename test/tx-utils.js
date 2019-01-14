const Transaction = require('../src/serialization').models.Transaction

/**
 * Returns a list of `n` sequential transactions.
 * @param {*} n Number of sequential transactions to return.
 * @return {*} A list of sequential transactions.
 */
const getSequentialTxs = (n) => {
  let txs = []

  for (let i = 0; i < n; i++) {
    txs[i] = new Transaction({
      transfers: [
        {
          sender: '0x0000000000000000000000000000000000000000',
          recipient: '0x0000000000000000000000000000000000000000',
          token: 0,
          start: i * 10,
          end: (i + 1) * 10,
          block: 0
        }
      ],
      signatures: [
        {
          v: '1b',
          r: 'd693b532a80fed6392b428604171fb32fdbf953728a3a7ecc7d4062b1652c042',
          s: '24e9c602ac800b983b035700a14b23f78a253ab762deab5dc27e3555a750b354'
        }
      ]
    })
  }

  return txs
}

module.exports = {
  getSequentialTxs
}
