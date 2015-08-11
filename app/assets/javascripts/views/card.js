Trello.Views.Card = Backbone.View.extend({
  template: JST['card'],
  className: "card sortable",

  render: function(){
    this.$el.html(this.template({card: this.model}));
    return this;
  }
});
