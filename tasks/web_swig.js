/*
 * grunt-web-swig
 * https://github.com/yanni4night/grunt-web-swig
 *
 * Copyright (c) 2014 yanni4night
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
      swigOptions: {
        cache: false
      },
      getData: function(file) {
        return {};
      }
    });

    //Set swig options
    swig.setDefaults(options.swigOptions);

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var mock, srcContent, src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      if (!src.length) {
        grunt.log.warn('Source file not found.');
        return;
      } else if (src.length > 1) {
        grunt.log.warn('Only the first source file will be compiled.');
      }

      mock = 'function' === typeof options.getData ? options.getData(src[0]) : (options.getData || {});
      // Write the destination file.
      grunt.file.write(f.dest, swig.renderFile(src[0], mock));

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};