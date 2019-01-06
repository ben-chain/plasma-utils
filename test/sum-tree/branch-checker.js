/*
const assert = require('chai').assert
const PlasmaMerkleSumTree = require('../../src/sum-tree/plasma-sum-tree')
const Transaction = require('../../src/serialization').models.Transaction
const DT = require('../dummy-tx-utils')
const checkBranchValidity = require('../../src/sum-tree/branch-checker')

describe('BranchChecker', function () {
  const TXs = DT.genNSequentialTransactions(100)
  tree = new PlasmaMerkleSumTree(TXs)

  it('should generate and validate a random proof', function () {
    const randQueryInd = Math.floor(Math.random() * 100)
    const proof = tree.getBranch(randQueryInd)
    const validity = checkBranchValidity(randQueryInd, tree.leaves[randQueryInd], proof, tree.root())
    assert.strictEqual(validity, true)
  })
  it('should return false with a spooky index boi', function() {
    const randQueryInd = Math.floor(Math.random() * 100)
    const proof = tree.getBranch(randQueryInd)
    const validity = checkBranchValidity(randQueryInd+1, tree.leaves[randQueryInd], proof, tree.root())
    assert.strictEqual(validity, false)
  })
  it('should return false with a spooky TX boi', function() {
    const randQueryInd = Math.floor(Math.random() * 100)
    const proof = tree.getBranch(randQueryInd)
    const validity = checkBranchValidity(randQueryInd, tree.leaves[randQueryInd+1], proof, tree.root())
    assert.strictEqual(validity, false)
  })
  it('should return false with a spooky proofnode boi', function (){
    const randQueryInd = Math.floor(Math.random() * 100)
    let spoofedProof = tree.getBranch(randQueryInd)
    spoofedProof[4] = tree.levels[1][5] // 4,1,5 here are meant to be a random change
    const validity = checkBranchValidity(randQueryInd, tree.leaves[randQueryInd], spoofedProof, tree.root())
    assert.strictEqual(validity, false)
  })
  it('should return false with a spooky prooffirstnode boi', function (){
    const randQueryInd = Math.floor(Math.random() * 100)
    let spoofedProof = tree.getBranch(randQueryInd)
    spoofedProof[0] = tree.levels[1][5] // just a random change
    const validity = checkBranchValidity(randQueryInd, tree.leaves[randQueryInd], spoofedProof, tree.root())
    assert.strictEqual(validity, false)
  })
  it('should return false with a spooky prooflastnode boi', function (){
    const randQueryInd = Math.floor(Math.random() * 100)
    let spoofedProof = tree.getBranch(randQueryInd)
    spoofedProof[1] = tree.levels[1][5] // just a random change
    const validity = checkBranchValidity(randQueryInd, tree.leaves[randQueryInd], spoofedProof, tree.root())
    assert.strictEqual(validity, false)
  })
  it('should return false with a spooky prooflastnode boi', function (){
    const randQueryInd = Math.floor(Math.random() * 100)
    let spoofedProof = tree.getBranch(randQueryInd)
    spoofedProof[spoofedProof.length-1] = tree.levels[1][5] // just a random change
    const validity = checkBranchValidity(randQueryInd, tree.leaves[randQueryInd], spoofedProof, tree.root())
    assert.strictEqual(validity, false)
  })
  it('should return false with a spooky root boi', function() {
    const randQueryInd = Math.floor(Math.random() * 100)
    const proof = tree.getBranch(randQueryInd)
    const validity = checkBranchValidity(randQueryInd, tree.leaves[randQueryInd], proof, tree.levels[3][0])
    assert.strictEqual(validity, false)
  })
})
*/
