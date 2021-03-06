var schedule = MindFusion.Scheduling;

// create a new instance of the calendar from a div with id "calendar"
//declared in the HTML page
calendar = new schedule.Calendar(document.getElementById("calendar"));
calendar.useForms = false;

calendar.setLicenseKey("UVVNUCU1Qk1aJTIwWiUwQ1ElMDdTJTFBUUNRJTIyUiUwRFIlMDdQJTA2UyUxMSUzQyUxMFAlMENSJTBEU0NTS1MlMERSJTBDJTA5JTBEJTEwTiUxMyUwMCUwRiUwQyUwMiUwRSUwRCUwRSUwRCUwNiUwNiUxMSUxMSUwMCUwQSUwMiUwRkMlMEYlMEElMDAlMDYlMEQlMTAlMDZK")

// set the view to Timetable, which displays the allotment of resources to distinct hours of a day
calendar.currentView = schedule.CalendarView.Timetable;
//set the theme to gray as referenced
calendar.theme = "light";
//format the header
calendar.timetableSettings.titleFormat = "d MMMM <br/> <b>dddd</b>";
calendar.timetableSettings.cellTime = schedule.TimeSpan.fromMinutes(15);
//sets how many days will be changed on a scroll click
calendar.timetableSettings.scrollStep = 7;
calendar.timetableSettings.showDayHeader = true;
calendar.timetableSettings.cellSize = 28;

// set the start time to 05:00 AM
calendar.timetableSettings.startTime  = 300;
// set the end time to 22:00 PM
calendar.timetableSettings.endTime = 1380;

// Don't Use International Time
calendar.timetableSettings.twelveHourFormat = true;

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
        "PST": "8",
        "MST": "7",
        "CST": "6",
        "EST": "5"
   }

    appointments = calendar.schedule.items.forEach(function(item, index){

        console.log("before if: " + item.startTime);
        console.log("before if: " + item.endTime);

        var time_adjustment = 0;

        if (selected_time_zone != "My Time Zone") {
            var current_time_zone_offest = ((new Date()).getTimezoneOffset()) / 60;
            var selected_time_zone_offset = time_zone_offsets[selected_time_zone];
            time_adjustment = selected_time_zone_offset - current_time_zone_offest;
        }

        // shift time depending on the time zone selected by the user
        var startDate = new Date(item.startTime.__toUTCString())
        startDate.setHours(startDate.getHours() + time_adjustment)
        var startTimeString = startDate.toUTCString()

        var endDate = new Date(item.endTime.__toUTCString())
        endDate.setHours(endDate.getHours() + time_adjustment)
        var endTimeString = endDate.toUTCString()

        var subject = item.clone().subject;

        var appointment = {};
        appointment["start_time"] = startTimeString;
        appointment["end_time"] = endTimeString;
        appointment["subject"] = subject

        pollData[index] = appointment;
        numAppointments += 1;

    });

    pollData["num_appointments"] = numAppointments

    $.post("/poll/create", pollData, function(data, status){});
}

// render the calendar control
calendar.render();
