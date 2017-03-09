var storageFake = require('../fakes/storageFake');
var backendMock = require('../fakes/backend');
var constFake = require('../fakes/CONSTFake');


describe('DEMOMODE-SERVICE', function() {
    beforeEach(angular.mock.module('LinkManager',function($provide) {
        $provide.service('storageService', storageFake);
    }));

    var dm,$httpBackend, userService;

    beforeEach(angular.mock.inject(function (_$httpBackend_,_demoModeService_, _userService_) {
        dm =_demoModeService_;
        $httpBackend = _$httpBackend_;
        userService = _userService_;
    }));

    it('should demoModeService be defined', function(){
        expect(dm).toBeDefined();
    });

    it('Disable should not throw if DEMOKEY is absent', function(){
        dm.disable();
        expect(dm.isDemoMode()).toBe(false);
    });

    it('should set DEMOKEY', function(){
        var key = dm.enable();
        expect(dm.getDemoKey()).toBe(key);
        dm.disable();
    });

    it('series should not throw', function(){
        var testFunc = function(){
            dm.enable();
            dm.enable();
            dm.getDemoKey();
            dm.enable();
            dm.disable();
            dm.disable();
            dm.disable();
            dm.getDemoKey();
            dm.disable();
            dm.getDemoKey();
            dm.disable();
            dm.getDemoKey();
        };
            
        expect(testFunc).not.toThrow();
    });

    xdescribe('register-login-add', function () {
        beforeEach(function(){
            var backendMock = backendMock($httpBackend, constFake);
            backendMock.register();

            $httpBackend.expectGET('index.html').respond(200, '');
            $httpBackend.expectGET('app/appView.html').respond(200, '');
            $httpBackend.whenGET('app/home/home.html').respond(200, '');
        });

        it('should register demouser', function () {
            spyOn(userService, 'loginDemoUser').and.returnValue(true);

            var dkey = dm.enable();
            dm.registerLoginDemoUser(dkey);
            $httpBackend.flush();
            
            expect(userService.loginDemoUser).toHaveBeenCalledWith(dkey);
        });        
    });
});
