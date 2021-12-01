var p = MindFusion.Scheduling;

var hoursList;

var TimeForm = function (calendar, item, type) {
	p.BaseForm.call(this, calendar, item);

	this._id = "TimeForm";
	this._type = type;
	this.headerText = "Time Slot";

}

TimeForm.prototype = Object.create(p.BaseForm.prototype);
TimeForm.prototype.constructor = TimeForm;

TimeForm.prototype.drawContent = function () {
	p.BaseForm.prototype.drawContent.call(this);

	var content = this.getContent();

	var row = this.row();
	row.innerHTML = this.localInfo.subjectCaption;
	content.appendChild(row);

	// create a text-area for the item subject
	var textArea = this.createTextArea({ id: "subject", initValue: this.item.subject, events: { keydown: this._areaKeyDown} });
	textArea.element.style.width = "200px";
	this.addControl(textArea);

	row = this.row();
	row.appendChild(textArea.element);
	content.appendChild(row);

	// create a drop-down list for start hours
	row = this.row();
	row.innerHTML = "Start Time";
	content.appendChild(row);

	var control = this.createDropDownList({ id: "start_time", items: this.getHourLabels(), initValue: this.getStartTimeIndex(), addEmptyValue: false });
	control.element.style.width = "200px";
	this.addControl(control);

	row = this.row();
	row.appendChild(control.element);
	content.appendChild(row);

	// create a drop-down list for end time
	row = this.row();
	row.innerHTML = "End Time";
	content.appendChild(row);

	var item = this.item;
	control = this.createDropDownList({ id: "end_time", items: hoursList, initValue: this.getEndTimeIndex(),  addEmptyValue: false});
	control.element.style.width = "200px";
	this.addControl(control);

	row = this.row();
	//row.style.margin = "0px 0px 30px 0px";
	row.appendChild(control.element);
	content.appendChild(row);

    // create a drop-down list for number of time slots
    row = this.row();
    row.innerHTML = "Number of Appointments";
    content.appendChild(row);

    var item = this.item;
    control = this.createDropDownList({ id: "num_appointments", items: this.getIntervalLabels(), initValue: { value: 1, text: "1 Time Slot" },  addEmptyValue: false});
    control.element.style.width = "200px";
    this.addControl(control);

    row = this.row();
    row.style.margin = "0px 0px 30px 0px";
    row.appendChild(control.element);
    content.appendChild(row);

	return content;
};


// create a list of labels for the number of meetings you want in the selected timespan.
TimeForm.prototype.getIntervalLabels = function () {


    intervalsList = [];
    intervalsList.push({ value: 1, text: "1 Appointment" });

    let index = 1;

    for(var i = 2; i < 11; i++)
    {
        intervalsList.push({ value: index+1, text: i.toString() + " Appointments" });
        index += 1;
    }
    return intervalsList;
}

// create an array of objects to fill the hours drop-down
TimeForm.prototype.getHourLabels = function () {
	hoursList = [];
	hoursList.push({ value: 0, text: "12:00am" });
	hoursList.push({ value: 1, text: "12:30am" });

	let index = 1;

	for(var i = 1; i < 12; i++) {
		hoursList.push({ value: index+1, text: i.toString() + ":00am" });
	    hoursList.push({ value: index+2, text: i.toString() + ":30am" });

		index += 2;
	}

	//add the first afternnon hours
	hoursList.push({ value: index + 1, text: "12:00pm" });
	hoursList.push({ value: index + 2, text: "12:30pm" });

	index += 2;

	for(i = 1; i < 12; i++) {
		hoursList.push({ value: index+1, text: i.toString() + ":00pm" });
	    hoursList.push({ value: index+2, text: i.toString() + ":30pm" });

		index += 2;
	}

	return hoursList;
}

// get the index of the current item's rank to set the value of the Ranks drop-down
TimeForm.prototype.getStartTimeIndex = function () {
	if (this.item != null && this.item.startTime != null)
	{

		let index  = this.item.startTime.__getHours() * 2;
		if(this.item.startTime.__getMinutes() > 0)
			index++;
		return index;

	}
	return -1;
}

TimeForm.prototype.getSubject = function() {
		return this.item.subject;
}

// get the index of the current item's rank to set the value of the Ranks drop-down
TimeForm.prototype.getEndTimeIndex = function () {
	if (this.item != null && this.item.endTime != null)
	{
		let hours = this.item.endTime.__getHours();
		let minutes = this.item.endTime.__getMinutes();

		let index = hours * 2;

		if (minutes > 0)
			index += 1;

		return index;

	}
	return -1;
}

// override BaseForm's drawButtons method to create form buttons
TimeForm.prototype.drawButtons = function () {
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

TimeForm.prototype.onSaveButtonClick = function (e) {

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

TimeForm.prototype.onCancelButtonClick = function (e) {
	this.closeForm();
};

TimeForm.prototype.onDeleteButtonClick = function (e)  {
    this.calendar.schedule.items.remove(this.item);
    this.calendar.repaint(true);
    this.closeForm();
};
