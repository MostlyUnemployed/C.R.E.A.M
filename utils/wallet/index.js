const ethers = require('ethers')
const bnc = require('bnc-assist')
const contracts = require('./contract')

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

// put this in state somewhere
let provider
let signer
let myCreamAddress
let myAddress
let assist


// we need to pass an assist instance into these things in order to get them
// to display transaction notifications

const funcs = {
  connect: async () => {
    const p = await window.ethereum.enable()
    provider = new ethers.providers.Web3Provider(window.web3.currentProvider)
    signer = provider.getSigner()
    myAddress = p[0]
    assist = bnc.init({
      dappId: 'ce190e1b-5ff3-42d5-9072-5f08b80b420b',
      networkId: 4,
      ethers: ethers
    })
    return ethers
  },
  isDeployed: async () => {
    const f = getFactoryContract()
    myCreamAddress = await f.creams(myAddress)
    console.log(myCreamAddress)
    return (myCreamAddress !== ZERO_ADDRESS)
  },
  getMyAddress: async () => {
    return myAddress
  },
  getWallet: async () => {
    const f = getFactoryContract()
    myCreamAddress = await f.creams(myAddress)
    return myCreamAddress
  },
  deploy: async () => {
    const f = getFactoryContract()
    const n = assist.notify('pending', `Confirming age...`, 1000)
    const tx = await f.deployCream()
    await tx.wait()
    n()
    assist.notify('success', `Definitely over 18`)
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
        img: `https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/${kittyIds[i].id.toNumber()}.png`,
        x: kittyIds[i].x.toNumber(),
        y: kittyIds[i].y.toNumber(),
        rot: kittyIds[i].rot.toNumber()
      })
    }
    return kitties
  },
  deposit: async (kittyId, x, y, rot, eth) => {
    const c = getCreamWallet()
    console.log(kittyId)
    console.log(c)
    const n = assist.notify('pending', `Placing kitty sticker`, 10000)
    const tx = await c.meow(kittyId, x, y, rot, {
      value: ethers.utils.parseEther(eth)
    })
    await tx.wait()
    n()
    assist.notify('success', `Stuck!`)
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
  },
  withdrawAll: async () => {
    const c = getCreamWallet()
    const bal = await funcs.getCompoundBalance()
    const n = assist.notify('pending', `Withdrawing ~${Number(bal).toFixed(2)} ETH`, 10000)
    const tx = await c.lick(ethers.utils.parseEther(bal))
    await tx.wait()
    n()
    assist.notify('success', `Withdrawal successful`)
    return tx
  }
}

function getFactoryContract() {
  return new ethers.Contract(contracts.creamFactory.address, contracts.creamFactory.abi, signer)
}

function getCreamWallet(ca = myCreamAddress) {
  return new ethers.Contract(ca, contracts.cream.abi, signer)
}

module.exports = funcs