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

function getStars(count) {
    let result = '';
    for (let i = 0; i < count; i++) {
        result += "<span class='fa fa-star checked'></span>"
    }
    for (let i = count; i < 5; i++) {
        result += "<span class='fa fa-star'></span>"
    }
    return result;
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

function addReview(id, reviewerPhoto, reviewerName, reviewText) {
    reviewerPhoto = "<img class='reviewerImg' id='reviewImage_" + id + "' src='" + reviewerPhoto + "'/>";
    $v("profileListingsReviews").innerHTML += "<div class='profileReviewBox'>" +
        "<div class='profileReviewerBox'>" +
        "<div class='profileReviewerPhoto'>" + reviewerPhoto +
        "" +
        "</div>" +
        "<div class='profileReviewRating'>" + reviewerName +
        "</div></div>" +
        "<div class='profileReviewText'>" + reviewText +
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
            addReview(i, "/images/profile/default.png", "Test", "Test review");
        }
    displayProfile(true);
});