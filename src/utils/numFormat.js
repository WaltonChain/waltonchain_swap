
export function numFormat(num) {
  num = num + ''
  if (!num.includes('.')) {
    num += '.'
  }
  return num
    .replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
      return $1 + ','
    })
    .replace(/\.$/, '')
}

export function formatData(num) {
  num = num + ''
  if (!num.includes('.')) {
    num += '.'
  }
  return num
    .replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
      return $1 + ','
    })
    .replace(/\.$/, '')
}

export function toFixedNumber(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1])
    if (e) {
      x *= Math.pow(10, e - 1)
      x = '0.' + new Array(e).join('0') + x.toString().substring(2)
    }
  } else {
    let e = parseInt(x.toString().split('+')[1])
    if (e > 20) {
      e -= 20
      x /= Math.pow(10, e)
      x += new Array(e + 1).join('0')
    }
  }
  return x
}

export function toFixedDigit(num, n) {
  if (isNaN(num)) {
    return false
  }

  num = num.toString()
  var result = ''
  var zeroResult = function(n) {
    var zero = ''
    for (var i = 0; i < n; i++) {
      zero += '0'
    }
    return zero
  }
  if (num % 1 === 0) {
    result = num + '.' + zeroResult(n)
  } else {
    num = toFixedNumber(num)
    var num1 = num.split('.')
    if (num1[1].length < n) {
      result = num1[0] + '.' + num1[1] + zeroResult(n - num1[1].length)
    } else {
      result = num1[0] + '.' + num1[1].substring(0, n)
    }
  }
  if (num === null || num === '') {
    result = 0 + '.' + zeroResult(n)
  }
  return result
}
export function formatHash(hash) {
  if (isNaN(hash)) {
    return false
  }
  return hash.substring(0, 6) + '...' + hash.substring(66 - 4)
}
