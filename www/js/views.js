var views = {
  
  get: function (name, data) {
    /*
    $.get('views/' + name.replace('[^azAz09]', '_') + '.tmpl', function (template) {
      var compiled = Handlebars.compile(template);
      callback(compiled(data));
    });
    */
    return Handlebars.templates[name](data);
  },

  main: function () {
    return $('.app');
  },

  login: function () {
    return $('<a hred="#" class="facebookButton">Login</a>');
  },
  
  logout: function  () {
    return $('<a hred="#" class="facebookButton">Logout</a>');
  },
  
  friendList: function () {
    return $('<ul class="friendList"></ul>');
  },
  
  friend: function (id, name, picture) {
    return $('<li class="friend" data-content-id="' +  id + '"><img src="' + picture + '" />' + name + '</li>');
  },
  
  game: function () {
    return $('<div class="game"></div>');
  }

};
