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
                djangoOptions: {
                    //template_dirs:''
                },
                getData: function(file) {
                    return {};
                },
                //ignorePrefix:,//Django cannot identify relative path
                useDjango: false
            });

            var done, engine = options.useDjango ? require('django') :
                require('swig');

            if (options.useDjango) {
                done = this.async();
                engine.configure(options.djangoOptions || {});
            } else {
                engine.setDefaults(options.swigOptions || {});
            }

            if (!this.files.length && done) {
                grunt.log.warn('No file input');
                return done();
            }

            var doneCnt = 0;

            var doneOne = function() {
                if (this.files.length === ++doneCnt && done) {
                    done();
                }
            }.bind(this);

            // Iterate over all specified file groups.
            this.files.forEach(function(f) {
                // Concat specified files.
                var mock, sourceFile, srcContent, src = f.src.filter(
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
                    //Fixed hang up if no source files.
                    if (done) {
                        doneOne();
                    }
                    return;
                } else if (src.length > 1) {
                    grunt.log.warn('Only the first source file will be compiled.');
                }

                sourceFile = src[0];

                if (options.ignorePrefix) {
                    sourceFile = sourceFile.replace(options.ignorePrefix, '').replace(/^\/+/, '');
                }

                mock = 'function' === typeof options.getData ?
                    options.getData(sourceFile) : (options.getData || {});
                // Write the destination file.
                if (options.useDjango) {
                    engine.renderFile(sourceFile, mock, function(err, content) {
                        if (err) {
                            throw err;
                        }
                        grunt.file.write(f.dest, content);
                        grunt.log.writeln('File "' + f.dest + '" created.');
                        doneOne();
                    });
                } else {
                    grunt.file.write(f.dest, engine.renderFile(src[0], mock));
                    grunt.log.writeln('File "' + f.dest + '" created.');
                }

            });
        });

};