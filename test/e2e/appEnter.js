var constFake = require('../fakes/CONSTFake');

describe('Application enter.', function() {
    it('should exists', function() {
      //http://lmapp/
        browser.get(constFake.webAppAddress);
        expect(browser.getTitle()).toEqual('Link Manager');
    });
});