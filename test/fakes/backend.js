module.exports = function backendMock($httpBackend, CONST){
    var self = this;

    var httpBackend = $httpBackend;
    var api_base = CONST.api_base.toLowerCase();
    var api_token = CONST.api_token.toLowerCase();

    self.defaultBaseRequests = function(){
        $httpBackend.whenGET('index.html').respond(200, '');
        $httpBackend.whenGET('app/appView.html').respond(200, '');
        $httpBackend.whenGET('app/home/home.html').respond(200,'');
    };

    self.register = function(){
        httpBackend.whenPOST(api_base + '/account/register')
                .respond(200,'ok');
    };

    self.loginOK = function(){
        httpBackend.whenPOST(api_token)
                .respond(200, {'access_token': CONST.TestAccessToken});
    };

    self.loginFailed = function(){
        httpBackend.whenPOST(api_token)
                .respond(401, 'unauthorized');
    };

    self.publicResourcesGET = function(){
        httpBackend.whenGET(api_base + '/resources/public') //here user name is not necessary
            .respond(200, {'mockedResourcesFromServer':[{'resource1':'http://urlofresource1'},{'resource2':'http://urlofresource2'},{'resource3':'http://urlofresource3'}]});
    };

    self.resourcesGET = function(){
        httpBackend.whenGET(api_base + '/resources') //here user name is not necessary
            .respond(200, {'mockedResourcesFromServer':[{'resource1':'http://urlofresource1'},{'resource2':'http://urlofresource2'},{'resource3':'http://urlofresource3'},{'privateresource1':'http://privateresource1'}]});
    };

    self.resPOST = function(){
        httpBackend.whenPOST(api_base + '/resources')
            .respond(200, 'ok');
    };

};
