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
    swig: function(test) {

        var actual = grunt.file.read('tmp/swig/index.html');
        var actualmock = grunt.file.read('tmp/swig/mock.html');
        test.ok(!!~actual.indexOf('TITLE'), 'should get "TITLE"');
        test.ok(!!~actualmock.indexOf('mark'), 'should get "mark"');
        test.ok(!!~actual.indexOf('test/swig/index.tpl'),
            'should get path');

        test.done();
    }
};
