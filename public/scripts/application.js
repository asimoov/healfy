define([
  'jquery', 
  'underscore', 
  'backbone',
  'helpers/handlebars',
  'routes/patients'
], function($, _, Backbone, Helpers, PatientsRoute) {
  "use strict";

  var initialize = function() {
    Helpers.initialize();

    new PatientsRoute();
    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});