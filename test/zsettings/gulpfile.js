var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var karma = require('karma');

plugins.karma = karma;

// function getTask(task, params) {
//     return require('../karma-gulp/' + task)(gulp, plugins);//, config, params);
// }

// gulp.task('chrome-watch',getTask('chrome/chrome-watch.gulp'));
// gulp.task('chrome-blind',getTask('chrome/chrome-blind.gulp'));
gulp.task('chrome',function(){
  var srvInst = new plugins.karma.Server({
        configFile: __dirname + "/default.karma.conf",
        browsers:["Chrome"]
      }, null);

  return srvInst.start();
});

gulp.task('phantom',function(){
  var srvInst = new plugins.karma.Server({
        configFile: __dirname + "/default.karma.conf",
        browsers:["PhantomJS"]
      }, null);

  return srvInst.start();
});

gulp.task('phantom-test',['phantom']);
gulp.task('chrom-test',['chrome']);
