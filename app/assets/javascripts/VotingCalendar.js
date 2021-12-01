var schedule = MindFusion.Scheduling;

// create a new instance of the calendar from a div with id "calendar"
//declared in the HTML page
calendar = new schedule.Calendar(document.getElementById("voting-calendar"));
calendar.useForms = false;

calendar.setLicenseKey("UVVNUCU1Qk1aJTIwWiUwQ1ElMDdTJTFBUUNRJTIyUiUwRFIlMDdQJTA2UyUxMSUzQyUxMFAlMENSJTBEU0NTS1MlMERSJTBDJTA5JTBEJTEwTiUxMyUwMCUwRiUwQyUwMiUwRSUwRCUwRSUwRCUwNiUwNiUxMSUxMSUwMCUwQSUwMiUwRkMlMEYlMEElMDAlMDYlMEQlMTAlMDZK")

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


// TODO: Consider altering this to showing the week of the first poll timeslot
//get the current date
var currDay = schedule.DateTime.today();
calendar.timetableSettings.dates.clear();

for (var i = 1; i < 8; i++) {
    calendar.timetableSettings.dates.add(currDay.addDays(-1 * currDay.dayOfWeek + i));
}

// place timeslots on the calendar

var poll = $('.calendar_data').data('poll-data');
var timeslots = $('.calendar_data').data('timeslot-data');

var i = 0
var length = timeslots.length

while (i < length) {

    var item = new schedule.Item();
    var timeslot = timeslots[i];

    if (timeslot["available"] == true){

        item.startTime = new schedule.DateTime(new Date(timeslot["start_time"]));
        item.endTime = new schedule.DateTime(new Date(timeslot["end_time"]));
        item.subject = timeslot["notes"];
        item.locked = true;
        calendar.schedule.items.add(item);
    }

    i += 1;
}

// handle the itemDoubleClick event to show the custom form for item editing
calendar.itemDoubleClick.addEventListener(handleItemDoubleClick);


function handleItemDoubleClick(sender, args) {
    // create and show the custom form
    var form = new VoteForm(sender, args.item, "edit");
    form.showForm();
}


// TODO: This will obviously have to be modified
function submitVotes() {

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

        var time_adjustment = 0;

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

    });

    pollData["num_appointments"] = numAppointments

    $.post("/poll/create", pollData, function(data, status){});
}

// render the calendar control
calendar.render();
