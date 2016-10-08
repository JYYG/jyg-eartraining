var flagSound = false;
var osc;

// DEFINE CONTEXT
var context = new webkitAudioContext();


// DEFINE VOLUME CONTEXT
var volume = context.createGain();
volume.gain.value = 0.1;
volume.connect(context.destination);


// When to start playing the oscillators
var startTime = context.currentTime;





/**
*
* PLAY NOTE FROM KEYBOARD
* @param string
*
*/

function playNote(note){    

    if(flagSound === false){
        flagSound = true;
        osc = context.createOscillator();
        osc.type = 'sine';
        osc.start(startTime);
        osc.connect(volume);
        for(key in notes){
            if(note === key){
                console.log(key);
                osc.frequency.value = notes[key];
            }
        }
    }else{
        flagSound = false;     
        osc.stop(context.currentTime);
    }
    
}


/**
*
* RANDOM NOTE
* @return int
*
*/

function randNum(){    
    var rand = (14 + Math.random() * 14);
    rand = Math.floor(rand);
    return rand;
}


/**
*
* PLAY INTERVAL
* @param int 
* @param int
* @param bool TRUE / FALSE
*
*/ 

function playInterval(note,interval,bool){
    var interval = interval + 1;
    Note = Object.keys(notes)[note];
    playNote(Note);  
    clearTimeout(timeout);
    var timeout = setTimeout(function(){
        osc.stop(context.currentTime); 
        flagSound = false;
        (bool === true) ?
            playNote(Object.keys(notes)[note + interval]) 
            :
            playNote(Object.keys(notes)[note - interval]);  
        setTimeout(function(){
            osc.stop(context.currentTime);            
            flagSound = false;
        }, 1000);
    }, 1000);  
}
