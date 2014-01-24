define([
  'jquery', 
  'underscore', 
  'backbone',
  'collections/patients',
  'views/patients/list'
], function($, _, Backbone, Patients, ListView) {
  "use strict";
  
  var initialize = function() {
    var collection = new Patients();
    collection.fetch({reset :true});

    var listView = new ListView({collection: collection});
    listView.render();
    $("body").append(listView.$el);
  };
  
  return {
    initialize: initialize
  };
});