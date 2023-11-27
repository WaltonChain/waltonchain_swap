const tokens = require('./json/tokens.json')
const lpTokens = require('./json/lpTokens.json')
export const lpPair = [
  { 
    "token1": "BOS",
    "token2": "USDT",
    "address1": tokens.BOS,
    "address2": tokens.USDT,
    "lpAddress": lpTokens["BOS-USDT"],
    "lpPoolAddress": "0x34E30f4fD18E31c9EA9810d48bA4101d0fFBb87e",
    "tvl": "--",
    "apy":"--",
    "rate": '0.1',
    "start": new Date('2021/03/10 18:00:00').getTime(), // 开启质押时间
    "output": new Date('2021/03/10 22:00:00').getTime() // 出矿时间
  },
  { "token1": "BOS",
    "token2": "HT",
    "address1": tokens.BOS,
    "address2": tokens.WHT,
    "lpAddress": lpTokens["BOS-WHT"],
    "lpPoolAddress":"0xF8902FEF035aCf6F9F505e0B62a1Cef91a4F703f",
    "tvl": "--",
    "apy":"--",
    "rate": '0.1',
    "start": new Date('2022/03/30 22:00:00').getTime(), // 开启质押时间
    "output": new Date('2022/03/30 22:00:00').getTime() // 出矿时间
  },
  { "token1": "BOS",
    "token2": "ETH",
    "address1": tokens.BOS,
    "address2": tokens.ETH,
    "lpAddress": lpTokens["BOS-ETH"],
    "lpPoolAddress":"0xDdf618b827Db806B8f0F3bF0377b949d1132F870",
    "tvl": "--",
    "rate": '0.1',
    "apy":"--",
    "start": new Date('2022/03/30 22:00:00').getTime(), // 开启质押时间
    "output": new Date('2022/03/30 22:00:00').getTime() // 出矿时间
  },
  { "token1": "BOS",
    "token2": "HBTC", 
    "address1": tokens.BOS,
    "address2": tokens.HBTC,
    "lpAddress": lpTokens["BOS-HBTC"],
    "lpPoolAddress":"0x885Fb66805d534F1Ae8dCC47182bbd0C44c81C72",
    "tvl": "--",
    "rate": '0.1',
    "apy":"--",
    "start": new Date('2022/03/30 22:00:00').getTime(), // 开启质押时间
    "output": new Date('2022/03/30 22:00:00').getTime() // 出矿时间
  },
  { "token1": "BOS", 
    "token2": "BOS", 
    "address1": tokens.BOS,
    "address2": tokens.BOS, 
    "lpAddress": tokens.BOS,
    "lpPoolAddress":"0x822Fb53B9981845BC9b680Cf1Ea075281B6f1940",
    "tvl": "--",
    "rate": '0.1', //比率
    "apy":"--",
    "start": new Date('2022/03/30 22:00:00').getTime(), // 开启质押时间
    "output": new Date('2022/03/30 22:00:00').getTime() // 出矿时间
  }
]