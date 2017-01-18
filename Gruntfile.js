module.exports = function (grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.loadNpmTasks('grunt-coffeescript-concat')

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		coffee: {
			dist: {
				options: {
					bare: true
				},
				files:{
					'source/examples/vanilla.js': 'source/examples/coffees/vanilla.coffee'
				}
			}
		},
		watch: {
			js: {
				files: ['source/**/*.coffee'],
				tasks: ['coffee'],
				options: {
					reload: true
				}
			}
		}
	});

	grunt.registerTask(
		'dev', [
			'coffee',
			'watch'
		]
	);
	grunt.registerTask('default', 'coffee');
};