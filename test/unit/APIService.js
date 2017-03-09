var storageFake = require('../fakes/storageFake');
var backendFake = require('../fakes/backend');
var constFake = require('../fakes/CONSTFake');

describe('API-SERVICE', function() {
    beforeEach(angular.mock.module('LinkManager',function($provide) {
        $provide.service('storageService', storageFake);
    }));

    var api,$httpBackend, someAPIurl, ss, backendMock,newResourceUrl, demoName;

    beforeEach(angular.mock.inject(function (_$httpBackend_,_APIService_, _storageService_) {
        api =_APIService_;
        $httpBackend = _$httpBackend_;
        ss = _storageService_;
        someAPIurl = '/someapiurl';
        newResourceUrl = 'http://urltoposttoserver.com';
        demoName = 'UserName#123someDemoKeyName';

        backendMock = new backendFake($httpBackend, constFake);
        backendMock.defaultBaseRequests();
    }));

    it('should POST request',function(){

        api.post(someAPIurl, newResourceUrl);

        $httpBackend.expectPOST(constFake.api_base+someAPIurl)
            .respond(function(method, url, data){
                expect(data).toEqual('"'+newResourceUrl+'"');
                return {};
            });

        
        $httpBackend.flush();

    });

    it('should POST request with header demokey=true',function(){
      
        ss.setItem(constFake.DEMOKEY, demoName);
        api.post(someAPIurl, newResourceUrl);

        $httpBackend.expectPOST(constFake.api_base+someAPIurl)
            .respond(function(method, url, data, headers){
                expect(headers.Demokey).toBeDefined();
                expect(headers.Demokey).toBeTruthy();
                return {};
            });

        
        $httpBackend.flush();
    });


    it('should GET request',function(){
        api.get(someAPIurl, newResourceUrl);

        $httpBackend.expectGET(constFake.api_base+someAPIurl)
            .respond(function(method, url){
                expect(url).toEqual(constFake.api_base+someAPIurl);
                return {};
            });

        
        $httpBackend.flush();
    });

    it('should GET request with header demokey=true',function(){
        ss.setItem(constFake.DEMOKEY, demoName);
        api.get(someAPIurl);

        $httpBackend.expectGET(constFake.api_base+someAPIurl)
            .respond(function(method, url, data, headers){
                expect(headers.Demokey).toBeDefined();
                expect(headers.Demokey).toBeTruthy();
                expect(url).toEqual(constFake.api_base+someAPIurl);
                return {};
            });

        
        $httpBackend.flush();
    });



});
