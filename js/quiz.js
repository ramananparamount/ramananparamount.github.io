var quizapp = angular.module("bseriApp")
    .controller("quizCtrl",['$scope','$http', function ($scope,$http){
        $http.get("../data/quiz.json").success(function (){
            console.log(data[0][0]);
            //$scope.qrys=data[0][0];
        });
    }])
