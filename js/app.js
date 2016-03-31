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
        url: "/managementsystems/:catId",
        templateUrl: "partials/managementsys.html",
        controller: function($scope,$http,$filter,$stateParams,$sce){
            $http.get("/data/systems.json").success(function (data){
                        var details = [];
                        details = ($filter('filter')(data,{"topic":$stateParams.catId}));
                        $scope.details=details[0];
                        console.log(details[0]);
                    }).error(function(err,status){
                        console.data(status);
                });
            $scope.$sce=$sce;
            $scope.HasQuiz = $stateParams.catId == "systems" ? false : true;
            $scope.quizlink = "quiz({'catId':'" + $stateParams.catId +"'})";
        }
    })
    .state('gallery', {
        url: "/gallery",
        templateUrl: "partials/gallery.html"
    })
    .state('quiz', {
        url: "/quiz/:catId",
        templateUrl: "partials/quiz.html",
        controller: function($scope,$http,$filter,$stateParams){
            $http.get("/data/quiz.json").success(function (data){
                        var queries = [];
                        queries = ($filter('filter')(data,{"topic":$stateParams.catId}));
                        $scope.qrys=queries[0].questions;
                    }).error(function(err,status){
                        console.data(status);
                });
            $scope.setShowResult = function (disabled){
                disabled = true;
            };
            $scope.getShowResult = function (answer){
                return (answer > 0);
            };
        }
    })    
})

.run(['$rootScope','$window', function($rootScope,$window) {
    $rootScope.$on('$stateChangeSuccess',function(){
        $window.scrollTo(0,0);
    })

}])

//.controller("quizCtrl",['$scope','$http','$filter', function ($scope,$http,$filter){
//    $http.get("/data/quiz.json").success(function (data){
//                var queries = [];
//                queries = ($filter('filter')(data,{"topic":"Environment"}));
//                $scope.qrys=queries[0].questions;
//            }).error(function(err,status){
//                console.data(status);
//        });
//    $scope.setShowResult = function (disabled){
//        disabled = true;
//    };
//    $scope.getShowResult = function (answer){
//        return (answer > 0);
//    };
//    
//}])
