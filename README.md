### waltonchain-swap

export declare enum ChainId {
    MAINNET = 1,
    ROPSTEN = 3,
    RINKEBY = 4,
    GÖRLI = 5,
    KOVAN = 42,
    BSC = 97,
    HECO = 256,
    OKLINK = 65,
}

import { Token, TokenAmount, WETH } from '@wswap/sdk'
WETH：
export declare const WETH: {
    1: Token;
    3: Token;
    4: Token;
    5: Token;
    42: Token;
    97: Token;
    65: Token;
    256: Token;
};

### env
1. [node >= 12 <= 14](https://nodejs.org/en). 

i.
```
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

sudo apt-get install -y nodejs
```

ii.
```
node --version
```

iii.
``` 
npm --version
```
iv.
``` 
npm install yarn -g
```

### startup

```
 git clone https://github.com/WaltonChain/waltonchain_swap.git

 cd waltonchain_swap/

 yarn install
```

### Run dev
```
yarn start
```

### Run prod
```
yarn build
```

[![Lint](https://github.com/Wswap/wswap-interface/workflows/Lint/badge.svg)](https://github.com/Wswap/wswap-interface/actions?query=workflow%3ALint)
[![Tests](https://github.com/Wswap/wswap-interface/workflows/Tests/badge.svg)](https://github.com/Wswap/wswap-interface/actions?query=workflow%3ATests)
[![Styled With Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)

An open source interface for Wswap -- a protocol for decentralized exchange of Ethereum tokens.

- Website: [wswap.org](https://wswap.org/)
- Interface: [app.wswap.org](https://app.wswap.org)
- Docs: [wswap.org/docs/](https://wswap.org/docs/)
- Twitter: [@WswapProtocol](https://twitter.com/WswapProtocol)
- Reddit: [/r/Wswap](https://www.reddit.com/r/Wswap/)
- Email: [contact@wswap.org](mailto:contact@wswap.org)
- Discord: [Wswap](https://discord.gg/FCfyBSbCU5)
- Whitepaper: [Link](https://hackmd.io/C-DvwDSfSxuh-Gd4WKE_ig)

## Accessing the Wswap Interface

To access the Wswap Interface, use an IPFS gateway link from the
[latest release](https://github.com/Wswap/wswap-interface/releases/latest), 
or visit [app.wswap.org](https://app.wswap.org).

## Listing a token

Please see the
[@wswap/default-token-list](https://github.com/wswap/default-token-list) 
repository.

## Development

### Install Dependencies

```bash
yarn
```

### Run

```bash
yarn start
```

### Configuring the environment (optional)

To have the interface default to a different network when a wallet is not connected:

1. Make a copy of `.env` named `.env.local`
2. Change `REACT_APP_NETWORK_ID` to `"{YOUR_NETWORK_ID}"`
3. Change `REACT_APP_NETWORK_URL` to e.g. `"https://{YOUR_NETWORK_ID}.infura.io/v3/{YOUR_INFURA_KEY}"` 

Note that the interface only works on testnets where both 
[Wswap V2](https://wswap.org/docs/v2/smart-contracts/factory/) and 
[multicall](https://github.com/makerdao/multicall) are deployed.
The interface will not work on other networks.

## Contributions

**Please open all pull requests against the `master` branch.** 
CI checks will run against all PRs.

## Accessing Wswap Interface V1

The Wswap Interface supports swapping against, and migrating or removing liquidity from Wswap V1. However,
if you would like to use Wswap V1, the Wswap V1 interface for mainnet and testnets is accessible via IPFS gateways 
linked from the [v1.0.0 release](https://github.com/Wswap/wswap-interface/releases/tag/v1.0.0).
