//
//
//  METRONOME CTRL
//  Author: JYG
//
//
//

/* -------------------------------------------------------------- */
/* ------------------------- CONTROLLER ------------------------- */
/* -------------------------------------------------------------- */

IET.controller('MetronomeCtrl', function($scope, $rootScope, $routeParams, $interval, $timeout, $http){
  
        
        $scope.tempoValue = 120;        // Tempo default value
        
        $scope.flagMetronome = false;
        $scope.flagTap = false;
        $scope.tap1 = 0;
        $scope.tap2 = 0;
        $scope.date;    
    
    
        /* ----- */            
        
    
        /**
        *
        * PLAY TICK
        * @param string
        *
        */

        $scope.playNote = function(){    
                        
            $rootScope.flagSound = true;
            
            $rootScope.soundURL("sounds/tick.wav");

            $rootScope.getSound.onload = function(){
                $rootScope.context.decodeAudioData($rootScope.getSound.response, function(buffer){
                    $rootScope.playBuffer(buffer);
                }, function(error){
                    console.error(error);
                });
            }
            $rootScope.getSound.send();
            
        }
        
        
        
        /**
        *
        * SET TEMPO VALUE
        * @return void
        *
        */

        $scope.setTempoValue = function(tempo){
            
            $scope.tempoValue = tempo;
            
        }
                
        
        
        /**
        *
        * PLAY METRONOME
        * @return void
        *
        */

        $scope.playMetronome = function(tempo){            
            
//            $scope.audioTick.pause();
//            $scope.audioTick.currentTime = 0;
            $scope.flagMetronome = true;
            $interval.cancel($scope.interval);            // Cancel $interval
            $timeout.cancel($scope.timeout);              // Cancel $timeOut
            $scope.interval = $interval(function(){
                $scope.playNote();
            }, (60*1000)/parseInt(tempo) );
            
        }
                    
        
        
        /**
        *
        * STOP METRONOME
        *
        */

        $scope.stopMetronome = function(){
            
//            $rootScope.stopOSC();
            if($scope.flagMetronome === true){
                $rootScope.source.disconnect($rootScope.context.destination);
                $scope.flagMetronome = false;
                $rootScope.flagSound = false;
                $interval.cancel($scope.interval);            // Cancel $interval
                $timeout.cancel($scope.timeout);              // Cancel $timeOut
            }
            
        }
        
        
        /**
        *
        * TAP TEMPO
        * @return void
        *
        */

        $scope.tapTempo = function(){
            
//            $rootScope.stopOSC();
            if($scope.flagMetronome === true){
                $rootScope.source.disconnect($rootScope.context.destination);
            };
            $scope.date = new Date();

            $scope.tap1 = $scope.tap2;
            $scope.tap2 = $scope.date;            
            $scope.subTap = $scope.tap2 - $scope.tap1;
            $scope.results = parseInt((60*1000)/($scope.subTap));

            if($scope.tap1 !== 0){
                if($scope.results > 34 && $scope.results < 226){
                    $scope.tempoValue = $scope.results; 
                    $scope.tempoChange($scope.tempoValue); 
                }
            };
            
        }
        
        
        
        
        /**
        *
        * TEMPO CHANGE
        * @return void
        *
        */

        $scope.tempoChange = function(tempo){
            
            (!$scope.flagMetronome) ? $scope.setTempoValue(tempo):$scope.playMetronome(tempo);
            
        }
        
        
})