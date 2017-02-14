function linkController(APIService) {
    var self = this;
    self.link = null;

    self.editDsbl = true;
    
    self.init = function (linkId) {
        //self.getLink(linkId);
    }

    self.addLink = function () {
        APIService.post("/Links", self.link.URL).then(function (resp) {
      
            console.log(resp);
        });
    };

    self.addURL = function (newURL) {
        APIService.post("/Links", newURL).then(function (resp) {
        });
    };

    self.getOneLink = function(linkId) {
        //get link from server
        self.link = {
            Id:linkId,
            URL: "http//www.someurl",
            title: "sometitle",
            createdDate:"15/09/2016"
        }
    };

}

app.controller('linkController', linkController);