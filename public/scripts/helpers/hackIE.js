define([
  'jquery'
], function($) {
	"use strict";

	var initialize = function() {
		if(!!navigator.userAgent.match(/Internet Explorer/i)) {
			$.ajaxSetup({cache:false});
		} else {
			$.ajaxSetup({cache:true, disableCaching: false});
		}
	};

	return {
		initialize: initialize
	};
});