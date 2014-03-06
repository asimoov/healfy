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
  'views/layout'
], function($, Mask, Bootstrap, _, Backbone, HackIEHelper, HandlebarsHelper, ToastrHelper, Datepicker, AgendasRoute, HomeRoute, PatientsRoute, Layout) {
  "use strict";

  var initialize = function() {
    HackIEHelper.initialize();
    HandlebarsHelper.initialize();
    ToastrHelper.initialize();
    Datepicker.initialize();

    var layout = new Layout();
    layout.render()
    $('body').empty().append(layout.$el);
    
    new HomeRoute();
    new AgendasRoute();
    new PatientsRoute();

    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});
