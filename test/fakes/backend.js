module.exports = {
    general: function (httpBackend, CONST) {
        var base = CONST.api_base;
        httpBackend.whenPOST(base + '/links/public')
                .respond(200, { 'objCollecton': [{ 'someobject1': 'someobject1' }, { 'someobject2': 'someobject2' }, { 'someobject3': 'someobject3' }] });
    },

    register: function(httpBackend, CONST){
        var base = CONST.api_base;
        httpBackend.whenPOST(base + '/account/register')
                .respond(200,'ok');
    },

    loginOK: function(httpBackend, CONST){
        httpBackend.whenPOST(CONST.api_token)
                .respond(200, {'access_token': CONST.TestAccessToken});
    },

    loginFailed: function(httpBackend, CONST){
        httpBackend.whenPOST(CONST.api_token)
                .respond(401, 'unauthorized');
    }


};
