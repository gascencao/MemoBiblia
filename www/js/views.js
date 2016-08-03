var views = {

  splash: function () {
    return $('.splash');
  },
  
  main: function () {
    return $('.main');
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
