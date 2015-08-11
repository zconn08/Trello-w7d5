Trello.Collections.Boards = Backbone.Collection.extend({
  url: "api/boards",
  model: Trello.Models.Board,

  getOrFetch: function(id){
    var model = this.get(id);
    if(!model){
      model = new Trello.Models.Board({ id: id });
      this.add(model);
      model.fetch({
        error: function(){
          this.remove(model);
        }.bind(this)
      });
    } else {
      model.fetch();
    }
    return model;
  }
});
