//
//
//  KEYBOARD CTRL
//  Author: JYG
//
//
//


/* -------------------------------------------------------------- */
/* ------------------------- CONTROLLER ------------------------- */
/* -------------------------------------------------------------- */

IET.controller('KeyboardCtrl', function($scope, $rootScope){

    
        /**
        *
        * PLAY NOTE FROM KEYBOARD
        * @param string
        *
        */

        $scope.playNote = function(note){    
            
            for(key in notes){
                if(note === key){
                    $rootScope.keyboardNotes[key].pause();
                    $rootScope.keyboardNotes[key].currentTime = 0.0;
                    $rootScope.keyboardNotes[key].play();
                }
            }

        }
    
    
})


/* --------------------------------------------------------------- */
/* ------------------------- DIRECTIVES -------------------------- */
/* --------------------------------------------------------------- */


.directive('ngTouch', function($rootScope){
    
    return {
        
        link: function(scope, element, attr){
            element.on('touchstart', function(){
                scope.playNote(attr.id);
            });
//            element.on('touchmove', function(){
////                console.log(attr.id);
//                scope.playNote(attr.id);
//            });
        }
        
    }
    
})
