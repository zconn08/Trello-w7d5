Trello.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['board_show'],
  events: {
    "click .remove-board": "removeBoard",
    "submit .new-list": "addList",
    "sortstop .lists": "handleStop"
  },

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);

    var lists = this.model.lists();

    this.listenTo(lists, "add", this.addListView);

    lists.each(function(list){
      this.addListView(list);
    }.bind(this));


    this.listenTo(lists, "remove", this.removeListView);
    //this.listenTo(lists, "change", this.render);
  },

  render: function(){
    this.$el.html(this.template({board: this.model}));
    this.attachSubviews();
    this.$(".lists").sortable();
    this.$(".cards").sortable();
    return this;
  },

  removeBoard: function(){
    this.model.destroy();
    this.remove();
    Backbone.history.navigate("", {trigger: true});
  },

  addList: function(e){
    e.preventDefault();
    var formData = $(e.currentTarget).serializeJSON();
    var newList = new Trello.Models.List({ board_id: this.model.id} );
    newList.save(formData, {
      success: function(model){
        this.model.lists().add(newList);
        Backbone.history.navigate("#/board/" + this.model.id, {trigger: true});
      }.bind(this),
      error: function(model, response){
        $(".errors").empty();
        $(".errors").append(response.responseJSON);
      }
    });
  },

  addListView: function(list){
    var subview = new Trello.Views.List(
      {model: list}
    );
    this.addSubview('.lists', subview);
    this.$el.find(".new-list .list-name").val("");
  },

  removeListView: function(list){
    this.removeModelSubview('.lists', list)
  },

  handleStop: function(e){
    //issues with ordering
    var newPos = [];
    var listItems = $(e.currentTarget).children()
    for (var i = 0; i < listItems.length; i++) {
      var pos = $(listItems[i]).data("id");
      console.log(pos);
      newPos.push(pos);
    }

    var lists = this.model.lists();

    lists.each(function(list, idx){
      list.set("ord", idx);
      list.save();
    });

  }

});
