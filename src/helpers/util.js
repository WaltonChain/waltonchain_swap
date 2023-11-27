import BN from 'bignumber.js'

// 指数位 (默认保留两位小数) 返回 string; 例：x = new BigNumber('10') x.exponentiatedBy(3) // '1000'
export function exponentiatedBy(number, exponential = 0) {
  if (!number || isNaN(Number(number))) {
    return number
  }
  number = new BN(number)
  return number.exponentiatedBy(exponential).toString()
}

// 加法 返回 string;
export function plus(x, y) {
  x = new BN(x)
  y = new BN(y)
  if (x.isNaN()) {
    return x
  }
  if (y.isNaN()) {
    return y
  }
  return x.plus(y).toString()
}

// 减法 返回 string;
export function minus(x, y) {
  x = new BN(x)
  y = new BN(y)
  if (x.isNaN()) {
    return x
  }
  if (y.isNaN()) {
    return y
  }
  return x.minus(y).toString()
}

// 乘法 返回 string;
export function multipliedBy(x, y) {
  x = new BN(x)
  y = new BN(y)
  if (x.isNaN()) {
    return x
  }
  if (y.isNaN()) {
    return y
  }
  return x.multipliedBy(y).toString()
}

// 除法 返回 string;
export function dividedBy(x, y) {
  if (y === 0) {
    return y
  }
  x = new BN(x)
  y = new BN(y)
  if (x.isNaN()) {
    return x
  }
  if (y.isNaN()) {
    return y
  }
  return x.dividedBy(y).toString()
}

// 格式化数字 返回 string; 例：x = new BigNumber('123456789.123456789') x.toFormat(3) // '123,456,789.123'
export function toFormat(number, digit = 3) {
  if (!number || isNaN(Number(number))) {
    return number
  }
  const fmt = {
    prefix: '',
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: ' ',
    fractionGroupSize: 0,
    suffix: ''
  }
  BN.config({
    FORMAT: fmt
  })
  const ft = BN(number)
    .toFormat(digit)
    .split('.')
  const left = ft[0]
  let right = ft[1] || ''
  right = !Number(ft[1]) ? '' : '.' + ft[1]
  return left + right
}

// 按属性升序排序
export function compareAscend(prop) {
  return function(obj1, obj2) {
    let val1 = obj1[prop]
    let val2 = obj2[prop]
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1)
      val2 = Number(val2)
    }
    if (val1 < val2) {
      return -1
    } else if (val1 > val2) {
      return 1
    } else {
      return 0
    }
  }
}

// 按属性升序排序
export function compareDescend(prop) {
  return function(obj1, obj2) {
    let val1 = obj1[prop]
    let val2 = obj2[prop]
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1)
      val2 = Number(val2)
    }
    if (val1 < val2) {
      return 1
    } else if (val1 > val2) {
      return -1
    } else {
      return 0
    }
  }
}

export function inputTime(i) {
  return i < 10 ? '0' + i : i
}
export function countdown(lauchTime) {
  if (isNaN(lauchTime) || lauchTime < 0) {
    return '--:--:--:--'
  }
  const leftTime = lauchTime - Date.now() // 总时间（毫秒）
  if (leftTime < 0) {
    return 'Lanuched'
  }
  const second = inputTime(parseInt((leftTime / 1000) % 60, 10))
  const minute = inputTime(parseInt((leftTime / 1000 / 60) % 60, 10))
  const hour = inputTime(parseInt((leftTime / 1000 / 60 / 60) % 24, 10))
  const day = inputTime(parseInt(leftTime / 1000 / 60 / 60 / 24, 10))

  return day + ':' + hour + ':' + minute + ':' + second
}

export function checkTime(a, b) {
  return a - b
}
