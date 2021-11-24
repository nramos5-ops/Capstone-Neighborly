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

function updateProfileListings(id, image) {
    $v("profileListingsContent").innerHTML += "<div class='profileListingItem'><img src='" + image + "'/></div>";
}

function clearProfileListing() {
    $v("profileListingsContent").innerHTML = "";
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

function addReview(id, reviewerPhoto, reviewRating, reviewText) {
    reviewerPhoto = "<img class='reviewerImg' id='reviewImage_" + id + "' src='" + reviewerPhoto + "'/>";
    $v("profileListingsReviews").innerHTML += "<div class='profileReviewBox'>" +
        "<div class='profileReviewerBox'>" +
        "<div class='profileReviewerPhoto'>" + reviewerPhoto +
        "" +
        "</div>" +
        "<div class='profileReviewRating'>" + getStars(reviewRating) +
        "</div></div>" +
        "<div class='profileReviewText'>" + reviewText +
        "</div>" +
        "</div>";
}

$(document).ready(function() {
    displayProfile(false);

    //get profile data (name, desc, etc.)
    $.getJSON('/api/profile/' + getProfileID(), function(data) {
            let json_data = data[0];
            console.log(json_data);
            updateProfileTitle(json_data.username);
            updateProfileDescription(json_data.description);
            updateProfileLocation(json_data.location);
            updateProfilePicture(json_data.avatar);
        });

    //Get profile reviews for a user
    $.getJSON('/api/profile/reviews/' + getProfileID(), function(data) {
        for (let i = 0; i < data.length; i++) {
            let json = data[i]
            //addReview(i, "/images/profile/default.png", "Test", "Test review");
            addReview(i, json.profile_picture, json.rating, json.message);
        }
    });

    $.getJSON('/api/profile/listings/' + getProfileID(), function(data) {
        clearProfileListing();
        for (let i = 0; i < data.length; i++) {
            let json = data[i];
            updateProfileListings(json.id, json.image);
        }
    });
    displayProfile(true);
});