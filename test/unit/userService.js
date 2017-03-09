var storageFake = require('../fakes/storageFake');
var backendFake = require('../fakes/backend');
var CNST = require('../fakes/CONSTFake');

describe('USER-SERVICE', function() {
    beforeEach(angular.mock.module('LinkManager',function($provide) {
        $provide.service('storageService', storageFake);
    }));

    var us,$httpBackend, ss, backendMock, demoName, fakeUser, registerUrl;

    beforeEach(angular.mock.inject(function (_$httpBackend_,_userService_, _storageService_) {
        us =_userService_;
        $httpBackend = _$httpBackend_;
        ss = _storageService_;
        demoName = 'UserName#123someDemoKeyName';
        registerUrl = CNST.api_base + '/account/register';

        backendMock = new backendFake($httpBackend, CNST);
        backendMock.defaultBaseRequests();

        fakeUser = {
            username: 'testusername',
            email: 'testusername@email.com',
            password: 'TestUserNamePass@123',
            confirmPassword: 'TestUserNamePass@123'
        };
    }));

    it('should register',function(){
        us.register(fakeUser.username, fakeUser.email,fakeUser.password, fakeUser.confirmPassword);

        $httpBackend.expectPOST(registerUrl)
            .respond(function(method, url, data){
                expect(JSON.parse(data).password).toEqual(fakeUser.password);
                return {};
            });

        $httpBackend.flush();

    });


    it('should login',function(){
        us.login(fakeUser.username, fakeUser.password);

        $httpBackend.expectPOST(CNST.api_token)
            .respond(function(method, url, data){
                expect(data).toBeDefined();
                return {};
            });

        $httpBackend.flush();
    });

    it('should send request with DEMOKEY header and REGISTER demo user',function(){
        ss.setItem(CNST.DEMOKEY, demoName);
        us.registerDemoUser(demoName);

        $httpBackend.expectPOST(registerUrl)
            .respond(function(method, url, data, headers){
                expect(data).toBeDefined();
                expect(JSON.parse(data).password).toEqual(demoName);
                expect(headers.Demokey).toBeDefined();
                expect(headers.Demokey).toBeTruthy();
                return {};
            });

        $httpBackend.flush();

    });


    it('should send request with DEMOKEY and LOGIN demo user',function(){
        ss.setItem(CNST.DEMOKEY, demoName);
        us.loginDemoUser(demoName);

        $httpBackend.expectPOST(CNST.api_token)
            .respond(function(method, url, data, headers){
                expect(data).toBeDefined();
                expect(headers.Demokey).toBeDefined();
                expect(headers.Demokey).toBeTruthy();
                return {};
            });

        $httpBackend.flush();
    });

    it('should get Email from token',function(){
        ss.setItem(CNST.TestAccessToken);
        
        var email = us.email();

        expect(email).toBeDefined();
    });

    it('should get UserName from token',function(){
        ss.setItem(CNST.TestAccessToken);

        var username = us.userName();

        expect(username).toBeDefined();
    });

    it('should logout',function(){
        ss.setItem(CNST.TestAccessToken);
        us.logout();
        expect(ss.getItem(CNST.TestAccessToken)).toBeUndefined();
    });


});
