'use strict';
const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');


var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

const paths = {
  styles: './src/styles/',
  html: './src/',
};

const pathsDist = {
  styles: './dist/styles/'
};
// gulp.task('sass', function () {
//   return gulp.src('app/scss/**/style.scss')
//     .pipe(sourcemaps.init())
//     .pipe(sass().on('error', sass.logError))
//     .pipe(autoprefixer())
//     .pipe(gulp.dest('app/css/'))
//     .pipe(rename('style.min.css'))
//     .pipe(cleanCSS({compatibility: 'ie8'}))
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest('app/css/'))
//     .pipe(browserSync.reload({
//       stream: true
//     }));
// });

// gulp.task('browserSync', function () {
//   browserSync({
//     server: {
//       baseDir: '.'
//     }
//   })
// });

// gulp.task('watch', function () {
//   gulp.watch('app/scss/**/*.scss', ['sass']);
//   gulp.watch('app/**/*.html', browserSync.reload);
//   gulp.watch('app/**/*.css', browserSync.reload);
//   gulp.watch('app/**/*.js', browserSync.reload);
// });

// gulp.task('default', ['watch', 'browserSync']);

/**
 * HTML
 * */
function buildHtml(cb) {
  return gulp
    .src([paths.html + 'index.html'])
    .pipe(fileinclude({
      prefix: '@@'
    }))
    .pipe(gulp.dest('./'));
}

function scssToCss(cb) {
  return gulp
    .src(paths.styles + 'main.scss')
    .pipe(sass())
    .pipe(gulp.dest(pathsDist.styles))
}

function browserSync(cb) {
  browsersync.init({
    server: {
      baseDir: '.',
    },
    port: 3000,
  });
  cb();
}

function watchFiles() {
  gulp.watch(paths.styles, scssToCss)
}

const dev = gulp.series(browserSync, scssToCss, watchFiles);

exports.default = dev;
exports.html = buildHtml;
