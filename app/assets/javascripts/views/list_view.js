Trello.Views.List = Backbone.CompositeView.extend({
  template: JST['list'],
  className: "list sortable",

  events: {
    "submit .new-card": "addCard",
  },

  render: function(){
    this.$el.html(this.template({list: this.model}));
    return this;
  },

  initialize: function(){
    this.$el.attr("data-id", this.model.id);
    this.listenTo(this.model, "sync", this.render);

    var cards = this.model.cards();
    this.listenTo(cards, "add", this.addCardView);

    cards.each(function(card){
      this.addCardView(card);
    }.bind(this));


    this.listenTo(cards, "remove", this.removeCardView);
  },

  addCard: function(e){
    e.preventDefault();
    var formData = $(e.currentTarget).serializeJSON();
    var list_id = $(e.currentTarget).data("list-id");
    var newCard = new Trello.Models.Card({ list_id: list_id} );
    newCard.save(formData, {
      success: function(model){
        this.model.cards().add(model);
        Backbone.history.navigate("#/board/" + this.model.id, {trigger: true});
      }.bind(this),
      error: function(model, response){
        $(".errors").empty();
        $(".errors").append(response.responseJSON);
      }
    });
  },

  addCardView: function(card){
    var subview = new Trello.Views.Card(
      {model: card}
    );
    this.addSubview('.cards', subview);
    this.$el.find(".new-card .card-title").val("");
  },

  removeCardView: function(card){
    this.removeModelSubview('.cards', card);
  },

});
