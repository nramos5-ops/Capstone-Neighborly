let $v = function (id) { return document.getElementById(id); };
let $preload = function (url) { new Image().src = url; }
let username = '';
let password = '';

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
    //Set nav bar depending on login status
    let xCookie = document.cookie.split(";");
    console.log(xCookie);
    let validUser = false;
    let validPass = false;
    for (let i = 0; i < xCookie.length; i++) {
        let temp = xCookie[i];
        if (temp.includes("username=")) {
            username = temp.split("=")[1];
            validUser = true;
        } else if (temp.includes("password=")) {
            password = temp.split("=")[1];
            validPass = true;
        }
    }

    if (validPass === true && validUser === true) {
        $v("navbar").innerHTML = "<div id='navbar_logo'>\n" +
        "<a href='/'><img src='/images/logo_trim.png' alt='Neighborly'></a>\n" +
        "</div>\n" +
        "<div id='navbar_btnGrp'>\n" +
        "<ul id='navbar_btn'>\n" +
        "<li class='navItem'><a href='/' id='nav_home'>Home</a></li>\n" +
        "<li class='navItem'><a href='/rental' id='nav_rental'>Rental</a></li>\n" +
        "<li class='navItem'><a href='/profile' id='nav_profile'>Profile</a></li>\n" +
        "<li class='navItem'><a href='/aboutus' id='nav_aboutus='>About Us</a></li>\n" +
        "<li class='navItem'><a href='/logout' id='nav_logout'>Logout</a></li>\n" +
        "</ul>\n" +
        "</div>\n";
    } else {
        $v("navbar").innerHTML = "<div id='navbar_logo'>\n" +
        "<a href='/'><img src='/images/logo_trim.png' alt='Neighborly'></a>\n" +
        "</div>\n" +
        "<div id='navbar_btnGrp'>\n" +
        "<ul id='navbar_btn'>\n" +
        "<li class='navItem'><a href='/' id='nav_home'>Home</a></li>\n" +
        "<li class='navItem'><a href='/rental' id='nav_rental'>Rental</a></li>\n" +
        "<li class='navItem'><a href='/aboutus' id='nav_aboutus='>About Us</a></li>\n" +
        "<li class='navItem'><a href='/login' id='nav_login='>Login</a></li>\n" +
        "</ul>\n" +
        "</div>\n";
    }

    $v("pageTitle").innerHTML = "Neighborly";
});