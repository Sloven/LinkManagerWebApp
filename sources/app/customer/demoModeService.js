function demoModeService($q, storageService, authService,userService, CONST) {
    var self = this;

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

    self.registerLoginDemoUser = function(key, resolve){
        if (!authService.isAuthed() && key) {
            return userService.registerDemoUser(key)
                .then(function(){
                    return userService.loginDemoUser(key)
                        .then(resolve);
                });
        }
    };

    self.registerDemoUser = function(key){
        if (!authService.isAuthed() && key) {
            userService.registerDemoUser(key);
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