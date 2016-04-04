var myapp = angular.module('bseriApp', ['ngAnimate','ui.router'])
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
        controller: function($scope,$http,$filter,$stateParams,$sce,$state){
            $http.get("/data/systems.json").success(function (data){
                        var details = [];
                        details = ($filter('filter')(data,{"topic":$stateParams.catId}));
                        $scope.details=details[0];
                        //console.log(details[0]);
                    }).error(function(err,status){
                        console.data(status);
                });
            //Rendering HTML from the json data and not simple json from json data
            $scope.$sce=$sce;
            $scope.HasQuiz = $stateParams.catId == "systems" ? false : true;
            $scope.quizlink = "quiz({'catId':'" + $stateParams.catId +"'})";

            var currQ=-1;
            var TotalQrys = 0;
            var queries = [];
            var CorrectAnswers = 0;
            var currAnswer = 0;
            $scope.ShowResult = false;
            $scope.ShowNext = true;
            $scope.ShowProfile = false;
            $http.get("/data/quiz.json").success(function (data){
                        queries = ($filter('filter')(data,{"topic":$stateParams.catId}));
                        //console.log(queries[0].questions[0]);
                        $scope.qry = queries[0].questions[++currQ];
                        TotalQrys = queries[0].questions.length;
                    }).error(function(err,status){
                        console.data(status);
                });
            $scope.setShowResult = function (disabled){
                disabled = true;
            };
            $scope.getShowResult = function (answer){
                return (answer > 0);
            };
            $scope.updateAnswer = function (answer){
                console.log("Answer = " + answer);
                currAnswer = answer;
            }
            $scope.DisplayResult = function (){
                if(currAnswer === $scope.qry.answeropt){
                    CorrectAnswers++;
//                    console.log("Increment correct answer " + CorrectAnswers);
                }
                //Hide the show result button 
                $scope.ShowResult = false;
                switch(CorrectAnswers){
                    case 0:
                        $scope.DisplayResultMessage="Still you can review the content and try again!! ";
                        //Show the videorerun button
                        $scope.videoRerun = true;
                        $scope.ShowRegister = false;
                        break;
                    case 1:
                    case 2:
                        $scope.DisplayResultMessage="Your Result : " + CorrectAnswers + "/" + TotalQrys + "! Claim a 5% discount now or retake the test!";
                        $scope.videoRerun = true;
                        $scope.ShowRegister = true;
                        break;
                    case 3:
                        $scope.DisplayResultMessage="Your Result : " + (CorrectAnswers/TotalQrys * 100) + "%! Claim a 10% discount now or retake the test!";
                        $scope.videoRerun = true;
                        $scope.ShowRegister = true;
                        break;
                    case 4:
                    case 5:
                        $scope.DisplayResultMessage="Congrats! Your mark : " + (CorrectAnswers/TotalQrys * 100) + "% ! Claim a 20% discount!";
                        $scope.videoRerun = false;
                        $scope.ShowRegister = true;
                        break;

                }
            }

            $scope.DisplayNextQ = function(){
                if(currAnswer === $scope.qry.answeropt){
                    CorrectAnswers++;
//                    console.log("Increment correct answer " + CorrectAnswers);
                }
                $scope.qry=queries[0].questions[++currQ];
                $scope.qry.submitAns=-1;
                currAnswer = 0 ;
                if(currQ === (TotalQrys - 1)) {
                    $scope.ShowNext = false;
                    $scope.ShowResult = true;
                }
            };

            function QuizReset (){
                var overlay = document.getElementById("overlay");
                overlay.style.visibility='hidden';
                currQ=-1;
                $scope.ShowResult = false;
                $scope.ShowNext = true;
                $scope.videoRerun = false;
                $scope.ShowRegister = false;
                $scope.DisplayResultMessage = "";
                $scope.qry=queries[0].questions[++currQ];
                $scope.qry.submitAns = -1;
            }

            $scope.RetakeExam = function (){
                QuizReset();
                var video = document.getElementById("IDvideo");
                video.play();
                video.controls=true;
            }

            $scope.RegisterUser = function (e){
                $scope.videoRerun = false;
                if(!$scope.ShowProfile){
                    $scope.ShowProfile = true;
                }
                else{
                    $state.go("training");
                }
            }
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
    .state('blogitem', {
        url: "/blogitem",
        templateUrl: "partials/blog-item.html"
    })
    .state('blog', {
        url: "/blog",
        templateUrl: "partials/blog.html"
    })

})

.run(['$rootScope','$window', function($rootScope,$window) {
    $rootScope.$on('$stateChangeSuccess',function(){
        $window.scrollTo(0,0);
    })

}])


function videoEnded(){
    var overlay = document.getElementById("overlay");
    overlay.style.visibility='visible';
    var video = document.getElementById("IDvideo");
    video.controls=false;
}
