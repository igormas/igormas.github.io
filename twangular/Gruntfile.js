module.exports = function(grunt) {
    'use strict';
    var app = 'app';

    var scssSrc = app + '/scss';
    var cssSrc = app + '/css';

    var jsSrc = app + '/scripts';
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: [jsSrc + '/**/*.js']
        },
        sass:{
            dist: {
                files: [{
                    expand: true,
                    cwd: scssSrc,
                    src: '**/*.scss',
                    dest: cssSrc,
                    ext: '.css'
                }]
            }
        },
        watch:{
            all:{
                files:[jsSrc + '/**/*.js','app/scss/**/*.scss'],
                tasks: ['jshint','sass']
            }
        },
        // Project configuration.
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '',
                    keepalive: true
                }
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default',['jshint','bower','copy:dev','copy:css','sass']);
};
