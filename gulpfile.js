var browserSync = require('browser-sync');
var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('compile-sass', function() {
    gulp.src('static/sass/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('static/css/'))
        .pipe(browserSync.stream());
});

gulp.task('compile-pug', function() {
    gulp.src('static/pug/**/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('public'))
        .pipe(browserSync.stream());
});


gulp.task('watch', function() {
    browserSync.init({
        notify: false,
        proxy: 'localhost:8000'
    });

    gulp.watch('static/sass/*.sass', ['compile-sass']);
    gulp.watch('static/js/**/*', browserSync.reload);
    gulp.watch('static/pug/**/*.pug', ['compile-pug']);
});

gulp.task('default', ['compile-sass', 'compile-pug']);
