var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require('./gulp_tasks/gulpConfig')();
var karma = require('karma');

plugins.karma = karma;

function getTask(task, params) {
    return require('./gulp_tasks/' + task)(gulp, plugins, config, params);
}

//dev
gulp.task('composeCSS', getTask('composeCSS'));
gulp.task('composeLibs', getTask('composeLibs'));
gulp.task('composeSources', getTask('composeSources'));
gulp.task('copyStaticFilesFolders', getTask('copyStaticFilesFolders'));
gulp.task('applyWebConfig', getTask('applyWebConfig'));
gulp.task('testworkspaceRun', 
    plugins.shell.task('code test/')
);

//deploy task
gulp.task('deploy',['applyWebConfig','composeLibs','composeCSS', 'composeSources','copyStaticFilesFolders','watch']);

//watch then deploy task
gulp.task('watch',function(){
     gulp.watch(config.path.sources + '**/*', ['deploy'])
});

gulp.task('test',['testworkspaceRun']);
