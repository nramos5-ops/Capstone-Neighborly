
$(document).ready(function() {

    $v("btnLogin").onclick = function(event) {
        event.preventDefault();
        let loginData = {
            //CryptoJS.MD5(password).toString();
            username: $v("txtUser").value,
            password: CryptoJS.MD5($v("txtPass").value).toString()
        }
        $.post('/login/auth',loginData, function(data, status) {
            console.log(data);
            if(data === 'true') {
                document.cookie = "username=" + loginData.username;
                document.cookie = "password=" + loginData.password;
                window.location.replace("/");
            }

        });
    }

    $v("btnRegister").onclick = function(event) {
        event.preventDefault();
        window.location.href = "/register";
    }

});