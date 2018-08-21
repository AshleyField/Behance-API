'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var minify = require('gulp-minifier');
var replaceName = require('gulp-replace-name');
 
gulp.task('sass', function () {
  return gulp.src('./scss/**/*.scss')
	.pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer({
	    browsers: ['last 2 versions'],
	    cascade: false
	}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('minifyJS', function() {
  return gulp.src('./scripts/scripts.js').pipe(minify({
    minify: true,
    minifyJS: {
      sourceMap: true
    },
    getKeptComment: function (content, filePath) {
        var m = content.match(/\/\*![\s\S]*?\*\//img);
        return m && m.join('\n') + '\n' || '';
    }
  })).pipe(gulp.dest('./scripts/minified-scripts'));
});

gulp.task('replaceNameJS', function() {
  return gulp.src('./scripts/minified-scripts/scripts.js')
    .pipe(replaceName(/\.js/g, '.min.js'))
    .pipe(gulp.dest('./minified'));
});
 
gulp.task('sass:watch', function() {

	browserSync.init({
	    server: "."
	});

	gulp.watch('./scss/**/*.scss', gulp.series('sass'));


   gulp.watch(".").on('change', browserSync.reload);
  gulp.watch('./scripts/scripts.js', gulp.series('minifyJS'));
  gulp.watch('./scripts/minified-scripts/scripts.js', gulp.series('replaceNameJS'));
});


