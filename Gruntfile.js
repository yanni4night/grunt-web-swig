/*
 * grunt-web-swig
 * https://github.com/yinyong/grunt-web-swig
 *
 * Copyright (c) 2014 yinyong
 * Licensed under the MIT license.
 */

'use strict';

var swig = require('swig');

module.exports = function(grunt) {

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        web_swig: {
            swig_relative: {
                options: {
                    getData: function(tpl) {
                        return {
                            tpl: tpl,
                            mark: 'mark'
                        };
                    }
                },
                expand: true,
                cwd: 'test/swig_relative',
                src: ['index.tpl', 'user.tpl'], //mutiple templates
                dest: 'tmp/swig_relative',
                ext: '.html'
            },
            swig_absolute: {
                options: {
                    swigOptions: {
                        loader: swig.loaders.fs(require('path').join(__dirname, 'test/swig_absolute/'))
                    },
                    ignorePrefix: 'test/swig_absolute/',
                    getData: {
                        'thing': 'swig for absolute path'
                    }
                },
                expand: true,
                cwd: 'test/swig_absolute/tpls',
                src: ['*.tpl'],
                dest: 'tmp/swig_absolute/',
                ext: '.html'
            },
            django_relative: {
                options: {
                    useDjango: true,
                    getData: {
                        names: ['Nick', 'Tim']
                    }
                },
                expand: true,
                cwd: 'test/django_relative',
                src: ['index.tpl'],
                dest: 'tmp/django_relative',
                ext: '.html'
            },
            django_absolute: {
                options: {
                    useDjango: true,
                    getData: {
                        names: ['Nick', 'Tim']
                    },
                    djangoOptions: {
                        template_dirs: 'test/django_absolute/'
                    },
                    ignorePrefix: 'test/django_absolute/'
                },
                expand: true,
                cwd: 'test/django_absolute',
                src: ['index.tpl'],
                dest: 'tmp/django_absolute',
                ext: '.html'
            },
            empty_tpl: {
                src: 'test/index.html',
                dest: 'tmp/absence.html'
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        },
        coveralls: {
            all: {
                src: 'coverage/lcov.info'
            }
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'web_swig', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};