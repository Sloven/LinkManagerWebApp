function exploreController($http, CONST) {
    var self = this;

    self.getValues = function() {
        $http.get(CONST.api_base + '/values')
            .then(function(resp) {
                self.values = resp.data;
            });
    }
}

app.controller('exploreController', exploreController);
