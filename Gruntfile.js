'use strict';

module.exports = function (grunt) {

	// load jshint plugin
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.initConfig({
		options: {
			node: true
		},
		jshint: {
			all: [
				'Gruntfile.js',
				'app.js',
				'apps/**/*.js'
			]
		}
	});
};