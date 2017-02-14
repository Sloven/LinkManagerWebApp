var storageFake = require('../fakes/storageFake');

describe('DEMOMODE-SERVICE', function() {
    beforeEach(angular.mock.module('LinkManager',function($provide) {
        $provide.service('storageService', storageFake);
    }));

    var dm;

    beforeEach(inject(function (_demoModeService_) {
        dm =_demoModeService_;
        //ss.storage = {};
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

    it('should overwrite DEMOKEY', function(){
        var key1 = dm.enable();
        var key2 = dm.enable();
        var key3 = dm.enable();
        expect(dm.getDemoKey()).toBe(key3);
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
});
