"use strict";
App({
  globalData: {},
  onLaunch: function() {
    var _this = this;
    var menuButtonObject = wx.getMenuButtonBoundingClientRect();
    var systemInfo = wx.getSystemInfoSync();
    var statusBarHeight = systemInfo.statusBarHeight,
      navTop = menuButtonObject.top,
      navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;
    this.globalData.navHeight = navHeight;
    this.globalData.navTop = navTop;
    this.globalData.windowHeight = systemInfo.windowHeight;
 
    wx.login({
      success: function(res) {

      },
    });
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              _this.globalData.userInfo = res.userInfo;
              if (_this.userInfoReadyCallback) {
                _this.userInfoReadyCallback(res);
              }
            },
          });
        }
      },
    });
  },
});