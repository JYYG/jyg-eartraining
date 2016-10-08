//
//
//  APP SETTINGS
//  Author: JYG
//
//
//



/**
*
*   FAST CLICK
*
*/

window.addEventListener('load', function() {
    new FastClick(document.body);
}, false);



/* ----- */



/* ---------------------------------------------------------------- */
/* ------------------------- APPLICATION -------------------------- */
/* ---------------------------------------------------------------- */

var IET = angular.module("IET", ["ngRoute", "ngCordova", "ngAnimate", "ngTouch"]);





/* ---------------------------------------------------------------- */
/* ------------------------- MAIN CTRL ---------------------------- */
/* ---------------------------------------------------------------- */


IET.controller("MainCtrl", function($scope, $rootScope, $http, $cordovaNativeAudio){
    
    
    
        /**
        *
        * CORDOVA SETTINGS
        *
        */

        document.addEventListener("deviceready", function () {
            
            console.log("deviceready");
            $cordovaNativeAudio.preloadSimple('tick', 'sounds/tick.wav');
            $cordovaNativeAudio.play('click');
            console.log("end deviceready");
            
        }, false);
    
    
    

        /**
        *
        * SOUNDS SETTINGS
        *
        */
        
        $rootScope.animDir = false;
        $rootScope.flagSound = false;

    
        // DEFINE CONTEXT
        $rootScope.context = new window.webkitAudioContext;
    
        // OSCILLATOR
//        $rootScope.startTime = $rootScope.context.currentTime;      
//        $rootScope.osc = $rootScope.context.createOscillator();
//        $rootScope.osc.type = 'sine';
//        $rootScope.osc.frequency.value = 440;                       // Default oscillator frequency (A4)
//        $rootScope.osc.start($rootScope.startTime);                 // Cannot be call more than once
        
        // DEFINE VOLUME CONTEXT
//        $rootScope.volume = $rootScope.context.createGain();
//        $rootScope.volume.gain.value = 0.5;
//        $rootScope.volume.connect($rootScope.context.destination);
    
    
    
        $rootScope.getSound = new XMLHttpRequest();
        $rootScope.source;

        $rootScope.soundURL = function(url){
            $rootScope.getSound.open("GET", url, true);
            $rootScope.getSound.responseType = "arraybuffer";
        }
    
        $rootScope.playBuffer = function(buffer){
            $rootScope.context.close();
            $rootScope.context = new window.webkitAudioContext;
            $rootScope.source = $rootScope.context.createBufferSource();
            $rootScope.source.buffer = buffer;
            $rootScope.source.connect($rootScope.context.destination);
            $rootScope.source.start(0);
        }
    
        
        
        
        // CREATE KEYBOARD SOUNDS VARIABLES        
        $rootScope.keyboardNotes = [];
    
        for(key in notes){
            $rootScope.keyboardNotes[key] = new Audio("sounds/piano/" + notes[key] + ".wav");
        }
    
        
        
    
    
        /**
        *
        * STOP osc
        *
        * @param string
        *
        */

        $rootScope.stopOSC = function(){    
//            $rootScope.osc.disconnect();
            $rootScope.flagSound = false;   
        }
    
    
        /**
        *
        * GET Score local storage
        *
        */
    
        $rootScope.IETscore = (!localStorage.getItem("IETscore")) ? []:JSON.parse(localStorage.getItem("IETscore"));
        console.log($rootScope.IETscore);
    
    
        
    
});


/* -------------------------------------------------------------- */
/* --------------------------- CONFIGS -------------------------- */
/* -------------------------------------------------------------- */


IET.config(['$routeProvider', function($routeProvider, $locationProvider){
    
    
    $routeProvider  
        
    
        /* ------ MAIN LINKS ------ */


        /* -------------- */
        /*      HOME      */
        /* -------------- */
        .when('/', {
            templateUrl : 'app/views/home/home.tpl.html',
            controller  : 'HomeCtrl'
        })		 
        
        /* ----------------------- */
        /*      TRAINING MENU      */
        /* ----------------------- */
        .when('/training-menu', {
            templateUrl : 'app/views/training-menu/training-menu.tpl.html',
            controller  : 'TrainingMenuCtrl'
        })		 
    
        /* ------------------ */
        /*      TRAINING      */
        /* ------------------ */
        .when('/training/:major/:minor/:bool', {
            templateUrl : 'app/views/training/training.tpl.html',
            controller  : 'TrainingCtrl'
        })		 
    
        /* -------------- */
        /*      TEST      */
        /* -------------- */
        .when('/test', {
            templateUrl : 'app/views/test/test.tpl.html',
            controller  : 'TestCtrl'
        })		 
    
        /* --------------- */
        /*      SCORE      */
        /* --------------- */
        .when('/score', {
            templateUrl : 'app/views/score/score.tpl.html',
            controller  : 'ScoreCtrl'
        })		 
    
        /* ------------------ */
        /*      KEYBOARD      */
        /* ------------------ */
        .when('/keyboard', {
            templateUrl : 'app/views/keyboard/keyboard.tpl.html',
            controller  : 'KeyboardCtrl'
        })		 
    
        /* ------------------- */
        /*      METRONOME      */
        /* ------------------- */
        .when('/metronome', {
            templateUrl : 'app/views/metronome/metronome.tpl.html',
            controller  : 'MetronomeCtrl'
        })		 
    
        /* */
        .otherwise({
            redirectTo : "/"
        });
    
    
}])






/* -------------------------------------------------------------- */
/* ------------------------- DIRECTIVES ------------------------- */
/* -------------------------------------------------------------- */



// NG-ROUTE LOADING 
/*
.directive('routeLoadingIndicator', function($rootScope){
    return {
        restrict: 'E',
        template: 
            '<div class="loading-indicator disTable" style="top: 0; left: 0; position: absolute; z-index:0; width: 100%; height: 100%;"><div ng-show="isRouteLoading" class="" style=" display: table-cell; text-align: center; color: white; vertical-align: middle; ">'+
                'CHARGEMENT ...'+
            '</div></div>',
        replace: true, 
        link: function(scope, elem, attrs){
            scope.isRouteLoading = false;
            
            $rootScope.$on('$routeChangeStart', function(){
                scope.isRouteLoading = true;
                $('#MainView').hide();
                elem.show();
//                console.log("change start");
            });
            
            $rootScope.$on('$routeChangeSuccess', function(){
                $('#MainView').show();
                scope.isRouteLoading = false; 
                elem.hide();
//                console.log("change success");
            });
        }
    }
})
*/





.directive("ngNextButton", function($document){
    
    return {
        
        link : function(scope, element, attr){
            
            element.on('click', function(){
               
                $('button.ok').removeClass('ok');
                $('button.ko').removeClass('ko');
                
            });
            
        }
        
    }
    
})

