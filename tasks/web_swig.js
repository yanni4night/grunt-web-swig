/*
 * grunt-web-swig
 * https://github.com/yanni4night/grunt-web-swig
 *
 * Copyright (c) 2014 yanni4night
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    grunt.registerMultiTask('web_swig',
        'Compile swig/django templates and json to htmls',
        function() {
            // Merge task-specific and/or target-specific options with these defaults.
            var options = this.options({
                swigOptions: {
                    cache: false
                },
                getData: function(file) {
                    return {};
                },
                useDjango: false
            });

            var engine = options.useDjango ? require('django') :
                require('swig');

            if (options.useDjango) {
                var done = this.async();
            } else {
                engine.setDefaults(options.swigOptions);
            }

            // Iterate over all specified file groups.
            this.files.forEach(function(f) {
                // Concat specified files.
                var mock, srcContent, src = f.src.filter(
                    function(filepath) {
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

                mock = 'function' === typeof options.getData ?
                    options.getData(src[0]) : (options.getData || {});
                // Write the destination file.
                if (options.useDjango) {
                    engine.renderFile(src[0], mock, function(err, content) {
                        if (err) {
                            throw err;
                        }
                        grunt.file.write(f.dest, content);
                        grunt.log.writeln('File "' + f.dest + '" created.');
                        done();
                    });
                } else {
                    grunt.file.write(f.dest, engine.renderFile(src[0], mock));
                    grunt.log.writeln('File "' + f.dest + '" created.');
                }

            });
        });

};