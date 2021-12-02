var p = MindFusion.Scheduling;

var hoursList;

var VoteForm = function (calendar, item, type) {
    p.BaseForm.call(this, calendar, item);

    this._id = "VoteForm";
    this._type = type;
    this.headerText = "Time Slot";

}

VoteForm.prototype = Object.create(p.BaseForm.prototype);
VoteForm.prototype.constructor = VoteForm;

VoteForm.prototype.drawContent = function () {
    p.BaseForm.prototype.drawContent.call(this);

    var content = this.getContent();

    // create row for timeslot title
    row = this.row();
    row.innerHTML = "<p>" + this.item.details +  "</p>"
    content.appendChild(row);

    // Create a row for the startTime
    row = this.row();
    row.innerHTML = "<p>Start Time: " + this.item.startTime.__toLocaleTimeString() + "</p>"
    content.appendChild(row);

    // create a drop-down list for end time
    row = this.row();
    row.innerHTML = "<p>End Time: " + this.item.endTime.__toLocaleTimeString() + "</p>"
    content.appendChild(row);

    return content;
};

// override BaseForm's drawButtons method to create form buttons
VoteForm.prototype.drawButtons = function () {
    var thisObj = this;

    var btnVote = this.createButton({
        id: "btnVote",
        text: "Vote",
        events: { "click": function click(e)
            {
                return thisObj.onVoteButtonClick(e);
            }
        }
    });

    var btnRemoveVote = this.createButton({
        id: "btnRemoveVote",
        text: "Remove Vote",
        events: { click: function click(e)
            {
                return thisObj.onRemoveVoteButtonClick(e);
            }
        }
    });

    var buttons = this.row();
    buttons.classList.add("mfp-buttons-row");
    buttons.appendChild(btnVote.element);
    buttons.appendChild(btnRemoveVote.element);

    return buttons;
};

// TODO: You may want to add alert messages to both of these functions
VoteForm.prototype.onVoteButtonClick = function (e) {

    if (numVotesCast >= maxNumVotes){
        alert("You max only vote on a maximum of " + maxNumVotes + " timeslots.")
    } else if (this.item.subject == "Reserved By Me"){
        alert("You have already voted on this timeslot.")
    } else {
        this.item.subject = "Reserved By Me"

        var db_item_id = timeslotMappings[this.item.id]

        // add db id to set of items that have been noted on
        votes.add(db_item_id)

        numVotesCast += 1
    }
    
    // close the form
    this.closeForm();

    // repaint the calendar
    this.calendar.repaint(true);
};

VoteForm.prototype.onRemoveVoteButtonClick = function (e) {

    if (this.item.subject == "Reserved By Me") {
        this.item.subject = "Available"
        var db_item_id = timeslotMappings[this.item.id]
        votes.delete(db_item_id)
        numVotesCast -= 1
    }

    this.closeForm();

    this.calendar.repaint(true);
};
