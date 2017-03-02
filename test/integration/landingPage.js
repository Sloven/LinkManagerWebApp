xdescribe('LANDINGPAGE:', function () {

    var $state, $httpBackend,$http, cntrl, CONST, interceptor;

    beforeEach(angular.mock.module('LinkManager',function($provide) {
        $provide.service('authService', authServiceFake);
    }));
    
    beforeEach(inject(function (_$controller_, _$httpBackend_, _$state_, _$http_, _CONST_,_interceptor_,_demoModeService_) {
        $state = _$state_;
        $httpBackend = _$httpBackend_;
        $http = _$http_;
        cntrl = _$controller_('accountController');//, { $stateParams: stateParams });
        CONST = _CONST_; //_$constant_('CONST');//, { $stateParams: stateParams });
        interceptor = _interceptor_;
        demoModeService = _demoModeService_;

    }));

    it('should have Interceptor be defined', function () {
        expect(interceptor).toBeDefined();
    });


    it('should have demoModeService be defined', function () {
        expect(demoModeService).toBeDefined();
    });


    beforeEach(function () {
        $httpBackend.expectGET('index.html').respond(200, '');
        $httpBackend.expectGET('app/appView.html').respond(200, '');
        $httpBackend.whenGET('app/home/home.html').respond(200, '');
        $httpBackend.whenGET('app/demo/demo.html').respond(200, '');
        $httpBackend.whenGET('app/lookup/lookup.html').respond(200, '');
             
        spyOn(demoModeService,'defineModeFromPath').and.callThrough();
    });

    describe('Not authed user:', function () {
        it('isDemo header should be FALSE "', function () {
            var url = '/';
            $httpBackend.whenGET(url).respond(200, '');

            $httpBackend.flush();

            expect(demoModeService.defineModeFromPath).toHaveBeenCalled();
            expect(demoModeService.defineModeFromPath.calls.mostRecent().returnValue).toBe(false);
        });
    });

    describe('Authed user:', function () {
        it('isDemo header should be FALSE "', function () {
            var url = '/';
            $httpBackend.whenGET(url).respond(200, '');

            $httpBackend.flush();

            expect(demoModeService.defineModeFromPath).toHaveBeenCalled();
            expect(demoModeService.defineModeFromPath.calls.mostRecent().returnValue).toBe(false);
        });
    });

});
