function validateNewPollForm () {

    var title = document.forms["pollForm"]["title"].value;
    var location = document.forms["pollForm"]["location"].value;
    var expirationDate = document.forms["pollForm"]["expiration_date"].value;
    var votesPerTimeslot = document.forms["pollForm"]["votes_per_timeslot"].value;
    var votesPerParticipant = document.forms["pollForm"]["votes_per_person"].value;

    // compute current date and convert expiration date to a javascript date object
    var expirationDateValues = expirationDate.split("-");
    var currentDate = new Date();
    currentDate = new Date(parseInt(currentDate.getFullYear()), parseInt(currentDate.getMonth()), parseInt(currentDate.getDate()));
    var selectedExpirationDate = new Date(parseInt(expirationDateValues[0]),parseInt(expirationDateValues[1]) - 1,parseInt(expirationDateValues[2]));


    // validate input data for the form
    if (title == "") {
        alert("Please input a title before submitting your form")
        return false
    }

    if (location == "") {
        alert("Please input a location before submitting your form")
        return false
    }

    if (selectedExpirationDate < currentDate){
        alert("Please select an expiration date that is greater than the current date.")
        return false
    }

    if ( votesPerTimeslot != "") {

        if (isNaN(votesPerTimeslot) || parseInt(votesPerTimeslot) < 1) {
            alert("Please input an integer value greater than 0 for the maximum number of votes per timeslot")
            return false
        }
    }

    if (votesPerParticipant != "") {

        if (isNaN(votesPerParticipant) || parseInt(votesPerParticipant) < 1) {
            alert("Please input an integer value greater than 0 for the maximum number of votes per poll participant.")
            return false
        }
    }

}