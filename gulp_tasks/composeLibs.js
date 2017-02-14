module.exports = function (gulp,plugins,gulpConfig){
 return function(){
        gulp.src([
        gulpConfig.path.libs + "angular/angular.min.js",
        gulpConfig.path.libs + "angular-route/angular-route.min.js",
        gulpConfig.path.libs + "angular-animate/angular-animate.min.js",
        gulpConfig.path.libs + "angular-aria/angular-aria.min.js",
        gulpConfig.path.libs + "angular-ui-router/release/angular-ui-router.min.js",
        //gulpConfig.path.libs + "angular-loading-bar/build/loading-bar.min.js",
        gulpConfig.path.libs + "angular-material/angular-material.min.js",
        gulpConfig.path.libs + "angular-messages/angular-messages.min.js",
        gulpConfig.path.libs + "angular-material-icons/angular-material-icons.min.js",
        gulpConfig.path.libs + "angular-cookies/angular-cookies.min.js"
   ]).pipe(plugins.concat("allLibs.min.js"))
     .pipe(gulp.dest(gulpConfig.path.webroot + "libs/"));

 };
};