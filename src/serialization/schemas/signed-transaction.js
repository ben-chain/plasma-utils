const Schema = require('../schema')
const Number = require('../schema-types/number')
const TransferSchema = require('./transfer')
const SignatureSchema = require('./signature')

const SignedTransactionSchema = new Schema({
  block: {
    type: Number,
    length: 32,
    required: true
  },
  transfers: {
    type: [TransferSchema]
  },
  signatures: {
    type: [SignatureSchema]
  }
})

module.exports = SignedTransactionSchema
