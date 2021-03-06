import {
  getTimeTables
} from '../../utils/api.js'
import {
  weeks,
  schedules,
  lessonColors
} from '../../utils/enum.js'
import {
  decrypt,
  getStore,
  setStore,
  getOwnYearPicker,
  debounce
} from '../../utils/util.js'
import {
  getTerm,
  getCurrentWeek,
  processFormatForLesson,
  processColorForLessons
} from './helper.js'

const App = getApp()
const date = new Date()

Page({
  data: {
    // --- 静态数据 ---
    is_pre: true,
    is_hidden: true,
    showSetModal: false,
    weeks: weeks,
    schedules: schedules,
    lessonsColors: lessonColors,
    lessonBlockMarginTop: '100% / 10',
    lessonBlockMarginLeft: '(100%) / 7',
    lessonBlockHeight: '10%',
    yearPicker: [2019, 2020, 2021, 2020],
    termPicker: [1, 2],
    // --- 导航高度 ---
    navTop: App.globalData.navTop,
    navHeight: App.globalData.navHeight,
    // --- 计算数据 ---
    currentYear: date.getFullYear() - 1,
    currentMonth: date.getMonth() + 1,
    currentWeek: getCurrentWeek()[0],
    currentDay: getCurrentWeek()[1],
    currentTerm: getTerm(),
    lessonDetail: null,
    // --- 请求数据 ---
    timetable: [],
    grade: [],
    exam: [],
    selectYear: "",
    selectTerm: ""
  },

  onLoad: function(options) {
    this.selectTable = debounce(this.selectTable)
    const getTimeTable = getStore('timetable')
      .then(res => {
        this.setData({
          timetable: res.data
        })
      })
      .then(() => {
        this.setOwnYearPicker()
      })
      .catch((err) => { // storage wrong 存储情况出现错误, 重新请求
        wx.showLoading({
          title: '加载课表中'
        })
        const { currentYear, currentTerm } = this.data
        this.fetchTable(currentYear, currentTerm)
        .then(state => {
          this.setData(state)
          setStore(state)
            .then(this.transTablesOfHome) // 同步首页数据
        })
      })

  },
  setOwnYearPicker() {
      getOwnYearPicker()
        .then(yearPicker => {
          this.setData({ yearPicker })
        })
  },

  fetchTable(year, term) {
    return getTimeTables({
        year,
        term
      })
      .then(res => {
        let state
        const text = res.data.data
        const data = JSON.parse(decrypt(text))
        let { timetable } = data

        timetable = processColorForLessons(lessonColors, timetable)
        timetable = processFormatForLesson(timetable)

        wx.hideLoading()
        return state = {
          'timetable': timetable
        }
      })
      .catch(err => {
        wx.hideLoading()
        wx.showToast({
          title: '获取失败'
        })
      })
  },

  transTablesOfHome(){
    const { homePage } = App.globalData
    if(homePage){
      homePage.getTimeTable()
    }
  },

  showModal(e) {
    const {
      lesson
    } = e.currentTarget.dataset
    const {
      schedules
    } = this.data
    lesson.time = schedules[lesson.start - 1].begin
    this.setData({
      modalName: 'Modal',
      lessonDetail: lesson
    })
  },

  hideModal() {
    this.setData({
      modalName: '',
      lessonDetail: {}
    })
  },

  togglePre: function() {
    const {
      is_pre
    } = this.data
    this.setData({
      is_pre: !is_pre
    })
  },

  changeWeekTable(e) {
    const { id } = e.currentTarget.dataset
    const currentWeek = id
    this.setData({
      currentWeek
    })
  },

  toCharts() {
    wx.navigateTo({
      url: '/pages/charts/tbs-stat/tbs-stat',
    })
  },

  showSetModal() {
    const showSetModal = true
    this.setData({
      showSetModal
    })
  },

  cancelModal() {
    const showSetModal = false
    this.setData({
      showSetModal
    })
  },

  changeYear(e) {
    this.setData({
      selectYear: this.data.yearPicker[e.detail.value]
    })
  },

  changeTerm(e) {
    this.setData({
      selectTerm: this.data.termPicker[e.detail.value]
    })
  },

  selectTable() {
    const {
      selectYear,
      selectTerm
    } = this.data

    if (!selectYear || !selectTerm) {
      wx.showToast({
        title: '请选择学期',
      })
    } else {
      this.fetchTable(selectYear, selectTerm)
        .then(this.setData)
    }
    this.cancelModal()
  }
})