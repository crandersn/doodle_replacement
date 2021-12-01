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
    row.innerHTML = "<p>Notes:" + this.item.subject + "</p>"
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

VoteForm.prototype.onVoteButtonClick = function (e) {

    
    // close the form
    this.closeForm();

    // repaint the calendar
    this.calendar.repaint(true);
};

VoteForm.prototype.onRemoveVoteButtonClick = function (e) {
    this.closeForm();
};
