/*
 * grunt-web-swig
 * https://github.com/yanni4night/grunt-web-swig
 *
 * Copyright (c) 2014 yinyong
 * Licensed under the MIT license.
 */

'use strict';
var swig = require('swig');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('web_swig', 'Compile swig templates and json to htmls', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      swigOptions: {}
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var srcContent, src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      if (!src.length) {
        grunt.log.warn('No src found');
        return;
      }

      srcContent = grunt.file.read(src[0]);

      swig.renderFile(src[0]);

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};