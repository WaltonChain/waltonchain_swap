import { dividedBy, multipliedBy } from '../helpers/util'

const MdexFactory = require('../config/MdexFactory.json');

export async function getTokenPriceFromMdex(walletState, tokenAddress1, decimals1, tokenAddress2, decimals2) {
    try {
        const mdexFactory = new walletState.web3.eth.Contract(MdexFactory.abi, MdexFactory.address);
        const { reserveA, reserveB } = await mdexFactory.methods.getReserves(tokenAddress1, tokenAddress2).call();
        const price = multipliedBy(dividedBy(reserveA,reserveB), Math.pow(10,decimals2 - decimals1))
        return Number(price).toFixed(6);
    } catch (err) {
        console.error(`Failed to fetch token price,${err}`);
        return '--';
    }
}
