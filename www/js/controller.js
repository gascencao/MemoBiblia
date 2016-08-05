var controller = {

  info: {},

  fn: {

    isBrowser: function() {
      return window.cordova.platformId === "browser";
    },

    doMain: function () {
      controller.info.mainEl = views.main();

      controller.info.mainEl.append(views.get('main', { title: 'Memo Biblia' }));

      controller.info.loginEl = views.login();
      controller.info.loginEl.click(function () {
        controller.facebook.login();
      });
  
      controller.info.logoutEl = views.logout();
      controller.info.logoutEl.click(function () {
        controller.facebook.logout();
      });
  
      facebookConnectPlugin.getLoginStatus(function () {
        controller.info.logoutEl.hide();
      }, function () {
        controller.info.loginEl.hide();
      });
  
      controller.info.mainEl.append(controller.info.loginEl);
      controller.info.mainEl.append(controller.info.logoutEl);
      controller.info.mainEl.show();
    },

  },

  init: function () {
    if (controller.fn.isBrowser()) {
      controller.info.windowOpenDefault = window.open;
      window.fbAsyncInit = function() {
        facebookConnectPlugin.browserInit('1565427663764053');
        controller.fn.doMain();
      }
    }
  },
  
  main: function () {
    if (!controller.fn.isBrowser()) {
      controller.fn.doMain();
    }
  },

  showVerse: function(containerEl, verse) {
    var regex = /\*[^\*]*\*/ig,
        words = [],
        text;

    text = verse.text.replace(regex, function (match) {
      var wordsInMatch = match.slice(1, -1).split(' '),
          slots = '';
      $.merge(words, wordsInMatch);
      wordsInMatch.forEach(function (word) {
        slots += '<span class="slot" data-correct-value="' + word + '"></span>';
      });
      return slots;
    });

    var verseEl = $('<div class="verse"><span class="backspace">Borrar</span><span class="intro">' + verse.intro + '</span><span class="text">' + text + '</span></div>');
    verseEl.appendTo(containerEl);

    words
      .sort(function() {
        return .5 - Math.random();
      })
      .forEach(function (word) {
        verseEl.append('<span class="word" data-value="' + word + '">' + word + '</span>');
      });

    $('.verse .word').click(function (event) {
      var wordEl = $(event.target);
      if (wordEl.hasClass('used')) {
        return;
      }
      verseEl.find('.slot:not(.used)').first().html(wordEl.html()).addClass('used');
      wordEl.addClass('used');
      $('.verse .backspace').show();
    });

    $('.verse .backspace').click(function (event) {
      var wordsEl = verseEl.find('.slot.used'),
          wordEl = wordsEl.last(),
          backspaceEl = $(event.target);
      if (!wordsEl.length) {
        return;
      } else if (wordsEl.length == 1) {
        backspaceEl.hide();
      }
      $('.verse .word[data-value="' + wordEl.html() + '"]').last().removeClass('used');
      wordEl.html('').removeClass('used');
    });

  },
  
  startGame: function (friend) {
    $.getJSON("js/verses.json")
      .done(function(data) {
        var card = data[Math.floor(data.length * Math.random())];
        var verse = card.verses[Math.floor(card.verses.length * Math.random())];

        controller.info.logoutEl.hide();
        controller.info.friendListEl.hide();
        var gameEl = views.game();
        controller.info.mainEl.append(gameEl);
        controller.showVerse(gameEl, verse);
      });
  },

  facebook: {
    
    exec: function(callback) {
      if (controller.fn.isBrowser()) {
        controller.info.windowOpenCurrent = window.open;
        window.open = controller.info.windowOpenDefault;
      }
      callback();
      if (controller.fn.isBrowser()) {
        window.open = controller.info.windowOpenCurrent;
      }
    },

    login: function () {
      controller.facebook.exec(function () {
        facebookConnectPlugin.login(['public_profile', 'user_friends'], function (loginInfo) {
          controller.info.loginEl.hide();
          controller.info.logoutEl.show();

          facebookConnectPlugin.api(loginInfo.authResponse.userID + '/taggable_friends', [], function (friends) {
            controller.info.friendListEl = views.friendList();
            controller.info.friendListEl.appendTo(controller.info.mainEl);
            friends.data.forEach(function (friend) {
              var friendEl = views.friend(friend.id, friend.name, friend.picture.data.url);
              friendEl.click(function (event) {
                controller.startGame($(event.target).attr('data-content-id'));
              });
              controller.info.friendListEl.append(friendEl);
            });
          });
        });
      });
    },
    
    logout: function () {
      facebookConnectPlugin.logout(function () {
        controller.info.logoutEl.hide();
        controller.info.loginEl.show();
      });
    }

  }

};
