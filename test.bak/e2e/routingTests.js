/// <reference path="../Scripts/_references.js"/>
describe('Routing.', function () {

    var $state;

    //loop through all states and find first correct state.
    function getStateFromUrl(url, queryParams) {

        var exists = null;
        var allStates = $state.get();

        allStates.some(function (state) {
            if (state.name !== "") {
                var privatePortion = state.$$state();
                if (privatePortion && privatePortion.url) {
                    var match = privatePortion.url.exec(url, queryParams);
                    if (match) {
                        exists = state;
                        return true;
                    }
                }
            }
            return false;
        });

        return exists;
    }

    //Add decorator to ui-router. This will allows to fetch the $$state of the ui-router and use its URLMatcher to examine URL
    beforeEach(angular.mock.module('ui.router', function ($stateProvider) {
        $stateProvider.decorator('parent', function (internalStateObj, parentFn) {
            // The first arg is the internal state. Capture it and add an accessor to public state object.
            internalStateObj.self.$$state = function() { return internalStateObj; };
            // pass through to default .parent() function
            return parentFn(internalStateObj); 
        });

    }, 'LinkManager'));

    beforeEach(inject(function (_$state_) {
        $state = _$state_;
    }));

    describe('Route:', function () {
        describe('<empty>', function () {
            it('state should be "main.app.home"', function () {
                var url = "/";
                var exists = getStateFromUrl(url);

                expect(exists).toBeTruthy();
                expect(exists.name).toEqual('main.app.home');
            });
        });
        describe('/login', function () {
            it('state should be main.login', function () {

                var url = "/login";
                var exists = getStateFromUrl(url);

                expect(exists).toBeTruthy();
                expect(exists.name).toEqual('main.login');
            });
        });
        describe('/explore', function () {
            it('state should be "main.app.explore"', function () {

                var url = "/explore";
                var exists = getStateFromUrl(url);

                expect(exists).toBeTruthy();
                expect(exists.name).toEqual('main.app.explore');
            });
        });
        describe('/addlink',function() {
            it('state should be main.app.addLink', function () {
                var url = "/addlink";
                var exists = getStateFromUrl(url);

                expect(exists).toBeTruthy();
                expect(exists.name).toEqual('main.app.addLink');
            });
        });
        describe('/editlink', function () {
            it('state should be main.app.addLink', function () {
                var url = "/editlink";
                var exists = getStateFromUrl(url);

                expect(exists).toBeTruthy();
                expect(exists.name).toEqual('main.app.editLink');
            });
        });

        describe('/<user name>', function () {
            it('state should be main.app.lookup', function () {
                var url = "/username";
                var exists = getStateFromUrl(url);

                expect(exists).toBeTruthy();
                expect(exists.name).toEqual('main.app.lookup');

            });
        });
    });
});
