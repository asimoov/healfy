module.exports = function (grunt) {
	"use strict";

	// load jshint plugin
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-shell');

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
			scripts: {
				files: ['app.js', 'apps/**/*.js', 'public/scripts/**/*.js'],
				tasks: ['jshint:frontend',, 'jshint:backend', 'express:dev']
			}
		},
		shell: {
			migrate: {
				options: {
					stdout: true
				},
				command: './node_modules/sequelize/bin/sequelize --migrate'
			}
		}
	});

	grunt.registerTask('server', [ 'jshint', 'less', 'express:dev', 'watch' ]);
};