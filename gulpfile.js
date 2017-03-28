"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var mqpacker = require('css-mqpacker');
var minify = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var run = require('run-sequence');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('style', function() {
  gulp.src('sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        'last 2 versions'
      ]}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('scripts', function() {
  return gulp.src('build/js/**.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

gulp.task('images', function() {
  return gulp.src('build/img/**/*.{png,jpg,gif}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest('build/img'));
});

gulp.task('symbols', function() {
  return gulp.src('build/img/icons/*.svg')
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('symbols.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('clean', function() {
  return del('build');
});

gulp.task('clean-js', function() {
  return del(['build/js/*.js', '!build/js/app.js', '!build/js/app.min.js', '!build/js/pixel-glass.js']);
});

gulp.task('copy', function() {
  return gulp.src([
    'fonts/**/*.{woff,woff2}',
    'img/**',
    'js/**',
    '*.html'
  ], {
    base: '.'
  })
  .pipe(gulp.dest('build'));
});

gulp.task('html:copy', function() {
  return gulp.src('*.html')
    .pipe(gulp.dest('build'));
});

gulp.task('html:update', ['html:copy'], function(done) {
  server.reload();
  done();
});

gulp.task('serve', function() {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('sass/**/*.{scss,sass}', ['style']);
  gulp.watch('*.html', ['html:update']);
});

gulp.task('build', function(fn) {
  run(
    'clean',
    'copy',
    'style',
    'scripts',
    'clean-js',
    'images',
    'symbols',
    fn);
});

// Special tasks for develop. Add pixel glass file to build
// Windows not allow use multiple command (&& - doesn't work)
// And I wont use pixel-glass.
// todo remove pixel-glass before sending to final check
gulp.task('copy-pixel-js', function() {
  return gulp.src([
    'node_modules/pixel-glass/script.js'
  ])
    .pipe(rename('pixel-glass.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('copy-pixel-css', function() {
  return gulp.src([
    'node_modules/pixel-glass/styles.css'
  ])
    .pipe(rename('pixel-glass.css'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('dev', function(fn) {
  run(
    'clean',
    'copy',
    'copy-pixel-js',
    'copy-pixel-css',
    'style',
    'scripts',
    'clean-js',
    'images',
    'symbols',
    fn);
});

