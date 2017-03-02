'use strict';
function homeController() {
    var self = this;

    var value = null;
    self.obeyLink = '';

    self.changeValue = function(){
        self.value = true;
    };
}

app.controller('homeController', homeController);