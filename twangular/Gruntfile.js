module.exports = function(grunt) {
    'use strict';

    var gruntTargetPath = 'target/grunt/';
    //bower target dir path
    var bowerTargetPath = gruntTargetPath + '/bower/';
    //scripts folder path
    var jsSourcePath = 'src/main/scripts';
    var jsTargetPath = gruntTargetPath + 'scripts/';
    //scss
    var scssSourcePath = 'src/main/scss/skins/'; //@todo skin selection
    var cssTargetPath = gruntTargetPath + 'styles/css/'; //@todo skin selection
    //css files path
    var cssPath = 'src/main/css';

    var jbossConfig = {};
    if(grunt.file.exists('.jbossConfig.json')){
        jbossConfig = grunt.file.readJSON('.jbossConfig.json');
    }


    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['Gruntfile.js', 'src/main/scripts/**/*.js','!src/main/scripts/vendor/**/*.js']
        },
        bower:{
            install:{
                options:{
                    targetDir: bowerTargetPath,
                    layout: 'byComponent',
                    cleanBowerDir: true
                }
            }
        },
        copy: {
            dev:{
                files: [
                    {
                        expand: true,
                        cwd: jsSourcePath,
                        src: '**/*.js',
                        dest: jsTargetPath
                    }
                ]
            },
            css:{
                files: [
                    {
                        expand: true,
                        cwd: cssPath,
                        src: '**/*.css',
                        dest: cssTargetPath
                    }
                ]
            },
            refresh:{
                files: [
                    {
                        expand: true,
                        cwd: gruntTargetPath,
                        src: '**/*',
                        dest: jbossConfig.jbossDep
                        //dest: 'D:/jboss-steam/standalone/deployments/steam-server.war'
                    },
                    {
                        expand: true,
                        cwd: 'src/main/webapp',
                        src: '**/*',
                        dest: jbossConfig.jbossDep
                        //dest: 'D:/jboss-steam/standalone/deployments/steam-server.war'
                    }
                ]
            }
        },
        sass:{
            dist: {
                files: [{
                    expand: true,
                    cwd: scssSourcePath,
                    src: '**/*.scss',
                    dest: cssTargetPath,
                    ext: '.css'
                }]
            }
        },
        uglify: {
            options:{
                compress: {
                    drop_console: true
                }
            },
            prod: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/main/scripts',
                        src: '**/*.js',
                        dest: jsTargetPath,
                        ext: '.js'
                    }
                ]
            }
        },
        watch:{
            all:{
                files:['src/main/scripts/**/*.js','src/main/scss/**/*.scss','src/main/webapp/**/*.html'],
                tasks: ['eclipseDev']
            }
        }
    });


    // Load plugins.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //dev Task
    grunt.registerTask('dev', ['jshint','bower','copy:dev','copy:css','sass']);

    //prod task
    grunt.registerTask('prod', ['bower','uglify','copy:css','sass']);

    //dev eclipse task
    grunt.registerTask('eclipseDev', ['jshint','copy:dev','copy:css','sass','copy:refresh']);

    // Default task(s).
    grunt.registerTask('default',['jshint','bower','copy:dev','copy:css','sass']);
};
