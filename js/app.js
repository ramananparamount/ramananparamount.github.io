var myapp = angular.module('bseriApp', ["ui.router"])
myapp.config(function($stateProvider, $urlRouterProvider){

    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/home")

    $stateProvider
    .state('home', {
        url: "/home",
        templateUrl: "partials/home.html"
    })
    .state('about', {
        url: "/about",
        templateUrl: "partials/about.html"
    })
    .state('training', {
        url: "/training",
        templateUrl: "partials/training.html"
    })
    .state('managementsystems', {
        url: "/managementsystems",
        templateUrl: "partials/managementsys.html"
    })
    .state('gallery', {
        url: "/gallery",
        templateUrl: "partials/gallery.html"
    })
})

.run(['$rootScope','$window', function($rootScope,$window) {
    $rootScope.$on('$stateChangeSuccess',function(){
        $window.scrollTo(0,0);
    })

}])