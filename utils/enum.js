let i = 1
const id = () => {
  return i++
}

//  课表时间节次
const schedules = [{
  id: id(),
  begin: '8:00',
  end: '8:50'
}, {
  id: id(),
  begin: '8:55',
  end: '10:10'
}, {
  id: id(),
  begin: '10:15',
  end: '11:05'
}, {
  id: id(),
  begin: '11:10',
  end: '12:00'
}, {
  id: id(),
  begin: '14:00',
  end: '14:50'
}, {
  id: id(),
  begin: '14:55',
  end: '15:45'
}, {
  id: id(),
  begin: '16:15',
  end: '17:05'
}, {
  id: id(),
  begin: '17:10',
  end: '18:00'
}, {
  id: id(),
  begin: '19:00',
  end: '19:50'
}, {
  id: id(),
  begin: '19:55',
  end: '20:45'
}]
i = 0

// 课表星期节次
const weeks = [{
  zh: '周一',
  en: 'Mon',
  id: id()
}, {
  zh: '周二',
  en: 'Tue',
  id: id()
}, {
  zh: '周三',
  en: 'Web',
  id: id()
}, {
  zh: '周四',
  en: 'Thu',
  id: id()
}, {
  zh: '周五',
  en: 'Fri',
  id: id()
}, {
  zh: '周六',
  en: 'Sat',
  id: id()
}, {
  zh: '周日',
  en: 'Sun',
  id: id()
}]
i = 0

// 课表颜色
const lessonColors = [
  '#EF5350', '#26C6DA', '#66BB6A', '#ff4a00', '#13d0ab', '#ffc43e', '#13d0ab', '#5f6c72', '#ffc43e', '#5f6c72', '#ffc43e', '#5f6c72', '#ffc43e', '#5f6c72',
]

// 首页工具
const utils = [{
  name: '我的校园卡',
  path: 'ykt',
}, {
  name: '我的图书馆',
  path: 'lib',
}, {
  name: '电话号查询',
  path: 'phone',
}
]

let prices = [{
  value: 0,
  price: 10,
  checked: false,
}, {
  value: 1,
  price: 20,
  checked: false,
}, {
  value: 2,
  price: 30,
  checked: false,
}, {
  value: 3,
  price: 60,
  checked: false,
}, {
  value: 4,
  price: 80,
  checked: false,
}, {
  value: 5,
  price: 100,
  checked: false,
}]
const pricesComputed = prices.map(item => {
  item.price = +item.price * 100
  return item
})
module.exports = {
  utils: utils,
  weeks: weeks,
  prices: pricesComputed,
  schedules: schedules,
  lessonColors: lessonColors
}