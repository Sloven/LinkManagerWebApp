function lookupService($stateParams, linkService, authService,APIService) {
    var self = this;
    self.collectedLinks = null;

    self.getLinks = function (callBack) {
        if (authService.isAuthed()){
            APIService.get('/resources').then(function (response) {
                callBack(response.data);
            });
        }
    };
}

app.service('lookupService', lookupService);
