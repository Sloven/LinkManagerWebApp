var app = angular.module('LinkManager',
    [
        'ngMaterial','ngMessages', 'ngMdIcons', 'ngAnimate', 'ui.router', 'ngAria', 'ngCookies' //, 'angular-loading-bar' //, 'ngResource', 'ngStorage'
    ]);
    
app.config(function ($locationProvider, $stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {

    $urlMatcherFactoryProvider.caseInsensitive(true);

    routeConfig($stateProvider, $urlRouterProvider);

    $locationProvider.html5Mode(true);
});

app.config(function ($mdThemingProvider){
    $mdThemingProvider.theme('default')
     .primaryPalette('blue-grey')
     .accentPalette('orange')
    .dark();
});

// app.run(['$state', function($state) {
//     $state.target('main.app.home');
// }]);


function routeConfig($stateProvider) {

    $stateProvider
        .state('main',
        {
            abstract: true,
            templateUrl: 'index.html'
        })
        .state('main.login', {
            url: '/login',
            templateUrl: 'app/user/loginForm.html'
        })
        .state('main.register', {
            url: '/register',
            templateUrl: 'app/user/registerForm.html'
        })
        .state('main.app', {
            templateUrl: 'app/appView.html'
        })
            .state('main.app.home',{
                url: '/',
                templateUrl:'app/home/home.html'
            })
            .state('main.app.demo', {
                url: '/demo',
                templateUrl: 'app/demo/demo.html',
                params: {
                    tryResource: ''
                }
            })
            .state('main.app.explore', {
                url: '/explore',
                templateUrl: 'app/explore/explore.html'
            })
            .state('main.app.addLink', {
                url: '/addLink',
                templateUrl: 'app/links/addLink.html'
            })
            .state('main.app.editLink', {
                url: '/editLink',
                templateUrl: 'app/links/editLink.html'
            })
            .state('main.app.lookup', {
                url: '/{userName}',
                templateUrl: 'app/lookup/lookup.html',
                resolve: {
                    userName: [
                        '$stateParams', function ($stateParams) {
                            return $stateParams.userName;
                        }
                    ]
                }
            })
            
                .state('main.app.lookup.addLink', {
                    url: '/{linkToAdd:.*}',
                    templateUrl: 'app/lookup/lookup.html',
                    onEnter: function ($stateParams, userName) {
                        $stateParams.userName = userName;
                    }
                });
}

//app.run(['$rootScope',function($rootScope){ 
//    $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
//        console.log('$stateChangeStart to '+toState.to+'- fired when the transition begins. toState,toParams : \n',toState, toParams);
//    });
//    $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams, error){
//        console.log('$stateChangeError - fired when an error occurs during transition.');
//        console.log(arguments);
//    });
//    $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
//        console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
//    });
//    $rootScope.$on('$viewContentLoading',function(event, viewConfig){
//        console.log('$viewContentLoading - view begins loading - dom not rendered',viewConfig);
//    });
//    // $rootScope.$on('$viewContentLoaded',function(event){
//    //   // runs on individual scopes, so putting it in 'run' doesn't work.
//    //   console.log('$viewContentLoaded - fired after dom rendered',event);
//    //});
//    $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
//        console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
//        console.log(unfoundState, fromState, fromParams);
//    });
//}]);