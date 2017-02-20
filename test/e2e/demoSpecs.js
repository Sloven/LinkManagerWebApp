var storageFake = require('../fakes/storageFake');
var constFake = require('../fakes/CONSTFake');
var backendMockExport = require('../fakes/backend');

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
        
        $httpBackend.expectGET('index.html').respond(200, '');
        $httpBackend.expectGET('app/appView.html').respond(200, '');
        $httpBackend.whenGET('app/home/home.html').respond(200, '');
        $httpBackend.whenGET('app/demo/demo.html').respond(200, '');
        $httpBackend.whenGET('app/lookup/lookup.html').respond(200, '');

        //spyOn(demoModeService, 'defineModeFromPath').and.callThrough();
        //spyOn($window)
    });

    describe('First time visit', function () {
        beforeEach(function(){
            var backendMock = new backendMockExport($httpBackend, constFake);
            backendMock.general();
            backendMock.register();
            backendMock.loginOK();
            backendMock.linksPOST();
            backendMock.linksGET();
        });

        it('test chained actions all together',function(){
            var data = 'http://anothersometestresourceurl.com/testmeplease';
            //dmc.tryResource = data;
            dmc.demoChained(data);

            $httpBackend.flush();
            
            expect(dmc.resourceList).toBeTruthy();
            expect(dmc.resourceList.objCollecton.length > 0).toBe(true);

        });
        
    });
});