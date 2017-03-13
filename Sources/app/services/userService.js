function userService($http, CONST, authService, APIService) {
    var self = this;

    self.register = function (username, email, password, confirmPassword) {
        return APIService.post(
                '/account/register'
                ,{
                    username: username,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword
                });
    };

    self.login = function (username, password) {
        return APIService.tokenPOST(username,password);
    };

    self.logout = function() {
        authService.logout && authService.logout();
        //$location.path('/');
    };

    self.userName = function() {
        var parsed = authService.parseJwt();
        if (parsed)
            return parsed.unique_name;

        return null;
    };

    self.email = function() {
        var parsed = authService.parseJwt();
        if (parsed)
            return parsed.email;

        return null;
    };

    self.registerDemoUser = function(guestKey) {
        return self.register(guestKey, guestKey + '@test.com', guestKey, guestKey);
    };

    self.loginDemoUser = function (guestKey) {
        return self.login(guestKey, guestKey);
    };

    self.isAuthed = function()    {
        return authService.isAuthed();
    };
}

app.service('userService', userService);