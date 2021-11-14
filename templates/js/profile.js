function getProfileID() {
    let curPage = window.location.href;
    return curPage.split("/").pop();
}

$(document).ready(function() {
    $.post('/api/profile/' + getProfileID(), function(data, status) {
            $v("profile_id").innerHTML = data;
        });
});