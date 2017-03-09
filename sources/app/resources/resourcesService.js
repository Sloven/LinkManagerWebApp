function resourcesService(APIService) {
    var self = this;

    self.getAllResources = function () {
        APIService.get('/resources')
        .then(function(result){
            return result;
        });
    };

    self.getAllPublicResources = function (userName) {
        return APIService.get('/resources/public', userName);
    };

    self.addNew = function(url){
        return APIService.post('/resources', url);
    };
}

app.service('resourcesService', resourcesService);