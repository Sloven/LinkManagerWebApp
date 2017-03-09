'use strict';
function demoController($q, $stateParams, lookupService, resourcesService, authService, userService, demoModeService) {
    var self = this;
    self.resourceList = null;
    self.key = null;

    //self.tryResource = $stateParams.tryResource;

    self.demoChained = function(resourceUrl){
        self.key = demoModeService.enable();
        
        demoModeService.registerLoginDemoUser(self.key, function(){
            self.addURL(resourceUrl);
        });
    };

    self.addURL = function (newURL) {
        if(newURL != null && newURL.length > 0){
            resourcesService.addNew(newURL).then(function () {
                self.getLinks();
            });
        }
    };

    self.getLinks = function () {
        lookupService.getLinks(function (getLinksResult) {
            self.resourceList = getLinksResult;
        });
    };

    self.demoChained($stateParams.tryResource);

    self.getLinks();
}
app.controller('demoController', demoController);


////twetwetwetwetwet