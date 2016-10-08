//
//
//  TEST CTRL
//  Author: JYG
//
//
//


/* -------------------------------------------------------------- */
/* ------------------------- CONTROLLER ------------------------- */
/* -------------------------------------------------------------- */

IET.controller('TestCtrl', function($scope, $rootScope, $routeParams, $timeout){

 
        /* ----- */    
    
    
        // PARAMS    
        $scope.Major = $routeParams.major;
        $scope.minor = $routeParams.minor;
        $scope.direction = $routeParams.bool;
        
        $scope.bool1;
        $scope.bool2;
       
        $scope.note1;
        $scope.note2;
        $scope.score = 0;
    
        $scope.step = 1;

    
    
        /* ----- */  
    

            
            
        /**
        *
        * PLAY NOTE FROM KEYBOARD
        *
        * @param string
        * @return void
        *
        */

        $scope.playNote = function(note){    
            
            $rootScope.flagSound = true;
            for(key in notes){
                if(note === key){
                    $rootScope.keyboardNotes[key].currentTime = 0.000000;
                    $rootScope.keyboardNotes[key].play();
                }
            }

        }


        /**
        *
        * RANDOM NOTE
        *
        * @return int
        *
        */

        $scope.randNum = function(){    
            var rand = (14 + Math.random() * 14);
            rand = Math.floor(rand);
            return rand;
        }


        /**
        *
        * PLAY INTERVAL
        *
        * @param int 
        * @param int
        * @param bool TRUE / FALSE
        * @return void
        *
        */ 

        $scope.playInterval = function(note1,note2){
            
            $scope.playNote(Object.keys(notes)[note1]); // Launch playNote($scope.Note)
            $timeout.cancel($scope.timeout);            // Cancel $timeOut
            
            // Launch Second note
            $scope.timeout = $timeout(function(){
//                $rootScope.stopOSC();
                $rootScope.flagSound = false;   
                $scope.playNote(Object.keys(notes)[note2]);
                // Silence 1s
                $scope.timeout2 = $timeout(function(){
//                    $rootScope.stopOSC();
                    $rootScope.flagSound = false;   
                }, 1000);
            }, 1000);

        }




        /**
        *
        * PLAY TRAINING INTERVAL
        *
        * @return void
        *
        */

        $scope.playTrainingInterval = function(note1, note2){
            
            $scope.note1 = (!note1) ? $scope.randNum():note1;
            $scope.note2 = (!note2) ? $scope.randNum():note2;
            
            $scope.interval = ($scope.note1 >= $scope.note2) ? $scope.note1 - $scope.note2:$scope.note2 - $scope.note1;
            console.log($scope.note1 + " - " + $scope.note2 + " = " + $scope.interval);
            
            // ASCENDANT || DESCENDANT
            $scope.playInterval($scope.note1, $scope.note2);

        }



        /**
        *
        * PLAY TRAINING 
        *
        * @return void
        *
        */

        $scope.playTraining = function(){
            
            if($scope.step != 10){
                /* Flags show buttons */
                $scope.showNext=false;
                $scope.playTrainingInterval();
            }else{
                
                /* Flags show buttons */
                $scope.showReplay = false;
                $scope.showNext = false;
                $scope.showAnswer = false;             
                $scope.showPopin = true;
                
                /* Set in localstorage */
                $scope.d = new Date();
                $scope.today = ($scope.d.getDate() +1 < 10) ? "0"+(parseInt($scope.d.getDate())):(parseInt($scope.d.getDate()));
                $scope.month = ($scope.d.getMonth() +1 < 10) ? "0"+(parseInt($scope.d.getMonth()) + 1):(parseInt($scope.d.getMonth()) + 1);
                $scope.actualScore = {"date":$scope.today+"/"+$scope.month+"/"+$scope.d.getFullYear() + " - " + $scope.d.toLocaleTimeString(), "score":$scope.score};
                console.log($scope.actualScore);
                $rootScope.IETscore.push($scope.actualScore);
                localStorage.removeItem("IETscore");
                localStorage.setItem("IETscore", angular.toJson($rootScope.IETscore));
                console.log($rootScope.IETscore);
                
            }
            ($scope.step < 11) ? $scope.step+=1:$scope.step=10;

        }
    
    
    
})





/* -------------------------------------------------------------- */
/* ------------------------- DIRECTIVES ------------------------- */
/* -------------------------------------------------------------- */


/**
*
* TEST BUTTONS
*
*/

.directive("ngAnswerUnison", function($rootScope, $timeout){
    
    return {
        
        link : function(scope, element, attr){
            
            element.on('click', function(){
                
                if(scope.interval === 0) {
                    element.addClass('ok');
                    scope.score += 1;
                }else{
                    element.addClass('ko');
                    $('button[data-interval='+scope.interval+']').addClass('ok');
                };     
                $timeout.cancel(scope.timeout);
                $rootScope.stopOSC();
                
            });
            
        }
        
    }
    
})

.directive("ngAnswerSecondMinor", function($rootScope, $timeout){
    
    return {
        
        link : function(scope, element, attr){
            
            element.on('click', function(){
                
                if(scope.interval === 1) {
                    element.addClass('ok');
                    scope.score += 1;
                }else{
                    element.addClass('ko');
                    $('button[data-interval='+scope.interval+']').addClass('ok');
                };
                $timeout.cancel(scope.timeout);
                $rootScope.stopOSC();
                
            });
            
        }
        
    }
    
})

.directive("ngAnswerSecondMajor", function($rootScope, $timeout){
    
    return {
        
        link : function(scope, element, attr){
            
            element.on('click', function(){
                
                if(scope.interval === 2) {
                    element.addClass('ok');
                    scope.score += 1;
                }else{
                    element.addClass('ko');
                    $('button[data-interval='+scope.interval+']').addClass('ok');
                };
                $timeout.cancel(scope.timeout);
                $rootScope.stopOSC();
                
            });
            
        }
        
    }
    
})

.directive("ngAnswerThirdMinor", function($rootScope, $timeout){
    
    return {
        
        link : function(scope, element, attr){
            
            element.on('click', function(){
                
                if(scope.interval === 3) {
                    element.addClass('ok');
                    scope.score += 1;
                }else{
                    element.addClass('ko');
                    $('button[data-interval='+scope.interval+']').addClass('ok');
                };
                $timeout.cancel(scope.timeout);
                $rootScope.stopOSC();
                
            });
            
        }
        
    }
    
})

.directive("ngAnswerThirdMajor", function($rootScope, $timeout){
    
    return {
        
        link : function(scope, element, attr){
            
            element.on('click', function(){
                
                if(scope.interval === 4) {
                    element.addClass('ok');
                    scope.score += 1;
                }else{
                    element.addClass('ko');
                    $('button[data-interval='+scope.interval+']').addClass('ok');
                };
                $timeout.cancel(scope.timeout);
                $rootScope.stopOSC();
                
            });
            
        }
        
    }
    
})

.directive("ngAnswerFourth", function($rootScope, $timeout){
    
    return {
        
        link : function(scope, element, attr){
            
            element.on('click', function(){
                
                if(scope.interval === 5) {
                    element.addClass('ok');
                    scope.score += 1;
                }else{
                    element.addClass('ko');
                    $('button[data-interval='+scope.interval+']').addClass('ok');
                };
                $timeout.cancel(scope.timeout);
                $rootScope.stopOSC();
                
            });
            
        }
        
    }
    
})

.directive("ngAnswerTriton", function($rootScope, $timeout){
    
    return {
        
        link : function(scope, element, attr){
            
            element.on('click', function(){
                
                if(scope.interval === 6) {
                    element.addClass('ok');
                    scope.score += 1;
                }else{
                    element.addClass('ko');
                    $('button[data-interval='+scope.interval+']').addClass('ok');
                };
                $timeout.cancel(scope.timeout);
                $rootScope.stopOSC();
                
            });
            
        }
        
    }
    
})

.directive("ngAnswerFifth", function($rootScope, $timeout){
    
    return {
        
        link : function(scope, element, attr){
            
            element.on('click', function(){
                
                if(scope.interval === 7) {
                    element.addClass('ok');
                    scope.score += 1;
                }else{
                    element.addClass('ko');
                    $('button[data-interval='+scope.interval+']').addClass('ok');
                };
                $timeout.cancel(scope.timeout);
                $rootScope.stopOSC();
                
            });
            
        }
        
    }
    
})

.directive("ngAnswerSixthMinor", function($rootScope, $timeout){
    
    return {
        
        link : function(scope, element, attr){
            
            element.on('click', function(){
                
                if(scope.interval === 8) {
                    element.addClass('ok');
                    scope.score += 1;
                }else{
                    element.addClass('ko');
                    $('button[data-interval='+scope.interval+']').addClass('ok');
                };
                $timeout.cancel(scope.timeout);
                $rootScope.stopOSC();
                
            });
            
        }
        
    }
    
})

.directive("ngAnswerSixthMajor", function($rootScope, $timeout){
    
    return {
        
        link : function(scope, element, attr){
            
            element.on('click', function(){
                
                if(scope.interval === 9) {
                    element.addClass('ok');
                    scope.score += 1;
                }else{
                    element.addClass('ko');
                    $('button[data-interval='+scope.interval+']').addClass('ok');
                };
                $timeout.cancel(scope.timeout);
                $rootScope.stopOSC();
                
            });
            
        }
        
    }
    
})

.directive("ngAnswerSeventhMinor", function($rootScope, $timeout){
    
    return {
        
        link : function(scope, element, attr){
            
            element.on('click', function(){
                
                if(scope.interval === 10) {
                    element.addClass('ok');
                    scope.score += 1;
                }else{
                    element.addClass('ko');
                    $('button[data-interval='+scope.interval+']').addClass('ok');
                };
                $timeout.cancel(scope.timeout);
                $rootScope.stopOSC();
                
            });
            
        }
        
    }
    
})

.directive("ngAnswerSeventhMajor", function($rootScope, $timeout){
    
    return {
        
        link : function(scope, element, attr){
            
            element.on('click', function(){
                
                if(scope.interval === 11) {
                    element.addClass('ok');
                    scope.score += 1;
                }else{
                    element.addClass('ko');
                    $('button[data-interval='+scope.interval+']').addClass('ok');
                };
                $timeout.cancel(scope.timeout);
                $rootScope.stopOSC();
                
            });
            
        }
        
    }
    
})

.directive("ngAnswerOctave", function($rootScope, $timeout){
    
    return {
        
        link : function(scope, element, attr){
            
            element.on('click', function(){
                
                if(scope.interval === 12) {
                    element.addClass('ok');
                    scope.score += 1;
                }else{
                    element.addClass('ko');
                    $('button[data-interval='+scope.interval+']').addClass('ok');
                };
                $timeout.cancel(scope.timeout);
                $rootScope.stopOSC();
                
            });
            
        }
        
    }
    
})

.directive("ngAnswerNinthMinor", function($rootScope, $timeout){
    
    return {
        
        link : function(scope, element, attr){
            
            element.on('click', function(){
                
                if(scope.interval === 13) {
                    element.addClass('ok');
                    scope.score += 1;
                }else{
                    element.addClass('ko');
                    $('button[data-interval='+scope.interval+']').addClass('ok');
                };
                $timeout.cancel(scope.timeout);
                $rootScope.stopOSC();
                
            });
            
        }
        
    }
    
})

.directive("ngAnswerNinthMajor", function($rootScope, $timeout){
    
    return {
        
        link : function(scope, element, attr){
            
            element.on('click', function(){
                
                if(scope.interval === 14) {
                    element.addClass('ok');
                    scope.score += 1;
                }else{
                    element.addClass('ko');
                    $('button[data-interval='+scope.interval+']').addClass('ok');
                };
                $timeout.cancel(scope.timeout);
                $rootScope.stopOSC();
                
            });
            
        }
        
    }
    
})
