'use strict';

var grunt = require('grunt');
/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.web_swig = {
    setUp: function(done) {
        // setup here if necessary
        done();
    },
    swig_relative: function(test) {

        var actual = grunt.file.read('tmp/swig_relative/index.html');
        var actualmock = grunt.file.read('tmp/swig_relative/user.html');
        test.ok(!!~actual.indexOf('TITLE'), 'should get "TITLE"');
        test.ok(!!~actualmock.indexOf('mark'), 'should get "mark"');
        test.ok(!!~actual.indexOf('test/swig_relative/index.tpl'),
            'should get path');

        test.done();
    },
    swig_absolute: function(test) {
        var actual = grunt.file.read('tmp/swig_absolute/index.html');
        var actualmock = grunt.file.read('tmp/swig_absolute/mock.html');
        test.ok(!!~actual.indexOf('absolute'), 'should get "absolute"');
        test.ok(!!~actualmock.indexOf('swig'), 'should get "swig"');

        test.done();
    },
    django_relative: function(test) {
        var actual = grunt.file.read('tmp/django_relative/index.html');
        test.ok(!!~actual.indexOf('focus'), 'should @include sub');
        test.ok(!!~actual.indexOf('Nick|Tim'), 'should filter a list');
        test.done();
    },
    django_absolute: function(test) {
        var actual = grunt.file.read('tmp/django_absolute/index.html');
        test.ok(!!~actual.indexOf('focus'), 'should @include sub');
        test.ok(!!~actual.indexOf('Nick|Tim'), 'should filter a list');
        test.done();
    }
};