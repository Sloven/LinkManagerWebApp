function demoController($stateParams, lookupService, linkService, authService, userService, demoModeService) {
    var self = this;
    self.resourceList = null;
    self.key = null;

    self.tryResource = $stateParams.tryResource;

    self.demoChained = function(resourceUrl){
        self.key = demoModeService.enable();
        demoModeService.registerLoginDemoUser(self.key);
        self.addURL(resourceUrl);
    };

    self.addURL = function (newURL) {
        if(newURL != null){
            linkService.addURL(newURL).then(function () {
                //self.resourceList = linkService.getAllLinks();
                self.getLinks();
            });
        }
    };

    self.getLinks = function () {
        lookupService.getLinks(function (getLinksResult) {
            self.resourceList = getLinksResult;
        });
    };
}
app.controller('demoController', demoController);