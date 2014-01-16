module.exports = function (grunt) {
	"use strict";

	// load jshint plugin
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-express-server');
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
		express: {
			dev: {
				options: {
					script: './app.js'
				}
			}
		},
		watch: {
			stylesheets: {
				files: "public/stylesheets/*.less",
				tasks: ["less"]
			},
			javascript: {
				files: ['app.js', 'apps/**/*.js'],
				tasks: ['jshint:all', 'express:dev'],
				options: {
					spawn: false,
				}
			}
		}
	});

	grunt.registerTask('server', [ 'jshint', 'less', 'express:dev', 'watch' ]);
};