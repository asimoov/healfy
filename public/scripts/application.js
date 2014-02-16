define([
'jquery', 
  'underscore', 
  'backbone',
  'helpers/handlebars',
  'routes/agendas',
  'routes/home',
  'routes/patients',
], function($, _, Backbone, Helpers, AgendasRoute, HomeRoute, PatientsRoute) {
  "use strict";

  var initialize = function() {
    Helpers.initialize();

    new HomeRoute();
    new AgendasRoute();
    new PatientsRoute();
    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});