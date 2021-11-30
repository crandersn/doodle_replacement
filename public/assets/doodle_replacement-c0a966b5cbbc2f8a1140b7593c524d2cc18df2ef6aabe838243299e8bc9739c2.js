
var schedule = MindFusion.Scheduling;

// create a new instance of the calendar from a div with id "calendar"
//declared in the HTML page
calendar = new schedule.Calendar(document.getElementById("calendar"));
calendar.licenseLocation = "config.txt"

calendar.useForms = false;

// set the view to Timetable, which displays the allotment of resources to distinct hours of a day
calendar.currentView = schedule.CalendarView.Timetable;
//set the theme to gray as referenced
calendar.theme = "light";
//format the header
calendar.timetableSettings.titleFormat = "d MMMM <br/> <b>dddd</b>";
calendar.timetableSettings.cellTime = schedule.TimeSpan.fromMinutes(30);
//sets how many days will be changed on a scroll click
calendar.timetableSettings.scrollStep = 7;
calendar.timetableSettings.showDayHeader = true;
calendar.timetableSettings.cellSize = 20;

// set the start time to 05:00 AM
calendar.timetableSettings.startTime  = 300;
// set the end time to 22:00 PM
calendar.timetableSettings.endTime = 1380;

//get the current date
var currDay = schedule.DateTime.today();
calendar.timetableSettings.dates.clear();

for (var i = 1; i < 8; i++) {
	calendar.timetableSettings.dates.add(currDay.addDays(-1 * currDay.dayOfWeek + i));
}


// handle the itemDoubleClick event to show the custom form for item editing
calendar.itemDoubleClick.addEventListener(handleItemDoubleClick);

// handle the selectionEnd event to show the custom form for item creation
calendar.selectionEnd.addEventListener(handleSelectionEnd);

function handleItemDoubleClick(sender, args) {
	// create and show the custom form
	var form = new TimeForm(sender, args.item, "edit");
	form.showForm();
}

function handleSelectionEnd(sender, args)  {
	// create a new item with the start and end time of the selection
	var item = new p.Item();
	item.startTime = args.startTime;
	item.endTime = args.endTime;

	// create and show the custom form
	var form = new TimeForm(sender, item, "new");
	form.showForm();
}

function submitPoll() {

    var pollData = {};
    var numAppointments = 0;

   var selected_time_zone = $('.time_zone_info').data('time-zone');

   var time_zone_offsets = {
        "Pacific": "8",
        "Mountain": "7",
        "Central": "6",
        "Eastern": "5"
   }

    appointments = calendar.schedule.items.forEach(function(item, index){

        var time_adjustment = 0;

        console.log(item)
        console.log(item)
        console.log(selected_time_zone)

       if (selected_time_zone != "My Time Zone") {
            var current_time_zone_offest = (item.startTime.__getTimezoneOffset())/60;
            var selected_time_zone_offset = time_zone_offsets[selected_time_zone];
            time_adjustment = selected_time_zone_offset - current_time_zone_offest
        }

        // shift time depending on the time zone selected by the user
        startTimeString = (item.startTime.addHours(time_adjustment)).__toUTCString();
        endTimeString = (item.endTime.addHours(time_adjustment)).__toUTCString();

        subject = item.subject;

        var appointment = {};
        appointment["start_time"] = startTimeString;
        appointment["end_time"] = endTimeString;
        appointment["subject"] = subject

        pollData[index] = appointment;
        numAppointments += 1;

        // console.log((new Date(item.startTime.__toUTCString())).toString())
        // console.log(item.startTime.__toString())
    });

    pollData["num_appointments"] = numAppointments

    $.post("/poll/create", pollData, function(data, status){
            alert("Data: " + data + "\nStatus: " + status);
    });
}

// render the calendar control
calendar.render();
