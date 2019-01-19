const chai = require('chai')

const PlasmaMerkleSumTree = require('../../src/sum-tree/plasma-sum-tree')
const Transaction = require('../../src/serialization').models.Transaction
const utils = require('../../src/utils')

const should = chai.should()

const accounts = [
  '0x43aaDF3d5b44290385fe4193A1b13f15eF3A4FD5',
  '0xa12bcf1159aa01c739269391ae2d0be4037259f3',
  '0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8'
]

const tx1 = new Transaction({
  block: 0,
  transfers: [
    {
      sender: accounts[0],
      recipient: accounts[1],
      token: 0,
      start: 2,
      end: 3
    }
  ]
})
const tx2 = new Transaction({
  block: 0,
  transfers: [
    {
      sender: accounts[2],
      recipient: accounts[1],
      token: 0,
      start: 6,
      end: 7
    }
  ]
})
const tx3 = new Transaction({
  block: 0,
  transfers: [
    {
      sender: accounts[2],
      recipient: accounts[1],
      token: 1,
      start: 100,
      end: 108
    }
  ]
})

describe('PlasmaMerkleSumTree', () => {
  describe('Construction', () => {
    it('should return undefined for an empty tree', () => {
      const tree = new PlasmaMerkleSumTree()

      should.not.exist(tree.root())
    })

    it('should generate a single-leaf tree correctly', () => {
      const tree = new PlasmaMerkleSumTree([tx1])

      tree.root().data.should.equal('1b2e79791f28c27ed669f257397e1deb3e522cf1f27024c161b619d276a25315' + 'ffffffffffffffffffffffffffffffff')
    })

    it('should generate an even tree correctly', () => {
      const tree = new PlasmaMerkleSumTree([tx1, tx2])

      tree.root().data.should.equal('7aaef6ea48e7c8cbbcd8d65cecc3af23f851474ad8c558c4d0406323bd2ef2d8' + 'ffffffffffffffffffffffffffffffff')
    })

    it('should generate an odd tree w/ multiple types correctly', () => {
      const tree = new PlasmaMerkleSumTree([tx1, tx2, tx3])

      tree.root().data.should.equal('946535b614d2542d539f38349aeac9d0347246efed789880c33dfb62103cc7e7' + 'ffffffffffffffffffffffffffffffff')
    })
  })

  describe('Proof Checking', () => {
    const numDummyTransactions = 100
    const txs = utils.getSequentialTxs(numDummyTransactions)
    const tree = new PlasmaMerkleSumTree(txs)
    const index = Math.floor(Math.random() * numDummyTransactions)
    const tx = tree.leaves[index]

    it('should verify a random TransferProof', () => {
      const transferProof = tree.getTransferProof(index)
      const trIndex = 0

      const isValid = PlasmaMerkleSumTree.checkTransferProof(tx, trIndex, transferProof, tree.root().data)
      isValid.should.be.true
    })

    it('should should not verify a TransferProof with an invalid index', () => {
      const transferProof = tree.getTransferProof(index)
      transferProof.args.leafIndex += 1

      const trIndex = 0

      const isValid = PlasmaMerkleSumTree.checkTransferProof(tx, trIndex, transferProof, tree.root().data)
      isValid.should.be.false
    })

    it('should verify a random TransactionProof', () => {
      const transactionProof = tree.getTransactionProof(tx)

      const isValid = PlasmaMerkleSumTree.checkTransactionProof(tx, transactionProof, tree.root().data)
      isValid.should.be.true
    })
    it('should should not verify a TransactionProof with an invalid index', () => {
      const transactionProof = tree.getTransactionProof(tx)
      transactionProof.args.transferProofs[0].leafIndex += 1

      const isValid = PlasmaMerkleSumTree.checkTransactionProof(tx, transactionProof, tree.root().data)
      isValid.should.be.false
    })
  })
})
