var note1,
    note2,
    score;


/**
*
* PLAY TRAINING INTERVAL
*
*/

function playTrainingInterval(Maj, min, bool){
    
    var note = note1 = randNum();               // Random note
    var bool1 = Math.random() < 0.5 ? Maj:min;  // Random interval
    var bool2 = (bool1 != Maj) ? Maj:min;       //
        
    
    // ASCENDANT || DESCENDANT
    playInterval(note,bool1,bool);
    setTimeout(function(){playInterval(note,bool2,bool)}, 3000);
    
    
    // Question
    setTimeout(function(){
        var question = confirm("Quel interval est majeure ?");
        if(question === true){
            if(bool1 === Maj) {alert("OK")}else{alert("KO")};
        }else{            
            if(bool2 === Maj) {alert("OK")}else{alert("KO")};         
        }
    }, 5500);
    
}