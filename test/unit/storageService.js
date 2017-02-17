
describe('STORAGESERVICE', function() {
    beforeEach(angular.mock.module('LinkManager'));
    
    var ss;

    beforeEach(inject(function (_storageService_) {
        ss =_storageService_;
        //ss.storage = {};
    }));

    it('should set item', function(){
        ss.setItem('item','isstring');
        expect(ss.getItem('item')).toBe('isstring');
    });

    it('should not throw if item not exists', function(){
        expect(function(){ ss.getItem('itemToGet');}).not.toThrow();
    });

    describe('delete item', function(){
        it('should not throw if item not exists', function(){
            
            expect(function(){
                ss.removeItem('itemNotExists');
            }).not.toThrow();
        });

        it('should delete item', function(){
            ss.setItem('itemToDelete','somestring');
            ss.removeItem('itemToDelete');
            expect(ss.getItem('itemToDelete')).toBeNull();
        });
    });
});
