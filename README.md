# grunt-web-swig

> Compile swig/django templates and json to htmls
> 
> [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Build status][appveyor-image]][appveyor-url] [![Dependency status][david-dm-image]][david-dm-url] [![De vDependency status][david-dm-dev-image]][david-dm-dev-url] [![Built with Grunt][grunt-image]][grunt-url]

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-web-swig --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-web-swig');
```

## The "web_swig" task

### Overview
In your project's Gruntfile, add a section named `web_swig` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  web_swig: {
    options: {
      swigOptions:{
        cache: false
      },
      getData: function(tpl){
          return {title: 'grunt-web-swig'};
      }
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.swigOptions
Type: `Object`
Default value: `{cache: false}`

see <http://paularmstrong.github.io/swig/docs/api/#SwigOpts>.

#### options.getData
Type: `Function` or `Object`
Default value: `function(tpl){return {};}`

Mock data for each source template file.

#### options.useDjango
Type: `Boolean`
Default value: `false`

Use [Django](https://www.djangoproject.com/)'s template syntax.Note you have to follow some instructions about python env,see <https://www.npmjs.org/package/django#install>.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
 - 2014-11-06[11:29:58]:support [swig](http://paularmstrong.github.io/swig/)

[npm-url]: https://npmjs.org/package/grunt-web-swig
[downloads-image]: http://img.shields.io/npm/dm/grunt-web-swig.svg
[npm-image]: http://img.shields.io/npm/v/grunt-web-swig.svg
[travis-url]: https://travis-ci.org/yanni4night/grunt-web-swig
[travis-image]: http://img.shields.io/travis/yanni4night/grunt-web-swig.svg
[appveyor-image]:https://ci.appveyor.com/api/projects/status/ugbx6yhpa0hxcfgy?svg=true
[appveyor-url]:https://ci.appveyor.com/project/yanni4night/grunt-web-swig
[david-dm-url]:https://david-dm.org/yanni4night/grunt-web-swig
[david-dm-image]:https://david-dm.org/yanni4night/grunt-web-swig.svg
[david-dm-dev-url]:https://david-dm.org/yanni4night/grunt-web-swig#info=devDependencies
[david-dm-dev-image]:https://david-dm.org/yanni4night/grunt-web-swig/dev-status.svg
[grunt-url]:http://gruntjs.com/
[grunt-image]: https://cdn.gruntjs.com/builtwith.png
