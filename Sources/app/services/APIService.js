function APIService($http, CONST, storageService) {
    var self = this;

    self.post = function (url, data, config) {
        var normalisedUrl = CONST.api_base + url.toLowerCase();

        config = applyDemoHeader(config);

        return $http.post(normalisedUrl,
            JSON.stringify(data),
            config
        );
    };

    self.get = function(url, config) {
        
        config = applyDemoHeader(config);
        
        var normalisedUrl = CONST.api_base + url.toLowerCase();
        return $http.get(normalisedUrl, config);
    };

    self.tokenPOST = function(username, password){

        var config = applyDemoHeader();

        return $http.post(CONST.api_token,
            'userName=' +
            encodeURIComponent(username) +
            '&password=' +
            encodeURIComponent(password) +
            '&grant_type=password',
            config
        );
    };

    /**
     * Apply DEMOKEY header if exists
     * @param {*} config 
     */    
    function applyDemoHeader(config){
        var demokey = storageService.getItem(CONST.DEMOKEY);
        if(demokey != null)
        {
            config = config == null ? {} : config;
            config.headers = config.headers == null ? {} : config.headers;
            config.headers.Demokey = (storageService.getItem(CONST.DEMOKEY) != null);
        }
        return config;
    }
}


app.service('APIService', APIService);