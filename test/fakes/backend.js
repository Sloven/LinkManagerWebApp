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
                .respond(200, {'access_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTM4NCJ9.eyJuYW1laWQiOiI4OWJlNjEzYS1iYmUzLTQ0OTYtOTQ0Ny03N2JjYTkzMzA4ZGYiLCJ1bmlxdWVfbmFtZSI6IlRlc3QiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL2FjY2Vzc2NvbnRyb2xzZXJ2aWNlLzIwMTAvMDcvY2xhaW1zL2lkZW50aXR5cHJvdmlkZXIiOiJBU1AuTkVUIElkZW50aXR5IiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiJiM2I4YWU5NS1lYWJlLTQyNGMtOWQ2Yy03ZDUxNDEwMThkNTIiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0L0xpbmtNYW5hZ2VyIiwiYXVkIjoiMCIsImV4cCI6MTQ4Njg1NzgyNywibmJmIjoxNDg2NzcxNDI3fQ.PbX52ztS4jKknnwCMU-AFewfzJqNURXcAh19K9V-QarEd9k8XFWPyH4EypD8aSBH'});
    },

    loginFailed: function(httpBackend, CONST){
        httpBackend.whenPOST(CONST.api_token)
                .respond(401, 'unauthorized');
    }


};
