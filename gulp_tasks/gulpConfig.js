module.exports = function gulpConfig(){
    var config = {
        path : {
            webroot: 'wwwroot/',
            root: '',
            sources: 'sources/',
            libs:'bower_components/'
        }
    };

    config.path.jsSrc = config.path.sources + '**/*.js';
    config.path.jsDest = config.path.webroot + '**/*.js';
    config.path.cssDest = config.path.webroot + '**/*.css';
    config.path.libSrcJs = config.path.webroot + 'libs/**/*.js';
    config.path.libDest = config.path.webroot + 'libs/**/*.js';

    config.path.appjsDest = config.path.webroot + '**/*.js';

    config.path.allSources = config.path.sources + '**/*';

    return config;
};