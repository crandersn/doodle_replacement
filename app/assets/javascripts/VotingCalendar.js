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


// TODO: Consider altering this to showing the week of the first poll timeslot
//get the current date
var currDay = schedule.DateTime.today();
calendar.timetableSettings.dates.clear();

for (var i = 1; i < 8; i++) {
    calendar.timetableSettings.dates.add(currDay.addDays(-1 * currDay.dayOfWeek + i));
}

// initialize vote data variable
var timeslotMappings = {}

// place timeslots on the calendar
var poll = $('.calendar_data').data('poll-data');
var timeslots = $('.calendar_data').data('timeslot-data');
var i = 0
var length = timeslots.length

// initialize variables to keep track of voting
var votesPerPerson = parseInt(poll["votes_per_timeslot"])
var maxNumVotes = parseInt(poll["votes_per_person"])
var numVotesCast = 0

var votes = new Set();

while (i < length) {

    var item = new schedule.Item();
    var timeslot = timeslots[i];

    item.startTime = new schedule.DateTime(new Date(timeslot["start_time"]));
    item.endTime = new schedule.DateTime(new Date(timeslot["end_time"]));

    if (timeslot["available"] == true){
        item.subject = "Available";
    } else {
        item.subject = "Reserved";
    }
    item.details = "Notes: " + timeslot["notes"];
    item.locked = true;
    calendar.schedule.items.add(item);

    timeslotMappings[item.id] = timeslot["id"]

    i += 1;
}

// handle the itemDoubleClick event to show the custom form for item editing
calendar.itemDoubleClick.addEventListener(handleItemDoubleClick);


function handleItemDoubleClick(sender, args) {

    // dont show form for reserved timeslots
    if (args.item.subject != "Reserved"){
        // create and show the custom form
        var form = new VoteForm(sender, args.item, "edit");
        form.showForm();
    }
}


function submitVotes() {

    var votingData = {}

    var username = $('#username').val()

    if (username == ""){
        alert("Please enter your name before hitting submit...")
        return
    }

    votingData["person"] = username
    votingData["votes_per_person"] = maxNumVotes
    votingData["votes_per_timeslot"] = votesPerPerson
    votingData["votes"] = Array.from(votes)

    if (votes.size > 0){
        $.post("/poll/cast_vote", votingData, function(data, status){});
    } else {
        alert("Please reserve at least one time slot before submitting.")
    }
}

// render the calendar control
calendar.render();
