var app = {

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
      document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      $('.splash').hide();
      $('.main').show();
      app.getVerse();
    },

    getVerse: function() {
      jQuery
        .getJSON("js/verses.json")
        .done(function(data) {
          var card = data[Math.floor(data.length * Math.random())];
          app.showVerse($('.main'), card.verses[Math.floor(card.verses.length * Math.random())]);
        })
        .fail(function() {
          console.log("error");
        });
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

    }

};
