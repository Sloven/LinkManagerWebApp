'use strict';
function customerController($q, $stateParams, lookupService, resourcesService, userService) {
    var self = this;
    self.resourceList = [];
    self.searchOrAdd = null;

    self.addURL = function (newURL) {
        if(newURL != null && newURL.length > 0){
            resourcesService.addNew(newURL).then(function () {
                self.searchOrAdd = null;
                self.getLinks();
            });
        }
    };

    self.getLinks = function () {
        lookupService.getLinks(function (getLinksResult) {
            self.resourceList = getLinksResult.slice();
        });
    };

    self.addUrlFromState = function(){
        if($stateParams != null
        && $stateParams.linkToAdd != null 
        && $stateParams.linkToAdd.length > 0){
            resourcesService.addNew($stateParams.linkToAdd).then(function (newRsc) {
                self.resourceList.push(JSON.parse(newRsc.data));
            });
        }
    };
    
    self.getLinks();
    self.addUrlFromState();
}
app.controller('customerController', customerController);