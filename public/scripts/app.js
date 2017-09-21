$(document).ready(function() {
    ////////////////////////////////////////////////
    function createTweetElement(tweetData) { //creates the web structure, and appends each individual element to the "article" variable
        var $article = $("<article>").addClass("tweet")

        var $header = $("<header>").addClass("tweet-header")
            .append($("<img>").addClass("user-avatar").attr("src", tweetData.user.avatars.small))
            .append($("<h1>").addClass("user-name").text(tweetData.user.name))
            .append($("<span>").addClass("user-handle").text(tweetData.user.handle))

        var $main = $("<main>").addClass("tweet-content")
            .append($("<p>").text(tweetData.content.text))

        var $icons = $("<div>").addClass("tweet-actions")
            .append($("<i>").addClass("fa fa-heart"))
            .append($("<i>").addClass("fa fa-flag"))
            .append($("<i>").addClass("fa fa-retweet"))

        var $footer = $("<footer>").addClass("tweet-footer")
            .append($("<div>").addClass("tweet-timestamp"))
            .append($("<span>").text(tweetData.created_at))
            .append($icons);


        var $combine = $article.append($header).append($main).append($footer);

        return $combine;
    }
    ////////////////////////////////////////////////
    function renderTweets(tweet) { //for loop to ittirate and render each tweet

        tweet.forEach(function(eachTweet) {
            let $tweet = createTweetElement(eachTweet);
            $('#tweets-container').append($tweet);
        });
        ////////////////////////////////////////////////
        /*for (let x in tweet) {

            let $tweet = createTweetElement(tweet[tweet.length - x - 1]);

            $('#tweets-container').prepend($tweet);

        }*/
    }
    ////////////////////////////////////////////////
    function loadTweets() { //loads tweets using renderTweets function
        $.ajax({
            method: 'GET',
            url: '/tweets',
            success: function(tweetObj) {
                var arr = tweetObj[tweetObj.length - 1];
                var $newtweet = createTweetElement(arr);
                $('#tweets-container').prepend($newtweet);
            }
        });
    }
    loadTweets();
    ////////////////////////////////////////////////
    $("form").submit(function(event) { //serialize input into string obj NOT JSON
        event.preventDefault();
        var textArea = $("#tweet-input").val().length;
        if (textArea === 0) { //checks if input string is blank
            alert("Please enter a non-empty tweet!")
        } else if (textArea > 140) {
            alert("Your tweet is too long! Max 140");
        } else {
            var tweetString = $("form").serialize();
            $.ajax({
                method: 'POST',
                url: 'http://localhost:8080/tweets',
                data: tweetString,
                /*     dataType: 'json',*/
                encode: true,
                success: function() {
                    $('#counter').text("140"); // resets counter to 140 after submit
                    $("tweet-input").value = "";
                    loadTweets();
                }
            })
        };
    })
    ////////////////////////////////////////////////
    $(".btn").click(function() {
        /*$(".new-tweet").slideToggle(500, function() {*/
        $(".container .new-tweet").slideToggle();
        $(".container textarea").select();

        /*   });*/
    });
});