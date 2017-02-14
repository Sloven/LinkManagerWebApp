function demoController($stateParams, lookupService, linkService, authService, userService, demoModeService) {
    var self = this;
    self.resourceList = null;
    self.key = null;
    
    self.tryResource = $stateParams.tryResource;

    self.enableDemoMode = function () {
        if (!demoModeService.isDemoMode())
            self.key = demoModeService.enable();
    };


    self.registerDemoUser = function () {
        //var key = demoModeService.getDemoKey();
        if (!authService.isAuthed() && self.key) {
            userService.registerDemoUser(self.key)
                .then(function () {
                    self.loginDemoUser(self.key);
                }, function (res) {
                    console.error(res);
                });
        }
    };

    self.loginDemoUser = function (key) {
        if (!authService.isAuthed()) {
            userService.loginDemoUser(key);
        }
    };

    self.addURL = function (newURL) {
        linkService.addURL(newURL).then(function (response) {
            self.links = linkService.getAllLinks();
        });
    };

    self.getLinks = function () {
        lookupService.getLinks(function (getLinksResult) {
            self.links = getLinksResult;
        });
    };

    self.getLinks();
}

app.controller('demoController', demoController);