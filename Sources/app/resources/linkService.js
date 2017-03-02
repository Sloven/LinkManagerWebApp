function linkService(APIService) {
    var self = this;

    self.addLink = function () {
        APIService.post('/resources', self.link.URL).then(function (resp) {
            console.log(resp);
        });
    };

    self.addURL = function (newURL) {
        return APIService.post('/resources', newURL);
    };

    self.getAllLinks = function () {
        APIService.get('/resources')
        .then(function(result){
            return result;
        });
    };

    self.getAllPublicLinks = function (userName) {
        return APIService.get('/resources/public', userName);
    };
}

app.service('linkService', linkService);