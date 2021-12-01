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

    // create row for element title
    var row = this.row();
    row.innerHTML = this.localInfo.subjectCaption;
    content.appendChild(row);

    row = this.row();
    row.innerHTML = "<p>" + this.item.subject + "</p>"
    content.appendChild(row);

    // Create a row for the startTime
    row = this.row();
    row.innerHTML = "Start Time";
    content.appendChild(row);

    row = this.row();
    row.innerHTML = "<p>" + this.item.startTime + "</p>"
    content.appendChild(row);

    // create a drop-down list for end time
    row = this.row();
    row.innerHTML = "End Time";
    content.appendChild(row);

    row = this.row();
    row.innerHTML = "<p>" + this.item.endTime + "</p>"
    content.appendChild(row);

    return content;
};

// override BaseForm's drawButtons method to create form buttons
VoteForm.prototype.drawButtons = function () {
    var thisObj = this;

    var btnSave = this.createButton({
        id: "btnSave",
        text: this.localInfo.saveButtonCaption,
        events: { "click": function click(e)
            {
                return thisObj.onSaveButtonClick(e);
            }
        }
    });

    var btnCancel = this.createButton({
        id: "btnCancel",
        text: this.localInfo.cancelButtonCaption,
        events: { click: function click(e)
            {
                return thisObj.onCancelButtonClick(e);
            }
        }
    });

    var btnDelete = this.createButton({
        id: "btnDelete",
        text: this.localInfo.deleteButtonCaption,
        events: { click: function click(e)
            {
                return thisObj.onDeleteButtonClick(e);
            }
        }
    });

    var buttons = this.row();
    buttons.classList.add("mfp-buttons-row");
    buttons.appendChild(btnSave.element);
    buttons.appendChild(btnCancel.element);
    buttons.appendChild(btnDelete.element);

    return buttons;
};

VoteForm.prototype.onSaveButtonClick = function (e) {

    // remove original item from calendar
    this.calendar.schedule.items.remove(this.item);

    var startIndex = +this.getControlValue("start_time");
    var endIndex = +this.getControlValue("end_time");

    // reduce num appointments if necessary
    var numAppointments = +this.getControlValue("num_appointments");
    if (numAppointments > (endIndex - startIndex))
        numAppointments = endIndex - startIndex

    var appointmentLength = Math.floor((endIndex - startIndex)/numAppointments)

    var startTime = this.item.startTime.date.clone().addHours(startIndex * 0.5);

    // create all necessary appointments
    for (i = 0; i < numAppointments; i++) {

        // compute end time of appointment one
        var endAppointmentTime = startTime.clone().addHours(appointmentLength * 0.5);

        // add new appointment to calendar
        var calendarItem = this.item.clone();
        calendarItem.startTime = startTime;
        calendarItem.endTime = endAppointmentTime;
        calendarItem.subject = this.getControlValue("subject");
        this.calendar.schedule.items.add(calendarItem);

        startTime = endAppointmentTime

    }

    // close the form
    this.closeForm();

    // repaint the calendar
    this.calendar.repaint(true);
};

VoteForm.prototype.onCancelButtonClick = function (e) {
    this.closeForm();
};

VoteForm.prototype.onDeleteButtonClick = function (e)  {
    this.calendar.schedule.items.remove(this.item);
    this.calendar.repaint(true);
    this.closeForm();
};
