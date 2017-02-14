function APIService($http, CONST) {
    var self = this;

    self.post = function (url, data, config) {
        return $http.post(CONST.api_base + url,
            JSON.stringify(data),
            config
        );
    }

    self.get = function(url, data) {
        return $http.get(CONST.api_base + url,data);
    }
};

app.service("APIService", APIService);