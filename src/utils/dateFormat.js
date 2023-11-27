//时间戳转化补0
export function addZero(v) {
  return v < 10 ? '0' + v : v
}
//转化时间戳
export function switchTimeFormat(time) {
  const dateTime = new Date(time)
  const year = dateTime.getFullYear()
  const month = dateTime.getMonth() + 1
  const date = dateTime.getDate()
  const hour = dateTime.getHours()
  const minute = dateTime.getMinutes()
  const second = dateTime.getSeconds()
  return (
    year +
    '-' +
    addZero(month) +
    '-' +
    addZero(date) +
    ' ' +
    addZero(hour) +
    ':' +
    addZero(minute) +
    ':' +
    addZero(second)
  )
}
