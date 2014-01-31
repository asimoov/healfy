module.exports = function (grunt) {
	"use strict";

	// load jshint plugin
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-mocha-test');

	grunt.initConfig({
		jshint: {
			backend: {
				options: {
					node: true
				},
				src: [
					'Gruntfile.js',
					'app.js',
					'apps/**/*.js'
				]
			},
			frontend: {
				options: {
					node: true,
					ignores: ['public/scripts/vendors/*.js']
				},
				src: ['public/scripts/**/*.js']
			}
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
			frontend: {
				files: ['public/scripts/**/*.js'],
				tasks: ['jshint:frontend']
			},
			backend: {
				files: ['app.js', 'apps/**/*.js'],
				tasks: ['jshint:backend', 'express:dev']
			},
			options: {
				spawn: false,
			}
		},
		mochaTest: {
			test: {
				options: {
					reporter: 'spec'
				},
				src: ['test/**/*.js']
			}
		}
	});

	grunt.registerTask('server', [ 'jshint', 'less', 'express', 'watch' ]);
	grunt.registerTask('test', ['mochaTest']);
};