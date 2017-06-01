$(document).ready(function(){
  var beep = $('#beep')[0];
  var clockOn = false;
  var secT;
  var pause = false;
  var workT = parseInt($('#workTime').html());
  var breakT = parseInt($('#breakTime').html());
  
 
  
  
  $('#start').click(function(){
    var workS = workT * 60;
    var breakS = breakT * 60;
   
    var count = setInterval(updateTimer, 1000);
    
    
    function updateTimer(){
      
      //hiding
      $('#timerButtons').hide();
      $('#resetBox').hide();
      $('#periodType').html('Work!');
      
      if(!pause){
        workS -= 1;
      }
      var convertWork = timeConvert(workS);
      if(workS <= 0){
        //$('#timerButtons').show();
        //$('#resetBox').show();
        //$('#periodType').html('');
        clearInterval(count);
        workT = parseInt($('#workTime').html());
        //$('#periodType').html('Break!');
        $('#timer').html(convertWork);
        beep.play();
        var breakStart = setInterval(updateBTimer, 1000);
      }
      if(workS !== 0){
        $('#timer').html(convertWork);
      }
      
      function updateBTimer(){
       $('#periodType').html('Break!');
      if (!pause){
        breakS-=1;
      }
      var convertBreak = timeConvert(breakS);
      if(breakS === 0){
        clearInterval(breakStart);
        breakT = parseInt($('#breakTime').html());
        $('#timerButtons').show();
        $('#resetBox').show();
        $('#periodType').html('');
        $('#timer').html(convertBreak);
        
        beep.play();
      }
      if(breakT !== 0){
        $('#timer').html(convertBreak);
      }
     }
      
    }
    
    
   });
    
  
  //Converts seconds (from earlier converted minutes) to the hour:minute:second format.
  function timeConvert(seconds){
    
    var hour = Math.floor(seconds/3600); 
    var minute = Math.floor(seconds%3600/60);
    var second = Math.floor(seconds%3600%60);
    //Keeps consistent digits
    if(minute.toString().length == 1 && hour > 0){
      minute = '0'+minute;
    }
    if(second.toString().length == 1){
      second = '0'+second;
    }
    if(hour > 0){
      return hour+':'+minute+':'+second;
    }
    else if(hour == 0 && minute > 0){
      return minute+':'+second;
    }
    else{
      return '00:'+second;
    }
  }
 
  //work time up
  $('#workTimePlus').click(function(){
    if(clockOn === false){
      if(workT<240){
        workT+=1;
        secT = workT*60;
        $('#workTime').html(' '+workT+' ');
        $('#timer').html(workT+':00');
      }
    
      else{
        workT = 120;
        $('#workTime').html(' '+workT+' ');
        $('#timer').html(workT+':00');
      }
    }
  });
   //work time down
    $('#workTimeMinus').click(function(){
    //testarossa
     
        if(workT>1){
          workT-=1;
          $('#workTime').html(' '+workT+' ');
          $('#timer').html(workT+':00');
        }
    
        else{
          workT = 1;
          $('#workTime').html(' '+workT+' ');
          $('#timer').html(workT+':00');
        }
      
    });
    //break time up (+)
   $('#breakTimePlus').click(function(){
   
      
      if(breakT<60){
        breakT+=1;
        $('#breakTime').html(' '+breakT+' ');
      }
    
      else{
        breakT = 5;
        $('#breakTime').html(' '+breakT+' ');
      }
      
    
  });
  
    $('#breakTimeMinus').click(function(){
      
      
        if(breakT>1){
          breakT-=1;
          $('#breakTime').html(' '+breakT+' ');
        }
    
        else{
          breakT = 1;
          $('#breakTime').html(' '+breakT+' ');
        }
        
      
    });
  
    $('#timerC').click(function(){
      if(pause === false){
        pause = true;
        console.log(pause);
      }
      else if(pause === true){
        pause = false;
        console.log(pause);
      }
    });
  
    function reset(){
      
      breakT = 5;
      workT = 25;
      $('#timerButtons').show();
      $('#resetBox').show();
      $('#periodType').html('');
      $('#breakTime').html(' '+breakT+' ');
      $('#workTime').html(' '+workT+' ');
      $('#timer').html(workT+':00'); 
    }
  
  $('#reset').click(reset);
    
    
});