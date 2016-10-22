var browserSync = require('browser-sync');
var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var pump = require('pump');

gulp.task('compile-sass', function() {
    gulp.src('src/sass/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/css/'))
        .pipe(browserSync.stream());
});

gulp.task('compile-pug', function() {
    gulp.src('src/pug/**/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('public'))
        .pipe(browserSync.stream());
});

gulp.task('sync-javascript', function(cb) {
        pump([
            gulp.src('src/js/**/*.js'),
            uglify(),
            gulp.dest('public/js/'),
            browserSync.stream()
        ],
        cb
    );
});

gulp.task('watch', function() {
    browserSync.init({
        notify: false,
        proxy: 'localhost:8000'
    });

    gulp.watch('src/sass/**/*.sass', ['compile-sass']);
    gulp.watch('src/js/**/*.js', ['sync-javascript']);
    gulp.watch('src/pug/**/*.pug', ['compile-pug']);
});

gulp.task('default', ['compile-sass', 'compile-pug', 'sync-javascript']);
