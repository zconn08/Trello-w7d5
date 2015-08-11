Trello.Routers.Router = Backbone.Router.extend({

  routes: {
    "" : "boardIndex",
    "boards/new": "newBoard",
    "boards/:id": "boardShow"
  },

  initialize: function(options){
    this.$rootEl = options.$rootEl;
    this.collection = new Trello.Collections.Boards();
  },

  boardIndex: function(){
    this.collection.fetch();
    var view = new Trello.Views.BoardIndex({collection: this.collection});
    this.swapView(view);
  },

  boardShow: function(id){
    var model = this.collection.getOrFetch(id);
    var view = new Trello.Views.BoardShow({model: model});
    this.swapView(view);
  },

  newBoard: function(){
    var model = new Trello.Models.Board();
    var view = new Trello.Views.NewBoard({
      model: model,
      collection: this.collection
    });
    this.swapView(view);
  },

  swapView: function(view){
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
