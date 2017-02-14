module.exports = function applyWebConfig(gulp,plugins,gulpConfig){
    return function(){
        gulp.src('web.config', {})
        .pipe(gulp.dest(gulpConfig.path.webroot));
    };
};
