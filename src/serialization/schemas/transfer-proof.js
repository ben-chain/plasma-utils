const Schema = require('../schema')
const Number = require('../schema-types/number')
const Bytes = require('../schema-types/bytes')
const Signature = require('./signature')

const TransferProofSchema = new Schema({
  parsedSum: {
    type: Number,
    length: 16
  },
  leafIndex: {
    type: Number,
    length: 16
  },
  signature: {
    type: Signature
  },
  inclusionProof: {
    type: [Bytes],
    length: 48
  }
})

module.exports = TransferProofSchema
