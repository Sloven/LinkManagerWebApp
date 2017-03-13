function appController($scope, $mdSidenav,$state, userService, authService) {
    var self = this;

    self.isAuthed = false;
    self.userName = null;

    self.logout = function() {
        authService.logout && authService.logout();
        $state.go('main.app.home');
        updateUser();
    };

    $scope.$on('userChanged', function() { updateUser(); });

    function updateUser() {
        self.isAuthed = authService.isAuthed();
        self.userName = userService.userName();
    }

    $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };

    //onload actions
    updateUser();
    
    //default startup page
    // if(!self.isAuthed)
    //     $state.go('main.app.home');

}
app.controller('appController', appController);