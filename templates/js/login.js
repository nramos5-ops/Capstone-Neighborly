
$(document).ready(function() {

    $v("btnLogin").onclick = function(event) {
        event.preventDefault();
        window.location.href = "index.html?username=" + txtUser.value + "&password=" + txtPass.value;
    }

    $v("btnRegister").onclick = function(event) {
        event.preventDefault();
        window.location.href = "/register";
    }

});