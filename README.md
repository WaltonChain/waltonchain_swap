### waltonchain-swap

export declare enum ChainId {
    MAINNET = 1,
    GÖRLI = 5,
    BSC = 97,
    OKLINK = 65,
}

import { Token, TokenAmount, WETH } from '@uniswap/sdk'
WETH：
export declare const WETH: {
    1: Token;
    5: Token;
    97: Token;
    65: Token;
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