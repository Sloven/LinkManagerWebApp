function lookupService($stateParams, linkService, authService) {
    var self = this;
    self.collectedLinks = null;

    self.getLinks = function (callBack) {
        if (authService.isAuthed())
            linkService.getAllLinks().then(function (response) {
                callBack(response.data);
            });
        else {
            linkService.getAllPublicLinks($stateParams.userName).then(function (response) {
                callBack(response.data);
            });
        }
    };
}

app.service('lookupService', lookupService);
