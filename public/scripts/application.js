define([
  'jquery', 
  'underscore', 
  'backbone',
  'helpers/hackIE',
  'helpers/handlebars',
  'helpers/toastr',
  'routes/agendas',
  'routes/home',
  'routes/patients',
], function($, _, Backbone, HackIEHelper, HandlebarsHelper, ToastrHelper, AgendasRoute, HomeRoute, PatientsRoute) {
  "use strict";

  var initialize = function() {
    HackIEHelper.initialize();
    HandlebarsHelper.initialize();
    ToastrHelper.initialize();

    new HomeRoute();
    new AgendasRoute();
    new PatientsRoute();
    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});
