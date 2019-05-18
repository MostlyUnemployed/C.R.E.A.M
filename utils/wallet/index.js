const ethers = require('ethers')
const contracts = require('./contract')

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

// put this in state somewhere
let provider
let signer
let myCreamAddress
let myAddress


// we need to pass an assist instance into these things in order to get them
// to display transaction notifications

module.exports = {
  connect: async () => {
    const p = await window.ethereum.enable()
    provider = new ethers.providers.Web3Provider(window.web3.currentProvider)
    signer = provider.getSigner()
    myAddress = p[0]
    return ethers
  },
  isDeployed: async () => {
    const f = new ethers.Contract(contracts.creamFactory.address, contracts.creamFactory.abi, signer)
    myCreamAddress = await f.creams(myAddress)
    console.log(myCreamAddress)
    return (myCreamAddress !== ZERO_ADDRESS)
  },
  deploy: async () => {
    const f = new ethers.Contract(contracts.creamFactory.address, contracts.creamFactory.abi, signer)
    console.log(f)
    const tx = await f.deployCream()
    console.log(tx)
    await tx.wait()
    console.log(tx)
    myCreamAddress = await f.creams(myAddress)
    console.log(myCreamAddress)
    return tx
    // at this point the contract is ready and we can interact with it n stuff
  },

  deposit: async (kittyId, wei) => {
    const c = new ethers.Contract(myCreamAddress, contracts.cream.abi)
    const tx = await c.meow(kittyId, {
      value: wei
    })
    await tx.wait()
    return tx
    // now we have deposited, we can print the cat or somehting
  }
}