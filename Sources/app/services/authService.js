function authService($window, storageService, CONST) {
    var self = this;
    
    self.parseJwt = function (token) {

        if (!token)
            token = self.getToken();

        if (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
        }
        return null;
    };

    self.isAuthed = function() {
        var token = self.getToken();
        if (token) {
            var params = self.parseJwt(token);
            return Math.round(new Date().getTime() / 1000) <= params.exp;
        } else {
            self.logout();
            return false;
        }
    };
    self.logout = function () {
        storageService.removeItem('token');
        storageService.removeItem(CONST.DEMOKEY);
    };

    self.saveToken = function (token) {
        storageService.setItem('token',token);
    };

    self.getToken = function () {
        return storageService.getItem('token');
    };
}

app.service('authService', authService);