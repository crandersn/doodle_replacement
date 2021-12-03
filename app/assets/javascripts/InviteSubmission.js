function invite(){


    var poll_id = $('.poll_id').data('poll-id');
    var name = document.getElementById("name").value
    var number = document.getElementById("phone_number").value

    var postData = {}
    postData["poll_id"] = poll_id
    postData["name"] = name
    postData["phone_number"] = number

    $.post("/admin/add_invitee", postData, function(data, status){});

}

function sendInvites (){
    var poll_id = $('.poll_id').data('poll-id');
    var postData = {}
    postData["poll_id"] = poll_id
    $.post("/admin/send_invites", postData, function(data, status){});
}