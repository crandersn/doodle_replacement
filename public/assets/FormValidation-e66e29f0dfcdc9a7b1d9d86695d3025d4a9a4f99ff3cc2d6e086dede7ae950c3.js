function validateNewPollForm () {

    var title = document.forms["pollForm"]["title"].value;
    var location = document.forms["pollForm"]["location"].value;
    var expirationDate = document.forms["pollForm"]["expiration_date"].value;
    var votesPerTimeslot = document.forms["pollForm"]["votes_per_timeslot"].value;
    var votesPerParticipant = document.forms["pollForm"]["votes_per_person"].value;

    console.log(expirationDate)

    // compute current date and convert expiration date to a javascript date object
    var expirationDateValues = expirationDate.split("-");
    var currentDate = new Date();
    currentDate = new Date(currentDate.year, currentDate.month, currentDate.day);
    var selectedExpirationDate = new Date(expirationDateValues[0],expirationDateValues[1],expirationDate[2]);

    console.log(expirationDateValues)
    console.log(currentDate)
    console.log(selectedExpirationDate)


    // validate input data for the form
    if (title == "") {
        alert("Please input a title before submitting your form")
        return false
    } else if (location == "") {
        alert("Please input a location before submitting your form")
        return false
    } else if (expirationDateValues != null) {
        if (selectedExpirationDate < currentDate){
            alert("Please select an expiration date that is greater than the current date.")
            return false
        }
    } else if (isNaN(votesPerTimeslot) || parseInt(votesPerTimeslot) < 1) {
        alert("Please input an integer value greater than 0 for the maximum number of votes per timeslot")
        return false
    } else if (isNaN(votesPerParticipant) || parseInt(votesPerParticipant) < 1) {
        alert("Please input an integer value greater than 0 for the maximum number of votes per poll participant.")
        return false
    }

}
;
