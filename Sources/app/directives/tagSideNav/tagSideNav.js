function tagSideNav() {
    return {
        restrict: 'E',
        templateUrl: 'app/directives/tagSideNav/tagSideNavView.html',
        scope: {
            navRoute: '=',
            navName: '='
        },
        controller: function ($scope, $location, userService) {
            //var self = this;
            $scope.userName = userService.userName();
            $scope.email = userService.email();

            $scope.navigateTo = function (route) {
                $location.path(route);
            };

            $scope.logout = function() {
                userService.logout();
                $scope.$emit("userChanged");
            };
        }
    };
}

app.directive('tagSideNav', tagSideNav);