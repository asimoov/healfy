define([
  'jquery', 
  'underscore', 
  'backbone',
  'routes/patients'
], function($, _, Backbone, PatientsRoute) {
  "use strict";

  var initialize = function() {
    new PatientsRoute();
    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});