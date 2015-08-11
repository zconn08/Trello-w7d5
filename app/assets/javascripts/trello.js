window.Trello = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Trello.Routers.Router({$rootEl: $(".main")});
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Trello.initialize();
});
