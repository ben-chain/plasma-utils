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
  inclusionProof: {
    type: [Bytes],
    length: 48
  },
  signature: {
    type: Signature
  }
})

module.exports = TransferProofSchema
