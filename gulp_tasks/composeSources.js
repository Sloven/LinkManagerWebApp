module.exports = function composeSources (gulp,plugins,gulpConfig){
    return function(){
        gulp.src('sources/**/*.js', {})//paths.jsSrc)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.ngAnnotate())
        .pipe(plugins.concat('all.js',{newLine:'\n;'}))
        //.pipe(gulp.dest(gulpConfig.path.webroot))
        //.pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest(gulpConfig.path.webroot));
    };
};