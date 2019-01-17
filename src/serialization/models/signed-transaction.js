const BaseModel = require('./base-model')
const schemas = require('../schemas')
const Transfer = require('./transfer')
const Signature = require('./signature')

/**
 * Represents a transaction with signatures from each transfers[i].sender.
 */
class SignedTransaction extends BaseModel {
  constructor (args) {
    super(args, schemas.SignedTransactionSchema)
    this.transfers = this.args.transfers.map((transfer) => {
      return new Transfer(transfer)
    })
    this.signatures = this.args.signatures.map((signature) => {
      return new Signature(signature)
    })
  }
}

module.exports = SignedTransaction
