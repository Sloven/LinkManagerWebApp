function userService($http, CONST, authService) {
    var self = this;
    self.getQuote = function() {
        return $http.get(CONST.api_base + '/account/quote');
    };

    self.register = function (username, email, password, confirmPassword, apiUrl) {
        if (!apiUrl)
            apiUrl = CONST.api_base;

        return $http.post(apiUrl + '/account/register',
            {
                username: username,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            });
    };

    self.login = function (username, password, apiTokenUrl) {
        if (!apiTokenUrl)
            apiTokenUrl = CONST.api_token;

        return $http.post(apiTokenUrl,
            'userName=' +
            encodeURIComponent(username) +
            '&password=' +
            encodeURIComponent(password) +
            '&grant_type=password'
        );
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
}

app.service('userService', userService);