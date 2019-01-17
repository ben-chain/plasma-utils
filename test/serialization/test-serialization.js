/* eslint-disable no-new */
const chai = require('chai')
const BigNum = require('bn.js')

const models = require('../../src/serialization').models
const Transfer = models.Transfer
const Signature = models.Signature
const Transaction = models.Transaction
const SignedTransaction = models.SignedTransaction
const TransferProof = models.TransferProof
const TransactionProof = models.TransactionProof

const should = chai.should()

const encodedTransfer = '43aaDF3d5b44290385fe4193A1b13f15eF3A4FD5a12bcf1159aa01c739269391ae2d0be4037259f300000001000000000000000000000002000000000000000000000003'
const decodedTransfer = {
  sender: '0x43aaDF3d5b44290385fe4193A1b13f15eF3A4FD5',
  recipient: '0xa12bcf1159aa01c739269391ae2d0be4037259f3',
  token: new BigNum('1', 'hex'),
  start: new BigNum('2', 'hex'),
  end: new BigNum('3', 'hex')
}

const encodedSignature = '1bd693b532a80fed6392b428604171fb32fdbf953728a3a7ecc7d4062b1652c04224e9c602ac800b983b035700a14b23f78a253ab762deab5dc27e3555a750b354'
const decodedSignature = {
  v: '1b',
  r: 'd693b532a80fed6392b428604171fb32fdbf953728a3a7ecc7d4062b1652c042',
  s: '24e9c602ac800b983b035700a14b23f78a253ab762deab5dc27e3555a750b354'
}

const encodedTransaction = '00000001' + '01' + encodedTransfer
const decodedTransaction = {
  block: new BigNum('1', 'hex'),
  transfers: [
    decodedTransfer
  ]
}

const encodedSignedTransaction = '00000001' + '01' + encodedTransfer + '01' + encodedSignature
const decodedSignedTransaction = {
  block: new BigNum('1', 'hex'),
  transfers: [
    decodedTransfer
  ],
  signatures: [
    decodedSignature
  ]
}

const encodedTransferProof = '00000000000000000000000000000003' + '00000000000000000000000000000004' + encodedSignature + '01' + '563f225cdc192264a90e7e4b402815479c71a16f1593afa4fc6323e18583472affffffffffffffffffffffffffffffff'
const decodedTransferProof = {
  parsedSum: new BigNum('3', 'hex'),
  leafIndex: new BigNum('4', 'hex'),
  inclusionProof: [
    '563f225cdc192264a90e7e4b402815479c71a16f1593afa4fc6323e18583472affffffffffffffffffffffffffffffff'
  ],
  signature: decodedSignature
}

const encodedTransactionProof = '01' + encodedTransferProof
const decodedTransactionProof = {
  transferProofs: [
    decodedTransferProof
  ]
}

describe('Serialization', () => {
  describe('Transfer', () => {
    it('should be correctly encoded', () => {
      const tr = new Transfer(decodedTransfer)

      tr.encoded.should.equal(encodedTransfer)
    })

    it('should be correctly decoded', () => {
      const tr = new Transfer(encodedTransfer)

      tr.decoded.should.deep.equal(decodedTransfer)
    })

    it('should throw if trying to create a Transfer with an invalid address', () => {
      should.Throw(() => {
        new Transfer({
          ...decodedTransfer,
          ...{ sender: 'This is not a valid Ethereum address' }
        })
      }, 'Address must be a valid Ethereum address')
    })

    it('should throw if trying to create a Transfer with an invalid integer parameter', () => {
      should.Throw(() => {
        new Transfer({
          ...decodedTransfer,
          ...{ token: 99999999999 }
        })
      }, 'Number is too large')
    })
  })

  describe('Signature', () => {
    it('should be correctly encoded', () => {
      const sig = new Signature(decodedSignature)

      sig.encoded.should.equal(encodedSignature)
    })

    it('should be correctly decoded', () => {
      const sig = new Signature(encodedSignature)

      sig.decoded.should.deep.equal(decodedSignature)
    })

    it('should throw if trying to create a Signature with an invalid parameter', () => {
      should.Throw(() => {
        new Signature({
          ...decodedSignature,
          ...{ v: 'deadbeef' }
        })
      }, 'Invalid Buffer length')
    })
  })

  describe('Transaction', () => {
    it('should be correctly encoded', () => {
      const tx = new Transaction(decodedTransaction)

      tx.encoded.should.equal(encodedTransaction)
    })

    it('should be correctly decoded', () => {
      const tx = new Transaction(encodedTransaction)

      tx.decoded.should.deep.equal(decodedTransaction)
    })
  })

  describe.skip('SignedTransaction', () => {
    it('shoud be correctly encoded', () => {
      const stx = new SignedTransaction(decodedSignedTransaction)

      stx.encoded.should.equal(encodedSignedTransaction)
    })

    it('should be correctly decoded', () => {
      const stx = new SignedTransaction(encodedSignedTransaction)

      stx.decoded.should.deep.equal(decodedSignedTransaction)
    })
  })

  describe('TransferProof', () => {
    it('shoud be correctly encoded', () => {
      debugger
      const transferProof = new TransferProof(decodedTransferProof)

      transferProof.encoded.should.equal(encodedTransferProof)
    })

    it('shoud be correctly encoded', () => {
      const transferProof = new TransferProof(encodedTransferProof)

      transferProof.decoded.should.deep.equal(decodedTransferProof)
    })
  })

  describe('TransactionProof', () => {
    it('shoud be correctly encoded', () => {
      const transactionProof = new TransactionProof(decodedTransactionProof)

      transactionProof.encoded.should.equal(encodedTransactionProof)
    })

    it('shoud be correctly encoded', () => {
      const transactionProof = new TransactionProof(encodedTransactionProof)

      transactionProof.decoded.should.deep.equal(decodedTransactionProof)
    })
  })
})
