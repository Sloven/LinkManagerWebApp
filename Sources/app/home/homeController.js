'use strict';
function homeController($state, demoModeService, userService) {
    var self = this;

    self.obeyLink = '';
    self.Demokey = null;

    self.obey = function(obeyLink){
        self.Demokey = demoModeService.enable();
        demoModeService.registerLoginDemoUser(self.Demokey, function(){
            //redirect to dashboard
            $state.go('main.app.dashboard.addLink'
            ,{  linkToAdd:obeyLink,
                userName:userService.userName()
            });
        });
    };

    self.homeEnter = function (){
        if(userService.isAuthed())
            $state.go('main.app.dashboard', {userName:userService.userName()});
    };

    self.homeEnter();

}

app.controller('homeController', homeController);