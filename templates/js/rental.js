function getListingCount() {
    $.getJSON('/load-listing/count', function(data) {
        return data;
    });
}

function getListingMultiple(id_start, id_end) {
    $.getJSON('/load-listing/' + id_start + '/' + id_end, function(data) {
        addListings(data);
    });
}

function getListingSingle(id) {
    $.getJSON('/load-listing/' + id, function(data) {
        addListings(data);
    });
}

function addListings(data) {
    for(let i = 0; i < data.length; i++) {
        let json = data[i];

        $v("pageContent").innerHTML += "<div id='rental_" + json.id + "' class='rentalMainBox'>" +
            "<div class='rentalBoxImg'><img class='rentalBoxImg' src='" + json.image + "'/></div>" +
            "<div class='rentalBoxText'>" +
            "Desc: " + json.description + "<br>" +
            "</div>" +
            "</div>";
    }
}

$(document).ready(function() {
    let result;
    getListingSingle("1", function(data) {
        result = data;
    });
    console.log(result);
});