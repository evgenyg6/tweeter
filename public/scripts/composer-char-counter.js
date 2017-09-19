$(document).ready(function() {
    $('textarea').keyup(function() { //max chars 140 - length of textarea
        var left = 140 - $(this).val().length;
        if (left < 0) {
            $('.counter').css('color', 'red');
        } else {
            $('.counter').css('color', 'black');
        }
        $('.counter').text(left);
    });
});