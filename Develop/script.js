var currentDate = moment().format();

$("#currentDay").text(currentDate);


//var a = moment(currentDate, "HH");
//console.log(a);
var row = "";
var periodTime = "";
var formathour = "";
arrayScheduleLS = [];


var schedule = {
    8 : "",
    9 : "",
    10 : "",
    11 : "",
    12 : "",
    13 : "",
    14 : "",
    15 : "",
    16 : "",
    17 : ""
}


// Create time block for each hour from 9am to 5pm 
function createLinesSchedule(){
    for ( var i = 8; i <= 17; i++ ) {

        /* Create lines*/
        row = $("<div id=hour-" + i + ">");
        
        //Check the time to add CSS past / present / future
        addCssSlottime(i)

        //AM before midday, and PM after midday in each line.
        periodTime = (i < 12)? periodTime = " AM" : periodTime = " PM";

        //Format hour schedule AM or PM 
        var showHour = formatHour(i);
        
        /* Create div's */
        var div1 = $("<div id=hour-" + i + ">");
        $( div1 ).addClass( "col-md-1 hour" );
        $( div1 ).text(showHour);
        
        var div2 = $("<textarea id=txt-" + i + ">");
        $( div2 ).addClass( "col-md-10 description" );
        //$( div2 ).text(i + "Teste Adriana"); 

        var div3 = $("<button id=" + i + ">");
        $( div3 ).addClass( "col-md-1 btn saveBtn" );
        $( div3 ).on( "click", save );
       
        $( row ).append(( $( div1 ) )).append(( $( div2 ) )).append(( $( div3 ) ))
        $( ".container" ).append( $( row ) );
    }
}

//Check the time to add CSS past / present / future
function addCssSlottime(time)
{
    //Check time == current hour
    if (time == moment().format("HH")){
        $( row ).addClass( "row time-block present" );
    }
    //Check time < current hour
    else if(time < moment().format("HH")){
        $( row ).addClass( "row time-block past" );
    }
    //Otherwise time > current hour
    else{
       $( row ).addClass( "row time-block future" );
    }
}

// Format hour schedule to AM or PM
function formatHour(hour){
    if (hour < 10){
        return "0" + hour + periodTime;
    } 
    else if (hour >=10 && hour <=12){
        return hour +  periodTime;
    }
    else if (hour == 13){
        return "01" +  periodTime;
    }
    else if (hour == 14){
        return ("02" +  periodTime);
    }
    else if (hour == 15){
        return "03" +  periodTime;
    }
    else if (hour == 16){
        return "04" +  periodTime;
    }
    else {
        return "05" +  periodTime;
    }
}

        

function save(event){
    //debugger
    //alert(event.target.parentElement.id);
    //alert($("#txt-9").val());
    //console.log(event.currentTarget);
    // var txt = $("#txt-9").val(); 
    // alert(txt); 

    var line = event.target.id;
    var hour = event.target.parentElement.id;
    var task = $("#txt-" + line).val();


    // format new task object for schedule
    schedule[line] = task;
   
    // set the item in localStorage
    localStorage.setItem('schedule', JSON.stringify(schedule));
      

    // either get scores from localstorage or set to empty array
    var arraySchedule = localStorage.getItem("schedule");

    if (arraySchedule) {
        arrayScheduleLS = JSON.parse(arraySchedule);
    }

    console.log(arrayScheduleLS)
}

createLinesSchedule();
    