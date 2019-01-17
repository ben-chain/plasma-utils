const BaseModel = require('./base-model')
const schemas = require('../schemas')

/**
 * Represents a proof for an individual branch, corresponding to an individual transfer in that branch's transaction.
 */
class TransferProof extends BaseModel {
  constructor (args) {
    super(args, schemas.TransferProofSchema)
  }
}

module.exports = TransferProof
