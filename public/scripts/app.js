$(document).ready(function() {
    //creates the web structure, and appends each individual element to the "article" variable
    function createTweetElement(tweetData) {
        var $article = $("<article>").addClass("tweet");

        var $header = $("<header>").addClass("tweet-header")
            .append($("<img>").addClass("user-avatar").attr("src", tweetData.user.avatars.small))
            .append($("<h1>").addClass("user-name").text(tweetData.user.name))
            .append($("<span>").addClass("user-handle").text(tweetData.user.handle));

        var $main = $("<main>").addClass("tweet-content")
            .append($("<p>").text(tweetData.content.text));

        var $icons = $("<div>").addClass("tweet-actions")
            .append($("<i>").addClass("fa fa-heart heart"))
            .append($("<i>").addClass("fa fa-flag flag"))
            .append($("<i>").addClass("fa fa-retweet retweet"));

        var $footer = $("<footer>").addClass("tweet-footer")
            .append($("<div>").addClass("tweet-timestamp"))
            .append($("<span>").text(moment(tweetData.created_at).fromNow()))
            .append($icons);

        var $combine = $article.append($header).append($main).append($footer);

        $combine.find(".heart").click(function() {
            $(this).css('color', 'red');
        });

        return $combine;
    }
    //for loop to ittirate and render each tweet in $combine variable
    function renderPreviousTweets(tweet) {
        for (let x in tweet) {

            let $tweet = createTweetElement(tweet[tweet.length - x - 1]);
            $('#tweets-container').append($tweet);
        }
    }
    //loads previous(already posted) tweets using renderTweets function
    function loadPreviousTweets() {
        $.ajax({
            method: 'GET',
            url: '/tweets',
            success: function(tweetObj) {
                renderPreviousTweets(tweetObj);
            }
        });
        $(".clickable").click(function() {
            alert("clicked");
        });
    }
    loadPreviousTweets(); //initial invocation to load+render all previous tweets
    //loads new tweets using renderTweets function
    function loadTweets() {
        $.ajax({
            method: 'GET',
            url: '/tweets',
            success: function(tweetObj) {
                var arr = tweetObj[tweetObj.length - 1]; //grabs only the last posted tweet
                var newtweet = createTweetElement(arr);
                $('#tweets-container').prepend(newtweet);
                $('#tweets-container .tweet:first-child').hide().delay(100).slideDown(600);
            }
        });
    }
    //serialize input into string obj NOT JSON!
    $("form").submit(function(event) { //serialize input into string obj NOT JSON!
        event.preventDefault(); //prevent default redirection to /tweets after submission
        var textArea = $("#tweet-input").val().length;
        if (textArea === 0) { //checks if input string is blank
            alert("Please enter a non-empty tweet!")
        } else if (textArea > 140) { //checks if input string is over 140 chars
            alert("Your tweet is too long! Max 140");
        } else { //else submits tweet
            var tweetString = $("form").serialize();
            $.ajax({
                method: 'POST',
                url: '/tweets',
                data: tweetString,
                success: function() {
                    $('#counter').text("140"); // resets counter to 140 after submit
                    $("#tweet-input").val("");
                    loadTweets();
                }
            })
        };
    })
    //compose button
    $(".btn").click(function() {
        $(".container .new-tweet").slideToggle();
        $(".container textarea").select();
    });
});