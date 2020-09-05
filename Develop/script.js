var currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
var weekDay = moment().format('dddd');

$("#currentDay").text(weekDay + " - " + currentDate);

var row = "";
var periodTime = "";
var formathour = "";
var arrayScheduleLS = [];
var scheduleTime = [];

// Create time block for each hour from 9am to 5pm 
function createLinesSchedule(){

    var line = 0

    for ( var i = 8; i <= 17; i++ ) {

        /* Create lines*/
        row = $("<div id=" + line++ + ">");
        
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
      
        var div3 = $("<button id=" + i + ">");
        $( div3 ).addClass( "col-md-1 btn saveBtn" );
        $( div3 ).attr( "title", "Save task" );
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
    else if (hour == 17){
        return "05" +  periodTime;
    }
}

        

function save(event){

    var hour = event.target.id;
    var task = $("#txt-" + hour).val();

    // get task from localstorage or set to empty array
   var arrayScheduleSave = localStorage.getItem("schedule");

    if (arrayScheduleSave) {
        scheduleTime = JSON.parse(arrayScheduleSave);

        // loop the LocalStorage array
        for (let x = 0; x < scheduleTime.length; x++) {
         
            if(scheduleTime[x][0] == hour){
                
                //delete to not duplicate task 
                scheduleTime.splice(x, 1);

            }

        }
    }

    scheduleTime.push([hour,task])
   
    // set the item in localStorage
    localStorage.setItem("schedule", JSON.stringify(scheduleTime));
}

//Create line Hour / Task / Save Button
createLinesSchedule();

//Check the document is ready to get calendar content
$(document).ready(function(){
    // get task from localstorage or set to empty array
    var arraySchedule = localStorage.getItem("schedule");

    if (arraySchedule) {
        arrayScheduleLS = JSON.parse(arraySchedule);

        for ( var i = 0; i < arrayScheduleLS.length; i++ ) {
        
        // set the calendar content from array
        $("#txt-".concat(arrayScheduleLS[i][0].toString())).text(arrayScheduleLS[i][1].toString());
        }
    }
});
    