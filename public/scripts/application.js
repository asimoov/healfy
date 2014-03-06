define([
  'jqueryUI',
  'jqueryMaskedInput',
  'bootstrap',
  'underscore', 
  'backbone',
  'helpers/hackIE',
  'helpers/handlebars',
  'helpers/toastr',
  'helpers/datepicker',
  'routes/agendas',
  'routes/home',
  'routes/patients',
], function($, Mask, Bootstrap, _, Backbone, HackIEHelper, HandlebarsHelper, ToastrHelper, Datepicker, AgendasRoute, HomeRoute, PatientsRoute) {
  "use strict";

  var initialize = function() {
    HackIEHelper.initialize();
    HandlebarsHelper.initialize();
    ToastrHelper.initialize();
    Datepicker.initialize();

    new HomeRoute();
    new AgendasRoute();
    new PatientsRoute();

    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});
