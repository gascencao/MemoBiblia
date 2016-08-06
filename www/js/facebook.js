var facebook = {

  info: {
    permissions: ['public_profile', 'user_friends']
  },

  fn: {

    exec: function(callback) {
      if (app.isBrowser()) {
        facebook.info.windowOpenCurrent = window.open;
        window.open = facebook.info.windowOpenDefault;
      }
      callback();
      if (app.isBrowser()) {
        window.open = facebook.info.windowOpenCurrent;
      }
    }

  },

  init: function (callback) {
    if (app.isBrowser()) {
      facebook.info.windowOpenDefault = window.open;
      window.fbAsyncInit = function() {
        facebookConnectPlugin.browserInit('1565427663764053');
        callback();
      }
    }
  },

  login: function (callback) {
    facebook.fn.exec(function () {
      facebookConnectPlugin.login(facebook.info.permissions, function (loginInfo) {
        callback(loginInfo.status == 'connected', loginInfo);
      }, function (err) {});
    });
  },

  status: function (callback) {
    facebookConnectPlugin.getLoginStatus(function (loginInfo) {
      callback(loginInfo.status == 'connected', loginInfo);
    }, function (err) {});
  },

  logout: function (callback) {
    facebookConnectPlugin.logout(function () {
      callback();
    }, function (err) {});
  },

  getFriends: function (userID, callback) {
    facebookConnectPlugin.api(
      userID + '/friends', [],
      function (friends) {
        callback(friends);
      }, function (err) {}
    );
  },

  inviteFriendsToApp: function () {
    facebookConnectPlugin.showDialog({
      method: 'apprequests',
      message: 'Vení a jugar a Memo Biblia!'
    }, function (success) {}, function (err) {});
  }

}
