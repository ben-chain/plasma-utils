const BaseModel = require('./base-model')
const schemas = require('../schemas')

/**
 * Represents a proof for an individual branch, corresponding to an individual transfer in that branch's transaction.
 */
class TransactionProof extends BaseModel {
  constructor (args) {
    super(args, schemas.TransactionProofSchema)
  }
}

module.exports = TransactionProof
