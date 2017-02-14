function demoModeService(storageService, CONST) {
    var self = this;

    // self.defineModeFromPath = function(path) {
    //     if(path && path.length > 0)
    //     var sections = path.split("/");
    //     return sections[1] === "demo";
    // }
    self.getDemoKey = function(){
        return storageService.getItem('DEMOKEY') || null;
    };

    self.enable = function () {
        var guestKey = self.randomGuestKey();
        storageService.setItem('DEMOKEY',guestKey);
        return guestKey;
    };

    self.disable = function () {
        storageService.removeItem('DEMOKEY');
    };

    self.isDemoMode = function () {
        return storageService.getItem('DEMOKEY') !== undefined;
    };

    self.randomGuestKey = function() {
        var x = 2147483648;
        return CONST.demoUserPrefix +
            Math.floor(Math.random() * x).toString(36) +
            Math.abs(Math.floor(Math.random() * x) ^ Date()).toString(36);
    };

}

app.service('demoModeService', demoModeService);