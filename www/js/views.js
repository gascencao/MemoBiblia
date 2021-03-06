var views = {

  info: {},

  fn: {

    get: function (name, data) {
      return $(Handlebars.templates[name](data));
    },

    prepareGame: function (data) {
      var regex = /\*[^\*]*\*/ig,
          words = [];

      data.verse.text = data.verse.text.replace(regex, function (match) {
        var wordsInMatch = match
          .slice(1, -1)
          .split(' ')
          .map(function(word) {
            return word.trim()
          });

        $.merge(words, wordsInMatch);

        return wordsInMatch.map(function (word) {
          return '|' + word + '|';
        }).join(' ');
      });

      data.words = words.sort(function() {
          return .5 - Math.random();
        });

      return data;
    },

    addSlots: function (text, options) {
      return text
        .split(' ')
        .map(function(word) {
          word = word.trim();
          if (word.slice(0, 1) == '|') {
            word = options.fn(word.slice(1, word.indexOf('|', 1))) + word.slice(word.indexOf('|', 1) + 1);
          }
          return word;
        }).join(' ');
    },

    getSlots: function (gameEl, used) {
      return gameEl.find(used ? '.slot.used' : '.slot:not(.used)');
    },

    getWords: function (gameEl, used, word) {
      return gameEl.find((used ? '.word.used' : '.word:not(.used)') + (word ? '[data-value="' + word + '"]' : ''));
    }

  },

  init: function () {
    views.info.appEl = $('.app');
    Handlebars.registerHelper('add_slots', function(text, options) {
      return views.fn.addSlots(text, options);
    });
  },

  main: function (data) {
    var mainEl = views.fn.get('main', data);

    var loginEl = mainEl.find('#login');
    loginEl.click(function () {
      controller.login();
    });

    var logoutEl = mainEl.find('#logout');
    logoutEl.click(function () {
      controller.logout();
    });

    views.info.mainEl = mainEl;
    views.info.contentEl = mainEl.find('#content');
    views.info.loginEl = loginEl;
    views.info.logoutEl = logoutEl;

    if (data.connected) {
      views.showLogout();
    } else {
      views.showLogin();
    }

    views.info.appEl.append(mainEl);
  },

  showLogin: function () {
    views.info.logoutEl.hide();
    views.info.loginEl.show();
  },

  showLogout: function () {
    views.info.loginEl.hide();
    views.info.logoutEl.show();
  },

  showFriends: function (data) {
    var friendListEl = views.fn.get('friends', data);

    friendListEl.find('.friend[data-content-id]').click(function (event) {
      controller.choooseFriend($(event.target).attr('data-content-id'));
    });

    friendListEl.find('#invite').click(function () {
      controller.inviteFriendsToApp();
    });

    views.info.friendListEl = friendListEl;
    views.info.contentEl.append(friendListEl);
  },

  hideFriends: function () {
    views.info.friendListEl.remove();
  },

  startGame: function (data) {
    var gameEl = views.fn.get('game', views.fn.prepareGame(data));

    gameEl.find('.word').click(function (event) {
      controller.chooseWord(gameEl, $(event.target), gameEl.find('.backspace'));
    });

    gameEl.find('.backspace').click(function (event) {
      controller.removeWord(gameEl, $(event.target));
    });

    views.info.logoutEl.hide();
    views.info.friendListEl.hide();

    views.info.contentEl.append(gameEl);
  },

  chooseWord: function (gameEl, wordEl, backspaceEl) {
    if (wordEl.hasClass('used')) {
      return;
    }

    views.fn.getSlots(gameEl, false)
      .first()
      .html(wordEl.html())
      .addClass('used');

    wordEl.addClass('used');
    backspaceEl.show();
  },

  removeWord: function (gameEl, backspaceEl) {
    var slotsEl = views.fn.getSlots(gameEl, true),
        slotEl = slotsEl.last();

    if (slotsEl.length <= 1) {
      backspaceEl.hide();
    }

    views.fn.getWords(gameEl, true, slotEl.html())
      .last().removeClass('used');

    slotEl.html('').removeClass('used');
  }

};
