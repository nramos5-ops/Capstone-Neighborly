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
    // $v("nav_home").onclick = function(event) {
    //     event.preventDefault();
    //     window.location.href = "index.html";
    // }
    //
    // $v("nav_login").onclick = function(event) {
    //     event.preventDefault();
    //     window.location.href = "login.html";
    // }
    //
    // $v("nav_rental").onclick = function(event) {
    //     event.preventDefault();
    //     window.location.href = "rental.html";
    // }

    //Set nav bar
    $v("navbar").innerHTML = "<li class='navItem'><a href='index.html' id='nav_home'>Home</a></li>" +
        "    <li class='navItem'><a href='rental.html' id='nav_rental'>Rental</a></li>" +
        "    <li class='navItem'><a href='login.html' id='nav_login'>Login</a></li>";

});