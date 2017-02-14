var storageFake = require('../fakes/storageFake');

describe("DEMOMODE-SERVICE", function() {
    beforeEach(angular.mock.module("LinkManager",function($provide) {
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

        it('Disable should not throw if DEMOMODE is absent', function(){
            dm.disable()
            expect(dm.currentMode()).toBeUndefined();
        });

        it('should set DEMOMODE', function(){
            dm.enable();
            expect(dm.currentMode()).toBe('DEMOMODE');
            dm.disable();
        });

        it('should overwrite DEMOMODE', function(){
            dm.enable();
            dm.enable();
            dm.enable();
            expect(dm.currentMode()).toBe('DEMOMODE');
        });

        it('series should not throw', function(){
            var testFunc = function(){
               dm.enable();
               dm.enable();
               dm.currentMode();
               dm.enable();
               dm.disable();
               dm.disable();
               dm.disable();
               dm.currentMode();
               dm.disable();
               dm.currentMode();
               dm.disable();
               dm.currentMode();
            };
            
            expect(testFunc).not.toThrow();
        });

        it('should def', function(){
            var t = dm.defineModeFromPath("ololo/demo");
            expect(t).toBeDefined()

        });
});
