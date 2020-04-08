'use strict';
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');


gulp.task('sass', function () {
  return gulp.src('app/scss/**/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('app/css/'))
    .pipe(rename('style.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app/css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })
});

gulp.task('watch', function () {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/**/*.html', browserSync.reload);
  gulp.watch('app/**/*.css', browserSync.reload);
  gulp.watch('app/**/*.js', browserSync.reload);
});

gulp.task('default', ['watch', 'browserSync']);
