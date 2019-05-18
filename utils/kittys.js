const ethers = require('ethers')
const axios = require('axios')

const CK_API_URL = 'https://public.api.cryptokitties.co/v1/kitties?owner_wallet_address='
const CK_API_KEY = 'yNZJhPRv7o2dvOI2h97UNbtRzOmGF57Y89qBJuBwuds'


const utils = {
    getKitties: async function (MY_ADDRESS) {
        const kitties = await axios.get(CK_API_URL + MY_ADDRESS, {
            headers: {
                'x-api-token': CK_API_KEY
            }
        })
        const cats = kitties.data.kitties
        return cats
    },
    
}


module.exports = utils