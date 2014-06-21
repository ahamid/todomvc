var gulp = require('gulp');

var bower = require('gulp-bower');
var gulpBowerFiles = require('gulp-bower-files');
var print = require('gulp-print');
var inject = require('gulp-inject');
var jshint = require('gulp-jshint');
var bowerdeps = require("wiredep").stream;
var bowerdepTestOpts = { exclude: ['require','fontawesome'], devDependencies: true };

var paths = {
  rootDir: '.',
  testDir: 'test/'
}

var files = {
  index: 'index.html',
  testIndex: paths.testDir + 'index.html',
  src: [ 'js/**/*.js', '!js/bb/**' ]
};

gulp.task('bower-install', function() {
  return bower();
});

gulp.task('generate', function() {

  gulp.src(files.index)
    .pipe(inject(gulp.src(files.src, {read:false}), { addRootSlash: false }))
    .pipe(bowerdeps({ exclude: ['require', 'fontawesome' ]}))
    .pipe(gulp.dest(paths.rootDir));

  gulp.src(files.testIndex)
    .pipe(inject(gulp.src(files.src.concat([ '!js/app.js' ]).concat(['test/**/*.js', '!test/mocha.js']), {read:false}), { addRootSlash: false, addPrefix: '..' }))
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

gulp.task('lint', function() {
  return gulp.src(files.src)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('default', ['generate']);
