const Schema = require('../schema')
const TransferProofSchema = require('./transfer-proof')

const TransactionProofSchema = new Schema({
  transferProofs: {
    type: [TransferProofSchema]
  }
})

module.exports = TransactionProofSchema
