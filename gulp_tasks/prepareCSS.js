﻿module.exports = function(gulp,plugins,gulpConfig){
    return function(){
            gulp.src([
            gulpConfig.path.libs + "angular-material/angular-material.min.css"
            //paths.libs + "angular-loading-bar/build/loading-bar.min.css"
            ]).pipe(plugin.concat("all.min.css"))
            .pipe(gulp.dest(gulpConfig.path.webroot + "libs/"));
    };
}
