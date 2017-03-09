var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var karma = require('karma');

plugins.karma = karma;

gulp.task('chrome',function(){
    var srvInst = new plugins.karma.Server({
        configFile: __dirname + '/default.karma.conf',
        browsers:['Chrome']
    }, null);

    return srvInst.start();
});

gulp.task('phantom',function(){
    var srvInst = new plugins.karma.Server({
        configFile: __dirname + '/default.karma.conf',
        browsers:['PhantomJS']
    }, null);

    return srvInst.start();
});

gulp.task('webdriver-start', function(){
    return plugins.shell.task('webdriver-manager start');
});

gulp.task('protractor', ['webdriver-start'], function(){
    return plugins.shell.task('webdriver-manager start');
});

gulp.task('phantom-test',['phantom']);
gulp.task('chrome-test',['chrome']);
