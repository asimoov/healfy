define([
  'jquery',
  'underscore', 
  'backbone',
  'helpers/hackIE',
  'helpers/dust',
  'helpers/handlebars',
  'helpers/toastr',
  'helpers/datepicker',
  'routes/agendas',
  'routes/home',
  'routes/patients',
  'routes/providers',
  'views/layout'
], function($, _, Backbone, HackIEHelper, DustHelper, HandlebarsHelper, ToastrHelper, Datepicker, AgendasRoute, HomeRoute, PatientsRoute, ProvidersRoute, Layout) {
  "use strict";

  var initialize = function() {
    HackIEHelper.initialize();
    DustHelper.initialize();
    HandlebarsHelper.initialize();
    ToastrHelper.initialize();
    Datepicker.initialize();

    var layout = new Layout({el: $('body')});
    layout.render();
    
    new HomeRoute();
    new AgendasRoute();
    new PatientsRoute();
    new ProvidersRoute();

    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});
