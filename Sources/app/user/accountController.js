function accountController($state, userService, authService) {
    var self = this;

    self.username = "";
    self.password = "";

    self.loginError = "";
    self.username = "";
    self.password = "";
    
    self.login = function () {
        self.loginError = "";
        userService.login(self.username, self.password)
        .then(function (result) {
                if (result.status === 200)
                    $state.transitionTo("main.app");
                else
                    self.loginError = result && result.data && result.data.error_description;
            });
    };

    self.clearErrors = function() {
        self.loginError = "";
    }

    self.register = function() {
        userService.register(self.username, self.email, self.password, self.confirmPassword);
    };

    self.isAuthed = function() {
        return authService.isAuthed ? authService.isAuthed() : false;
    };
}

app.controller('accountController', accountController);