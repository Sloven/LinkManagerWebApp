module.exports = function backendMock($httpBackend, CONST){
    var self = this;

    var httpBackend = $httpBackend;
    var api_base = CONST.api_base.toLowerCase();
    var api_token = CONST.api_token.toLowerCase();

    self.general = function () {
        httpBackend.whenPOST(api_base + '/links/public')
                .respond(200, { 'objCollecton': [{ 'someobject1': 'someobject1' }, { 'someobject2': 'someobject2' }, { 'someobject3': 'someobject3' }] });
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

    self.linksPOST = function(){
        httpBackend.whenPOST(api_base + '/links')
            .respond(200, {'mockedResourcesFromServer':[{'privattehiddenresource1':'http://urlofprivattehiddenresource1'},{'resource1':'http://urlofresource1'},{'resource2':'http://urlofresource2'},{'resource3':'http://urlofresource3'}]});
    };

    self.linksGET = function(){
        httpBackend.whenGET(api_base + '/links')
            .respond(200, {'mockedResourcesFromServer':[{'resource1':'http://urlofresource1'},{'resource2':'http://urlofresource2'},{'resource3':'http://urlofresource3'}]});
    };

};
