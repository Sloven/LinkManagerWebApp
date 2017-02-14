function linkService(APIService) {
    var self = this;

    self.addLink = function () {
        APIService.post('/Links', self.link.URL).then(function (resp) {
            console.log(resp);
        });
    };

    self.addURL = function (newURL) {
        return APIService.post('/Links', newURL);
    };

    self.getAllLinks = function () {
        return APIService.get('/links');
    };

    self.getAllPublicLinks = function (userName) {
        return APIService.post('/links/public', userName);
    };
}

app.service('linkService', linkService);