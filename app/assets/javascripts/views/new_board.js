Trello.Views.NewBoard = Backbone.View.extend({
  template: JST['new_board'],

  events: {
    "submit form": "submitForm"
  },

  render: function(){
    this.$el.html(this.template());
    return this;
  },

  submitForm: function(e){
    e.preventDefault();
    var formData = $(e.currentTarget).serializeJSON();
    this.model.save(formData, {
      success: function(model){
        this.collection.add(model);
        Backbone.history.navigate("/boards/" + model.id, {trigger: true});
      }.bind(this),
      error: function(model, response){
        $(".errors").empty();
        $(".errors").append(response.responseJSON);
      }.bind(this)
    });
  }
});
