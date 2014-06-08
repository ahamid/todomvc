var gulp = require('gulp');

var bower = require('gulp-bower');
var gulpBowerFiles = require('gulp-bower-files');
var print = require('gulp-print');

gulp.task('bower-install', function() {
  return bower();
});

gulp.task('bower', ['bower-install'], function() {
  return gulpBowerFiles().pipe(print())
                         .pipe(gulp.dest('bower_components'));
});

gulp.task('default', ['bower']);
