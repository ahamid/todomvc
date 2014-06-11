var gulp = require('gulp');

var bower = require('gulp-bower');
var gulpBowerFiles = require('gulp-bower-files');
var print = require('gulp-print');
var inject = require('gulp-inject');
var bowerdeps = require("wiredep").stream;
var bowerdepTestOpts = { exclude: ['require'], devDependencies: true };


var paths = {
  testDir: 'test/'
}

var files = {
  index: 'index.html',
  testIndex: paths.testDir + 'index.html',
  src: [ 'js/*.js', 'js/models/*.js' ]
};

gulp.task('bower-install', function() {
  return bower();
});

gulp.task('bower', ['bower-install'], function() {
  gulp.src(files.testIndex)
    .pipe(inject(gulp.src(files.src.concat([ '!js/app.js' ]), {read:false}), { addRootSlash: false, addPrefix: '..' }))
    .pipe(bowerdeps(bowerdepTestOpts))
    .pipe(gulp.dest(paths.testDir));
    //.pipe(gulp.dest('./dest'))
/*  return gulpBowerFiles()
           .pipe(gulp.dest('bower_components'))
           .pipe(print({
             colors: false,
             format: function (filepath) {
               if (/.*\.js$/i.test(filepath)) {
                 return '<script src="' + filepath + '"></script>';
               } else {
                 return '';
               }
             }
           }));
*/
});

gulp.task('default', ['bower']);
