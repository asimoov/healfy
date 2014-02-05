define([
  'jquery', 
  'underscore', 
  'backbone',
  'helpers/handlebars',
  'routes/patients',
  'routes/agendas'
], function($, _, Backbone, Helpers, PatientsRoute, AgendasRoute) {
  "use strict";

  var initialize = function() {
    Helpers.initialize();

    new AgendasRoute();
    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});