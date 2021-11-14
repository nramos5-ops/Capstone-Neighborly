function getListingCount() {
    $.getJSON('/load-listing/count', function(data) {
        return data;
    });
}

function getListingMultiple(id_start, id_end) {
    $.getJSON('/load-listing/' + id_start + '/' + id_end, function(data) {
        console.log(data);
        addListings(data);
    });
}

function getListingSingle(id) {
    $.getJSON('/load-listing/' + id, function(data) {
        addListings(data);
    });
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

function addListings(data) {
    for(let i = 0; i < data.length; i++) {
        let json = data[i];

        $v("pageContent").innerHTML += "<div id='rental_" + json.id + "' class='rentalMainBox'>" +
            "<a href='/rental/" + json.id + "'><div class='rentalBoxImg'><img class='rentalBoxImg' src='" + json.image + "'/></div></a>" +
            "<div class='rentalBoxText'><a href='profile/" + json.owner_id + "'>" +
            json.username + "</a>(" + getStars(json.rating) + ")<br>" +
            "Desc: " + json.description + "<br>" +
            "</div>" +
            "</div>";
    }
}

$(document).ready(function() {
    $.getJSON('/load-listing/count', function(data) {
        getListingMultiple(1, data);
    });
});