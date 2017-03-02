var storageFake = require('../fakes/storageFake');
var backendMockExport = require('../fakes/backend');
var constFake = require('../fakes/CONSTFake');

describe('RESOURCES-SERVICE', function() {
    beforeEach(angular.mock.module('LinkManager',function($provide) {
        //$provide.service('storageService', storageFake);
    }));

    var rs,$httpBackend, userService;

    beforeEach(angular.mock.inject(function (_$httpBackend_,_resourcesService_, _userService_) {
        rs =_resourcesService_;
        $httpBackend = _$httpBackend_;
        userService = _userService_;
    }));

    it('should add resource', function(){
        //tryMeFunc.tryMe();
        //var url = 'http://www.google.com';
        //rs.addResource(url);

        //expect(dm).toBeDefined();
    });
});
