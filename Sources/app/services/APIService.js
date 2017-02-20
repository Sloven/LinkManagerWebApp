function APIService($http, CONST) {
    var self = this;

    self.post = function (url, data, config) {
        var normalisedUrl = CONST.api_base + url.toLowerCase();

        return $http.post(normalisedUrl,
            JSON.stringify(data),
            config
        );
    };

    self.get = function(url, data) {
        var normalisedUrl = CONST.api_base + url.toLowerCase();
        return $http.get(normalisedUrl, data);
    };
}

app.service('APIService', APIService);