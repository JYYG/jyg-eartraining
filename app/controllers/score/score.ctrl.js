IET.controller('ScoreCtrl', function($scope, $rootScope){


    $scope.items = $rootScope.IETscore;
    
    if($rootScope.IETscore.length === 0) {
        $scope.showItems = false;
    }else{
        $scope.showItems = true;
    };
    
    
});