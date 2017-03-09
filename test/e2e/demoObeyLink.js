var constFake = require('../fakes/CONSTFake');

describe('DEMO obey link.', function() {
    it('should add new resource to demo account', function() {
        //http://lmapp/
        browser.get(constFake.webAppAddress);
        element(by.id('inp_obey')).sendKeys('http://testurlsendfromprotractor.test');        
        
        element(by.id('btn_obey')).click();

        var itemCount = element.all(by.id('lstitm_resource')).count();

        expect(itemCount).toBeGreaterThan(0);
    });
});