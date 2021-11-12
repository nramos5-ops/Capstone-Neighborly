
$(document).ready(function() {

    $v("btnRegister").onclick = function(event) {
        event.preventDefault();
        let registerData = {
            //CryptoJS.MD5(password).toString();
            username: $v("txtUser").value,
            password: CryptoJS.MD5($v("txtPass").value).toString(),
            email: $v("txtEmail").value
        }
        $.post('/register/auth',registerData, function(data, status) {
            console.log(data);
            if(data === 'true') {
                document.cookie = "username=" + registerData.username;
                document.cookie = "password=" + registerData.password;
                window.location.replace("/");
            } else if (data === 'false') {
                alert('Enter valid info');
            }

        });
    }

});