function lookupController($stateParams, linkService, lookupService) {
    var self = this;
    self.links = null;

    self.addURL = function(newURL) {
        linkService.addURL(newURL).then(function(response) {
            linkService.getAllLinks();
        });
    };

    
    if ($stateParams && $stateParams.linkToAdd)
        self.addURL($stateParams.linkToAdd);


    self.getLinks = function () {
        lookupService.getLinks(function (getLinksResult) {
            self.links = getLinksResult;
        });
    };

    self.getLinks();
}

app.controller('lookupController', lookupController);
