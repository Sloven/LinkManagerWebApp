function linkService(APIService) {
    var self = this;

    self.addLink = function () {
        APIService.post('/links', self.link.URL).then(function (resp) {
            console.log(resp);
        });
    };

    self.addURL = function (newURL) {
        return APIService.post('/links', newURL);
    };

    self.getAllLinks = function () {
        APIService.get('/links')
        .then(function(result){
            return result;
        });
    };

    self.getAllPublicLinks = function (userName) {
        return APIService.post('/links/public', userName);
    };
}

app.service('linkService', linkService);