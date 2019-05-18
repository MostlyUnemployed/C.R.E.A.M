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

const funcs = {
  connect: async () => {
    const p = await window.ethereum.enable()
    provider = new ethers.providers.Web3Provider(window.web3.currentProvider)
    signer = provider.getSigner()
    myAddress = p[0]
    return ethers
  },
  isDeployed: async () => {
    const f = getFactoryContract()
    myCreamAddress = await f.creams(myAddress)
    console.log(myCreamAddress)
    return (myCreamAddress !== ZERO_ADDRESS)
  },
  getWallet: async () => {
    const f = getFactoryContract()
    myCreamAddress = await f.creams(myAddress)
    return myCreamAddress
  },
  deploy: async () => {
    const f = getFactoryContract()
    console.log(f)
    const tx = await f.deployCream()
    console.log(tx)
    await tx.wait()
    console.log(tx)
    myCreamAddress = await f.creams(myAddress)
    console.log(myCreamAddress)
    return myCreamAddress
    // at this point the contract is ready and we can interact with it n stuff
  },
  getOwners: async () => {
    const f = getFactoryContract()
    const numberOfUsers = await f.getNumberOfUsers()
    let users = []
    for (let i = 0; i < numberOfUsers; i++) {
      users.push(f.users(i))
    }
    const u = await Promise.all(users)
    console.log({u: u})
    return u
  },
  getAllKitties: async () => {
    const owners = await funcs.getOwners()
    const kitties = {}
    for (let owner of owners) {
      kitties[owner] = await funcs.getAllKittiesForOwner(owner)
    }
    return kitties
  },
  getAllKittiesForOwner: async (addr) => {
    const f = getFactoryContract()
    const ca = await f.creams(addr)
    const c = getCreamWallet(ca)
    const kittyCount = await c.getKittyCount()
    const kittyPromises = []
    for (let i = 0; i < kittyCount; i++) {
      kittyPromises.push(c.kitties(i))
    }
    const kittyIds = await Promise.all(kittyPromises)

    console.log(kittyIds)

    const fatcatPromises = []
    for (let kit of kittyIds) {
      fatcatPromises.push(c.fatcats(kit.id))
    }

    const fatcats = await Promise.all(fatcatPromises)

    const kitties = []
    for (let i = 0; i < kittyIds.length; i++) {
      kitties.push({
        id: kittyIds[i].id.toNumber(),
        value: ethers.utils.formatEther(fatcats[i]),
        img: `https://img.cn.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/${kittyIds[i].id.toNumber()}.svg`,
        x: kittyIds[i].x.toNumber(),
        y: kittyIds[i].y.toNumber(),
        rot: kittyIds[i].rot.toNumber()
      })
    }

    return kitties
  },
  deposit: async (kittyId, wei) => {
    const c = getCreamWallet()
    console.log(kittyId)
    console.log(wei)
    console.log(c)
    const tx = await c.meow(kittyId, {
      value: ethers.utils.parseEther('0.01')
    })
    console.log(tx)
    await tx.wait()
    console.log(tx)
    return tx
    // now we have deposited, we can print the cat or somehting
  },
  getCompoundBalance: async () => {
    const c = getCreamWallet()
    const a = c.address
    const wethAddress = contracts.weth.address
    const compound = new ethers.Contract(contracts.compound.address, contracts.compound.abi, signer)
    const bal = await compound.getSupplyBalance(a, wethAddress)
    return ethers.utils.formatEther(bal)
  }
}

function getFactoryContract() {
  return new ethers.Contract(contracts.creamFactory.address, contracts.creamFactory.abi, signer)
}

function getCreamWallet(ca = myCreamAddress) {
  return new ethers.Contract(ca, contracts.cream.abi, signer)
}

module.exports = funcs