function getProfileID() {
    let curPage = window.location.href;
    return curPage.split("/").pop();
}

function updateProfilePicture(url) {
    $v("userImage").src = url;
    $preload(url);
}

function updateProfileDescription(desc) {
    $v("profileDescription").innerHTML = desc;
}

function updateProfileListings() {

}

function updateProfileReviews() {

}

function updateProfileLocation(loc) {
    //TODO: add location
}

function updateProfileTitle(name) {
    $v("profileTitle").innerHTML = "<b>" + name + "</b>";
}

function displayProfile(status) {
    if (status) {
        $v("profileLeft").style.display = "flex";
        $v("profileRight").style.display = "flex";
    } else {
        $v("profileLeft").style.display = "none";
        $v("profileRight").style.display = "none";
    }
}

function addReview(reviewInfo) {
    $v("profileListingsReviews").innerHTML += "<div class='profileReviewBox'>" +
        "<div class='profileReviewerBox'>" +
        "<div class='profileReviewerPhoto'>" +
        "" +
        "</div>" +
        "<div class='profileReviewerName'>" +
        "</div>" +
        "<div class='profileReviewText'>" +
        "</div>" +
        "</div>" +
        "</div>";
}

$(document).ready(function() {
    displayProfile(false);
    $.getJSON('/api/profile/' + getProfileID(), function(data) {
            let json_data = data[0];
            console.log(json_data);
            updateProfileTitle(json_data.username);
            updateProfileDescription(json_data.description);
            updateProfileLocation(json_data.location);
            updateProfilePicture(json_data.avatar);
        });
    for (let i = 0; i < 20; i++) {
            addReview(i);
        }
    displayProfile(true);
});