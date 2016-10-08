//
//
//  TRAINING CTRL
//  Author: JYG
//
//
//


/* -------------------------------------------------------------- */
/* ------------------------- CONTROLLER ------------------------- */
/* -------------------------------------------------------------- */

IET.controller('TrainingCtrl', function($scope, $rootScope, $routeParams, $timeout){

 
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

        $scope.snd;
    
        /* ----- */  
    
    
    
            
        /**
        *
        * PLAY NOTE FROM KEYBOARD
        * @return void
        * @param string
        *
        */

        $scope.playNote = function(note){    
            
            $rootScope.flagSound = true;
            for(key in notes){
                if(note === key){
                    $rootScope.keyboardNotes[key].currentTime = 0;
                    $rootScope.keyboardNotes[key].play();
                }
            }

        }


        /**
        *
        * RANDOM NOTE
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
        * @return void
        * @param int 
        * @param int
        * @param bool TRUE / FALSE
        *
        */ 

        $scope.playInterval = function(note,interval,direction){
            
            $scope.interval = parseInt(interval) + 1;   // Set interval
            $scope.Note = Object.keys(notes)[note];     // Set note with notes[]
            
            
            if(direction !== 'none'){
                direction = (direction === "true") ? Boolean(direction):!Boolean(direction);    // convert STRING to BOOL 
            }
            
            // Launch Second note
            if(direction === 'none'){
                $scope.playNote($scope.Note);               // Launch playNote($scope.Note)
                $scope.playNote(Object.keys(notes)[note + $scope.interval]);
            }else{
                $scope.playNote($scope.Note);               // Launch playNote($scope.Note)
                $timeout.cancel($scope.timeout);            // Cancel $timeOut
                $scope.timeout = $timeout(function(){
                    if(direction === true){      
                        $scope.playNote(Object.keys(notes)[note + $scope.interval]);
                    }else{
                        $scope.playNote(Object.keys(notes)[note - $scope.interval]);
                    }         
                }, 1000);
            }

        }




        /**
        *
        * PLAY TRAINING INTERVAL
        * @return void
        *
        */

        $scope.playTrainingInterval = function(Maj, min, bool, note){
            
            (!note) ? $scope.note = $scope.note1 = $scope.randNum():$scope.note = $scope.note1; // if note isn't defined launch randNum() function
            
            $scope.bool1   = Math.random() < 0.5 ? Maj:min;    // Random interval
            $scope.bool2   = ($scope.bool1 != Maj) ? Maj:min;  //


            // ASCENDANT || DESCENDANT
            $scope.playInterval($scope.note,$scope.bool1,bool);
            $scope.timeout = $timeout(function(){
                $scope.playInterval($scope.note,$scope.bool2,bool);
                // Silence 1s
                $scope.timeout2 = $timeout(function(){$rootScope.flagSound = false;}, 3000);
            }, 3000);

        }



        /**
        *
        * PLAY TRAINING 
        * @return void
        *
        */

        $scope.playTraining = function(Maj, min, bool, note){
            
            if($scope.step != 10){
                $scope.showNext=false;
                $scope.playTrainingInterval(Maj, min, bool, note);
            }else{
                $scope.showReplay = false;
                $scope.showNext = false;
                $scope.showAnswer = false;
                $scope.showPopin = true;
            }
            ($scope.step < 11) ? $scope.step+=1:$scope.step=10;

        }
    
    
    
})



/* -------------------------------------------------------------- */
/* ------------------------- DIRECTIVES ------------------------- */
/* -------------------------------------------------------------- */



/**
*
* TRAINING BUTTONS
*
*/

.directive("ngAnswerOne", function($rootScope, $timeout){
    
    return {
        
        link : function(scope, element, attr){
            
            element.on('click', function(){
                
                $timeout.cancel(scope.timeout);
                $rootScope.stopOSC();
                
                if(scope.bool1 === scope.Major) {
                    element.addClass('ok');
                    scope.score += 1;
                }else{
                    element.addClass('ko');
                };     
                
            });
            
        }
        
    }
    
})

.directive("ngAnswerTwo", function($rootScope, $timeout){
    
    return {
        
        link : function(scope, element, attr){
            
            element.on('click', function(){
                
                $timeout.cancel(scope.timeout);
                $rootScope.stopOSC();
                
                if(scope.bool2 === scope.Major) {
                    element.addClass('ok');
                    scope.score += 1;
                }else{
                    element.addClass('ko');
                };
                
            });
            
        }
        
    }
    
})