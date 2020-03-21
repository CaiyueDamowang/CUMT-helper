let i = 0
const id = () => {
  return i++
}

const scheduls = [{
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
}, {
  id: id(),
  begin: '20:50',
  end: '21:40'
}]
i = 0
const weeks = [
  {
    zh: '周一',
    en: 'Mon',
    id: id()
  },{
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
  }
]
module.exports = {
  scheduls: scheduls,
  weeks: weeks
}