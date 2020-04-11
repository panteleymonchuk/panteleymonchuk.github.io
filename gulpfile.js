'use strict';
const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');
const ttf2woff2 = require('gulp-ttf2woff2');
const ttf2woff = require('gulp-ttf2woff');
const ttf2eot = require('gulp-ttf2eot');


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
function buildHtml() {
  return gulp
    .src([paths.html + '*.html'])
    .pipe(fileinclude({
      prefix: '@@'
    }))
    .pipe(gulp.dest('./'));
}

/**
 * CSS
 * */
function scssToCss() {
  return gulp
    .src(paths.styles + '*.scss')
    .pipe(sass())
    .pipe(gulp.dest(pathsDist.styles))
}

/**
 * Fonts
 * */
function convertTtf2Woff2 () {
  return gulp
    .src("./src/fonts/**/*.ttf")
    .pipe(ttf2woff2())
    .pipe(gulp.dest('./dist/fonts/'))
}
function convertTtf2Woff () {
  return gulp
    .src("./src/fonts/**/*.ttf")
    .pipe(ttf2woff())
    .pipe(gulp.dest('./dist/fonts/'))
}
function convertTtf2Eot () {
  return gulp
    .src("./src/fonts/**/*.ttf")
    .pipe(ttf2eot())
    .pipe(gulp.dest('./dist/fonts/'))
}
function fontGen() {
  return gulp.series([convertTtf2Woff2, convertTtf2Woff, convertTtf2Eot]);
}


/**
 * Local server
 * */
function browserSync(cb) {
  browsersync.init({
    server: {
      baseDir: '.',
    },
    port: 3000,
  });
  cb();
}

/**
 * Watcher
 * */
function watchFiles() {
  gulp.watch(paths.styles + '**/*.scss', scssToCss);
  gulp.watch(paths.html + '**/*.html', buildHtml);
  gulp.watch(pathsDist.styles + '*.css').on('change', browsersync.reload);
  gulp.watch('./*.html').on('change', browsersync.reload);
}

const build = gulp.series(buildHtml, scssToCss);
const dev = gulp.series(build, browserSync, watchFiles);

exports.default = dev;
exports.build = build;
exports.fontGen = fontGen;
