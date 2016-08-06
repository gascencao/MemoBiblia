var controller = {

  info: {},

  fn: {

    doMain: function () {
      facebook.status(function (connected, loginInfo) {
        var data = { title: 'Memo Biblia' };
        data.connected = connected;
        views.main(data);
        if (connected) {
          controller.fn.getFriends(loginInfo.authResponse.userID);
        }
      });
    },

    getFriends: function (userID) {
      facebook.getFriends(userID, function (friends) {
        views.showFriends(friends);
      });
    },

    hideFriends: function () {
      views.hideFriends();
    },

    getVerse: function (callback) {
      $.getJSON("js/verses.json")
        .done(function(data) {
          var card = data[Math.floor(data.length * Math.random())];
          var verse = card.verses[Math.floor(card.verses.length * Math.random())];
          callback(verse);
        });
    }

  },

  init: function () {
    views.init();
    facebook.init(function () {
      controller.fn.doMain();
    });
  },

  main: function () {
    if (!app.isBrowser()) {
      controller.fn.doMain();
    }
  },

  login: function () {
    facebook.login(function (connected, loginInfo) {
      if (connected) {
        controller.fn.getFriends(loginInfo.authResponse.userID);
        views.showLogout();
      }
    });
  },
  
  logout: function () {
    facebook.logout(function () {
      controller.fn.hideFriends();
      views.showLogin();
    });
  },

  choooseFriend: function (userID) {
    controller.startGame(userID);
    controller.inviteFriendToApp(userID);
  },

  inviteFriendsToApp: function () {
    facebook.inviteFriendsToApp();
  },

  startGame: function (userID) {
    controller.fn.getVerse(function (verse) {
      views.startGame({ userID: userID, verse: verse});
    });
  },

  chooseWord: function (gameEl, wordEl, backspaceEl) {
    views.chooseWord(gameEl, wordEl, backspaceEl);
  },

  removeWord: function (gameEl, backspaceEl) {
    views.removeWord(gameEl, backspaceEl);
  }

};
