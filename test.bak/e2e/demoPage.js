var storageFake = require('../fakes/storageFake');

xdescribe('DEMOPAGE:', function () {

var $state, $httpBackend,$http, cntrl, CONST, interceptor, authService;

 beforeEach(angular.mock.module("LinkManager",function($provide) {
     $provide.service('storageService', storageFake);
 }));
    
    beforeEach(inject(function (_$controller_, _$httpBackend_, _$state_, _$http_, _CONST_, _interceptor_, _demoModeService_, _authService_) {
        $state = _$state_;
        $httpBackend = _$httpBackend_;
        $http = _$http_;
        CONST = _CONST_;
        interceptor = _interceptor_;
        demoModeService = _demoModeService_;
        authService = _authService_;
    }));

    it('should have services be defined', function () {
          expect(interceptor).toBeDefined();
          expect(authService).toBeDefined();
          expect(demoModeService).toBeDefined();
    });

    beforeEach(function () {
             $httpBackend.expectGET("index.html").respond(200, "");
             $httpBackend.expectGET("app/appView.html").respond(200, "");
             $httpBackend.whenGET("app/home/home.html").respond(200, "");
             $httpBackend.whenGET("app/demo/demo.html").respond(200, "");
             $httpBackend.whenGET("app/lookup/lookup.html").respond(200, "");
             
             spyOn(demoModeService,'defineModeFromPath').and.callThrough();
             //spyOn($window)
    });

    describe('First time visit', function () {
        it('isDemo variable should be set to TRUE', function () {
                var url = "/demo";

                $httpBackend.whenGET(url).respond(200, "");
                $httpBackend.flush();

                var mode = demoModeService.currentMode();
                expect(mode).toBe("DEMOMODE");
        });
    
        it('Should have demo token assigned', function () {
        });

        it('Should have been authed', function () {
            expect(authService.isAuthed()).toBe(true);
        });
    });
/*

    describe('Another time visit', function(){
        describe('DEMOMODE is valid',function(){
            it('should reuse DEMOMODE variable and token', function(){
                expect(demoModeService.currentMode()).toBe("DEMOMODE");
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