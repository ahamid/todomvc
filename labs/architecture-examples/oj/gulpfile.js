var gulp = require('gulp');

var bower = require('gulp-bower');
var gulpBowerFiles = require('gulp-bower-files');
var print = require('gulp-print');
var colors = require('colors');

gulp.task('bower-install', function() {
  return bower();
});

gulp.task('bower', ['bower-install'], function() {
  return gulpBowerFiles()
           .pipe(gulp.dest('bower_components'))
           .pipe(print(function (filepath) {
             var plain_filepath = colors.stripColors(filepath);
             if (/.*\.js$/i.test(plain_filepath)) {
               return '<script src="' + plain_filepath + '"></script>';
             } else {
               return '';
             }
           }));
});

gulp.task('default', ['bower']);

if (/.*\.js$/i.test("foo.js")) console.log("YES");
