var flagSound = false;




/**
*
* PLAY NOTE FROM KEYBOARD
* @param string
*
*/

function playNote(note){    

    if(flagSound === false){
        flagSound = true;
        for(key in notes){
            if(note === key){
                var snd = new Audio("sounds/piano/" + notes[key] + ".wav");
                snd.play();
            }
        }
    }else{
        flagSound = false;
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
        flagSound = false;
        var snd = new Audio("sounds/piano/" + notes[key] + ".wav");
        snd.play();
        setTimeout(function(){         
            flagSound = false;
        }, 1000);
    }, 1000);  
}
