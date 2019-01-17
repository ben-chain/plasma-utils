const Schema = require('../schema')
const Number = require('../schema-types/number')
const TransferSchema = require('./transfer')

const TransactionSchema = new Schema({
  block: {
    type: Number,
    length: 4,
    required: true
  },
  transfers: {
    type: [TransferSchema]
  }
})

module.exports = TransactionSchema
