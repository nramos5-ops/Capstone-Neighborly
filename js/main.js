let $v = function (id) { return document.getElementById(id); };

/**
 * Gets the current active page based on path
 */
function getActive() {
    let curPage = window.location.pathname;
    curPage = curPage.split("/").pop();

    if (curPage === "index.html") {
        $("#nav_home").toggleClass("navActive");
    }
}

$(document).ready(function() {

    //Set events
    $v("nav_home").onclick = function(event) {
        event.preventDefault();
        window.location.href = "index.html";
    }

    $v("nav_login").onclick = function(event) {
        event.preventDefault();
        window.location.href = "Login.html";
    }

    $v("nav_rental").onclick = function(event) {
        event.preventDefault();
        window.location.href = "rental.html";
    }

});