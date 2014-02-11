/**
 * Created by tetran on 2014/02/11.
 */
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'site/js/app.js',
                dest: 'site/build/app.min.js'
            }
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'site/js/collections/*.js',
                'site/js/models/*.js',
                'site/js/views/*.js',
                'site/js/app.js'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint', 'uglify']);
};
