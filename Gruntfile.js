'use strict';

module.exports = function (grunt) {

	// load jshint plugin
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-contrib-watch');

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
		},
		less: {
			development: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2
				},
				files: {
					// target.css file: source.less file
					"public/stylesheets/style.css": "public/stylesheets/style.less"
				}
			}
		},
	},
	// running `grunt watch` will watch for changes
	watch: {
		stylesheets: {
			files: "public/stylesheets/*.less",
			tasks: ["less"]
		},
		javascript: {
		    files: ['apps/**/*.js'],
		    tasks: ['jshint'],
		    options: {
		      spawn: false,
		    }
		}
	});
};