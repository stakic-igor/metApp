'use strict';
var gulp = require('gulp');
var config = require('./gulp.config')();
var runSequence = require('run-sequence');
var sourcemap = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');


gulp.task('default', function(callback) {
    runSequence(['styles', 'watch'],
        callback
    );
});


gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sourcemap.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(sourcemap.write('map/'))
    .pipe(gulp.dest('app/css'))
});

gulp.task('autoprefixer', function() {
  return gulp.src('app/css/base.css')
    .pipe(autoprefixer ({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('app/css'))
});

gulp.task('watch', function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
});
