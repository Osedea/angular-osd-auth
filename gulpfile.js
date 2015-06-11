'use strict';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    ngAnnotate = require('gulp-ng-annotate'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    karma = require('karma').server,
    babel = require('gulp-babel');

var paths = {
    js: [
        'src/**/*.js',
    ]
};

gulp.task('default', ['watch']);

gulp.task('build', ['js']);

gulp.task('js', function () {
    return gulp.src(paths.js)
        .pipe(concat('angular-osd-auth.js'))
        .pipe(gulp.dest('./'))
        .pipe(babel())
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('./'))
        .on('error', gutil.log);
});

gulp.task('watch', ['build'], function () {
    gulp.watch(paths.js, ['js', 'test']);
});

gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});
