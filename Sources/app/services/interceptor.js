function interceptor($location, $injector, authService) {
    return {
        request: function (config) {
            var token = authService.getToken();
            if (config.url.indexOf('api') > 0 && token) {
                config.headers.Authorization = 'Bearer ' + token;
            }

            //show loading bar
            //showWait($mdDialog);
            return config;
        },

        requestError: function (config) {
            if (config.url.indexOf('api') > 0 && (config.status === 401 || config.status === 403)) {
                authService.logout();
                $injector.get('$state').transitionTo('main.login');
            }

            //hideWait($mdDialog);
            return config;
        },

        response: function (res) {
            if (res.data && res.data.access_token) {
                authService.saveToken(res.data.access_token);
            }
            //hideWait($mdDialog);
            return res;
        },

        responseError: function (res) {
            if(!res.config && res.message)
            {
                console.error(res.message);
                return res;
            }
            if (res.config.url.indexOf('api') && (res.status === 401 || res.status === 403)) {
                authService.logout();
                $injector.get('$state').transitionTo('main.login');
            }
            //hideWait($mdDialog);
            return res;
        }
    };
}


//function hideWait($mdDialog) {
//        $mdDialog.cancel();
//};

//function showWait($mdDialog) {
//    $mdDialog.show({
//            template: '<md-dialog id="plz_wait" style="background-color:transparent;box-shadow:none">' +
//                '<div layout="row" layout-sm="column" layout-align="center center" aria-label="wait">' +
//                '<md-progress-circular md-mode="indeterminate" ></md-progress-circular>' +
//                '</div>' +
//                '</md-dialog>',
//            parent: angular.element(document.body),
//            clickOutsideToClose: false,
//            fullscreen: false
//        })
//        .then(function(answer) {

//        });
//};



app.factory('interceptor', interceptor)
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('interceptor');
    });