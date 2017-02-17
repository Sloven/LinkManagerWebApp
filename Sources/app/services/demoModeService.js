function demoModeService(storageService, authService,userService, CONST) {
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
        if (!self.isDemoMode()){
            var guestKey = randomGuestKey();
            storageService.setItem('DEMOKEY',guestKey);
            return guestKey;
        }
        return self.getDemoKey();
    };

    self.disable = function () {
        storageService.removeItem('DEMOKEY');
    };

    self.isDemoMode = function () {
        return storageService.getItem('DEMOKEY') != null;
    };

    

    self.registerLoginDemoUser = function (key) {
        if (!authService.isAuthed() && key) {
            userService.registerDemoUser(key)
                .then(function () {
                    userService.loginDemoUser(key);
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

    function randomGuestKey () {
        var x = 2147483648;
        return CONST.demoUserPrefix +
            Math.floor(Math.random() * x).toString(36) +
            Math.abs(Math.floor(Math.random() * x) ^ Date()).toString(36);
    }
}

app.service('demoModeService', demoModeService);