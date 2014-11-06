/*
 * grunt-web-swig
 * https://github.com/yinyong/grunt-web-swig
 *
 * Copyright (c) 2014 yinyong
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

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
      compile: {
        options: {
          getData: function(tpl) {
            return {
              tpl: tpl
            };
          }
        },
        expand: true,
        cwd: 'test/fixtures',
        src: ['index.tpl'],
        dest: 'tmp',
        ext: '.html'
      },
      mock: {
        options: {
          getData: {
            mock: 'mark'
          }
        },
        expand: true,
        cwd: 'test/fixtures',
        src: ['mock.tpl'],
        dest: 'tmp',
        ext: '.html'
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'web_swig', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};