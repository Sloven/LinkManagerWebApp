module.exports = function copyStaticFilesFolders(gulp,plugins,gulpConfig){
    return function(){
        gulp.src([gulpConfig.path.allSources, exclude(gulpConfig.path.jsSrc)])// + paths.jsSrc)
            .pipe(gulp.dest(gulpConfig.path.webroot));
    };
};

function exclude(path){
    return '!' + path;
}