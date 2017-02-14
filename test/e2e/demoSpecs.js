var storageFake = require('../fakes/storageFake');
var constFake = require('../fakes/CONSTFake');
var backendMock = require('../fakes/backend');

var derr = require('../../sources/app/demo/democontroller');
var ussr = require('../../sources/app/services/userService');
var intrc = require('../../sources/app/services/interceptor');
var auth = require('../../sources/app/services/authService');
//test

describe('DEMO:', function () {

    var $state, $httpBackend, $http, $stateParams, dmc, interceptor, authService, storage, demoModeService;

    beforeEach(angular.mock.module('LinkManager', function ($provide) {
        $provide.service('CONST', constFake);
        $provide.service('storageService', storageFake);
    }));

    beforeEach(inject(function (_$controller_, _$httpBackend_, _$stateParams_,  _demoModeService_,_interceptor_, _authService_, _storageService_) {
        $httpBackend = _$httpBackend_;
        $stateParams = _$stateParams_;
        demoModeService = _demoModeService_;
        dmc = _$controller_('demoController');
        authService = _authService_;
        storage = _storageService_;

    }));

    it('should have services be defined', function () {
        //expect(interceptor).toBeDefined();
        expect(authService).toBeDefined();
        expect(demoModeService).toBeDefined();
    });

    beforeEach(function () {
        backendMock.general($httpBackend, constFake);
        
        $httpBackend.expectGET('index.html').respond(200, '');
        $httpBackend.expectGET('app/appView.html').respond(200, '');
        $httpBackend.whenGET('app/home/home.html').respond(200, '');
        $httpBackend.whenGET('app/demo/demo.html').respond(200, '');
        $httpBackend.whenGET('app/lookup/lookup.html').respond(200, '');

        //spyOn(demoModeService, 'defineModeFromPath').and.callThrough();
        //spyOn($window)
    });

    describe('First time visit', function () {
        it('DEMOKEY variable should be set', function () {
            //var url = '/demo';
            dmc.enableDemoMode();
            //$httpBackend.whenGET(url).respond(200, '');
            //$httpBackend.flush();
            //var mode = demoModeService.currentMode();
            expect(dmc.key).toBeTruthy();
        });

        it('should register demouser', function () {
            backendMock.register($httpBackend, constFake);
            backendMock.loginOK($httpBackend, constFake);

            dmc.enableDemoMode();
            dmc.registerDemoUser();
            $httpBackend.flush();
            // $httpBackend.expectPOST(CONST.api_token, {}, function(headers) {
            //     return {
            //         'DEMOMODE': 'true'
            //     };
            // }).respond(200);
            // $httpBackend.flush();
        });

        it('should sign in demouser', function(){
            backendMock.register($httpBackend, constFake);
            backendMock.loginOK($httpBackend, constFake);

            dmc.enableDemoMode();
            dmc.registerDemoUser();
            dmc.loginDemoUser();
            $httpBackend.flush();

            expect(authService.isAuthed()).toBe(true);
        });

        it('should add demo resource', function(){
            backendMock.register($httpBackend, constFake);
            backendMock.loginOK($httpBackend, constFake);

            var data = 'http://someresourceurl.com/testmeplease';
            dmc.tryResource = data;
            dmc.startDemoMode();
            // dmc.enableDemoMode();
            // dmc.registerDemoUser();
            // dmc.loginDemoUser();
            // $httpBackend.flush();

            expect(dmc.resourceList).toBeTruthy();
            expect(dmc.resourceList.length > 0).toBe(true);
        });
        
    });

    /*
    
        describe('Another time visit', function(){
            describe('DEMOMODE is valid',function(){
                it('should reuse DEMOMODE variable and token', function(){
                    expect(demoModeService.currentMode()).toBe('DEMOMODE');
                    expect(authService.isAuthed).toBe(true);
                });
            });
    
            describe('DEMOMODE is invalid',function(){
                it('should recreate DEMOMODE variable and token', function(){
                    expect(authService.isAuthed).toBe(true);
                    expect(authService.isAuthed).toBe(true);
                });
            });
        });
    
        describe('Add new resource', function(){
            it('should be added and list of resources shown',function(){
                var list = [];
                expect(list.count).toBeDefined();
                expect(list.count > 0).toBe(true);
            });
        });
        */
});