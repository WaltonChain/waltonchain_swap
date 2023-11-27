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