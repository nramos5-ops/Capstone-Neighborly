
$(document).ready(function() {

    $v("btnRegister").onclick = function(event) {
        event.preventDefault();
        window.location.href = "register.html?username=" + txtUser.value + "&password=" + txtPass.value + "&email=" + txtEmail.value;
    }

});