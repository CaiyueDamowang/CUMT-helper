import { prices } from "../../utils/enum.js"
import { hasToLogin, decrypt, getStore, setStore } from "../../utils/util.js"
import { toLogin } from "../../utils/navigate.js"
import { getBalance, getOrder, recharge } from "../../utils/api.js"
import { fetchBalance, fetchOrder, parseBalance, parseAccount, processParamsForOrder, parseOrder } from "./helper.js"

const App = getApp()
Page({
  data: {
    modal     : false,
    // - 静态数据 - 
    prices    : prices,
    // - 网络数据 -
    account: {},
    balance: { int: 0, float: '00' },
    orderList : [],
    store: false,
    tempMoney: '',
  },

  onLoad: function(options) {
    wx.showLoading({
      title: '认证信息中',
    })
    hasToLogin()

    const getOrd = getStore('orderList')
      .then(res => {
        App.globalData.orderList = res.data    // 开销统计页面
        this.setData({ orderList: res.data.slice(0,6) })
      })
      .catch(e => {
        console.log(e)
      })
    const getBlc = getStore('balance')
      .then(balanceFromStore => {
        const balance = balanceFromStore.data
        this.setData({
          balance:{
            int: balance.split('.')[0],
            float: balance.split('.')[1]
          }
        })
      })
      .catch(e => {
        fetchBalance()
          .then(res => {
            const balance = parseBalance(res)
            const account_id = res.account

            this.setData({
              balance: {
                int: balance.split('.')[0],
                float: balance.split('.')[1]
              },
         
            })
            setStore({
              balance: balance,
              account_id: account_id
            })
            return account_id
          })
          .then(id  => fetchOrder(id))
          .then(res => {
            this.setData({
              orderList: res.slice(0,6)
            })
            setStore({
              orderList:res
            })
            App.globalData.orderList = res    // 开销统计页面
          })
          .finally((r,e) => {
            wx.hideLoading()
          })
      })
    Promise.all([getBlc, getOrd]).then(()=>{
      wx.hideLoading()
    })
  },

  updateAccount() {
    wx.showLoading({
      title: '加载信息',
    })
    fetchBalance()
      .then(res => {
        const balance = parseBalance(res)
        const account_id = res.account
        this.setData({
          balance: {
            int: balance.split('.')[0],
            float: balance.split('.')[1]
          },
          tempMoney: balance.unsettle_amount ?
            balance.unsettle_amount.slice(0, -2) : 0
        })
        setStore({
          balance: balance
        })
        return  account_id
      })
      .then(id => {
        return fetchOrder(id)
      })
      .then(res => {
        this.setData({
          orderList: res.slice(0,6)
        })
        setStore({
          orderList: res
        })
        App.globalData.orderList = res    // 开销统计页面
      })
      .catch(e => {
        wx.showToast({
          title: '网络错误,换个时间吧~',
        })
      })
      .finally((r,e) =>{
        wx.hideLoading()
      })
  },
  // 多选
  ChooseCheckbox(e) {
    let items = this.data.prices;
    let values = e.currentTarget.dataset.value;
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      if (items[i].value == values) {
        items[i].checked = !items[i].checked;
        this.setData({
          chargeNum: items[i].price
        })
      }else{
        items[i].checked = false
      }
    }
    this.setData({
      prices: items
    })
  },
  // modal
  showModal(e) {
    this.setData({
      modal: true
    })
  },
  hideModal(e) {
    this.setData({
      modal: false
    })
  },
  
  // 充值
  commit(){
    wx.showLoading({
      title: '充值中',
    })
    const { account, chargeNum } = this.data
    recharge({
      account: account.account,
      num: chargeNum
    })
      .then(res => {
        const data = JSON.parse(JSON.parse(decrypt(res.data.data)))
        const { errmsg } = JSON.parse(data.Msg)['transfer']
        wx.hideLoading()
        if (errmsg === "当前时间不允许交易") {
          wx.showToast({
            title: errmsg
          })
        }else {
          const tempMoney = chargeNum.slice(0,-2)
          this.setData({
            tempMoney: `过渡余额：${tempMoney}`
          })
        }
      })
      .then(res => {

        // fetchBalance()
        //   .then(res => {
        //     const balance = parseBalance(res)
        //     this.setData({
        //       balance: {
        //         int: balance.split('.')[0],
        //         float: balance.split('.')[1]
        //       }
        //     })
        //     setStore({
        //       balance: balance,
        //     })
        //   })
      })
    this.hideModal()
  },
  toChart () {
    wx.navigateTo({
      url: '/pages/charts/ykt-stat/ykt-stat'
    })
  }
})