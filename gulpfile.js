var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// tasks
gulp.task('js-build', function () {
	return gulp.src('./build/jquery.equalize.js')
			  .pipe(uglify())
			  .pipe(rename({extname: '.min.js'}))
           .pipe(gulp.dest('./build'));
});

// default tasks
gulp.task('default', function () {
	gulp.start('js-build');
});

// watch
gulp.watch('./build/*', function () {
	gulp.start('js-build');
});