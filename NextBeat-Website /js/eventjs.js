$(function() {
    Parse.initialize("5ai5K40eruZd75H1e7DJKm9yFflPDcrY4p8CBhYz", "7ZPkok5QEJePRza2GmHIu7l7HZBRpLcygrGODbAr");
    currentDate = new Date();
    voteType = '';

    /*redirect if click icon*/
    $('#menuLogo').click(function() {
        window.location.href = '/explore.html';
    });
    /*register votes*/
    $(document).on('click', '.up2', function() {

        if ($(this).parent().siblings('.voteType').text() != 'upvote') {
            $this = $(this);
            myID = $this.parent().siblings('.messageid').text();

            queryVote = new Parse.Query("NewPost");

            var NewVote = Parse.Object.extend("NewVote");
            var newVote = new NewVote();

            var parseVote = newVote.save({
                postID: myID,
                userIP: userIP,
                eventName: eventName,
                typeVote: 'upvote'
            }, {
                success: function(object) {
                    console.log('voted!');
                    $this.css('opacity', '1');
                    currVal = parseInt($this.parent().siblings('.score').text());
                    if ($this.parent().siblings('.voteType').text() == 'downvote') {
                        $this.parent().siblings('.downvote').children('.down2').css('opacity', '0.25');
                        newVal = currVal + 2;

                        queryVote.get(myID, {
                            success: function(object) {
                                object.increment("numVotes", 2);
                                object.save();
                                // object is an instance of Parse.Object.
                            },

                            error: function(object, error) {
                                // error is an instance of Parse.Error.
                            }
                        });



                    } else {
                        newVal = currVal + 1;
                        queryVote.get(myID, {
                            success: function(object) {
                                object.increment("numVotes");
                                object.save();
                                // object is an instance of Parse.Object.
                            },

                            error: function(object, error) {
                                // error is an instance of Parse.Error.
                            }
                        });
                    }
                    $this.parent().siblings('.score').text(newVal);
                    voteType = 'upvote';
                    $this.parent().siblings('.voteType').text(voteType);
                },
                error: function(model, error) {
                    console.log('shucks')
                }
            });
}
});
$(document).on('click', '.down2', function() {
    if ($(this).parent().siblings('.voteType').text() != 'downvote') {

        $this = $(this);
        myID = $this.parent().siblings('.messageid').text();

        queryVote = new Parse.Query("NewPost");

        var NewVote = Parse.Object.extend("NewVote");
        var newVote = new NewVote();

        var parseVote = newVote.save({
            postID: myID,
            userIP: userIP,
            eventName: eventName,
            typeVote: 'downvote'
        }, {
            success: function(object) {
                console.log('voted!');
                $this.css('opacity', '1');
                currVal = parseInt($this.parent().siblings('.score').text());
                if ($this.parent().siblings('.voteType').text() == 'upvote') {
                    $this.parent().siblings('.upvote').children('.up2').css('opacity', '0.25');
                    newVal = currVal - 2;
                    queryVote.get(myID, {
                        success: function(object) {
                            object.increment("numVotes", -2);
                            object.save();
                                // object is an instance of Parse.Object.
                            },

                            error: function(object, error) {
                                // error is an instance of Parse.Error.
                            }
                        });

                } else {
                    newVal = currVal - 1;
                    queryVote.get(myID, {
                        success: function(object) {
                            object.increment("numVotes", -1);
                            object.save();
                                // object is an instance of Parse.Object.
                            },

                            error: function(object, error) {
                                // error is an instance of Parse.Error.
                            }
                        });


                }
                $this.parent().siblings('.score').text(newVal);
                voteType = 'downvote';
                $this.parent().siblings('.voteType').text(voteType);
            },
            error: function(model, error) {
                console.log('shucks')
            }
        });
}
});


/*organize sort button*/
var hotClicked = false;
var newClicked = true;

/*deal with hot*/
$('#hot').mouseenter(function() {
    if (newClicked && !hotClicked) {
        $(this).css('background', 'white');
        $(this).css('color', '#3ACC4C');
    }
});
$('#hot').mouseleave(function() {
    if (newClicked && !hotClicked) {
        $(this).css('background', 'none');
        $(this).css('color', 'white');
    }
});
$('#hot').click(function() {
    if (!hotClicked) {
        query.descending('numVotes');
        loadPosts();
        $("html, body").animate({
            scrollTop: 0
        }, 600);

        scrollCount = 0;
            //scrollNewDone = false;
            //scrollTopDone = false;
            $(this).css('background', 'white');
            $(this).css('color', '#3ACC4C');
            $(this).css('cursor', 'default');
            $('#new').css('background', 'none');
            $('#new').css('color', 'white');
            $('#new').css('cursor', 'pointer');
            hotClicked = true;
            newClicked = false;

            /* initial load*/
            //$('html, body').scrollTop($(".allPosts").offset().top - 60);
            //$('.allPosts').css('height','100vh');

        }
    });

/*deal with new*/
$('#new').mouseenter(function() {
    if (hotClicked && !newClicked) {
        $(this).css('background', 'white');
        $(this).css('color', '#3ACC4C');
    }
});
$('#new').mouseleave(function() {
    if (hotClicked && !newClicked) {
        $(this).css('background', 'none');
        $(this).css('color', 'white');
    }
});
$('#new').click(function() {
    if (!newClicked) {

        scrollCount = 0;
            //scrollNewDone = false;
            //scrollTopDone = false;
            query.descending('createdAt');
            loadPosts();
            $("html, body").animate({
                scrollTop: 0
            }, 600);


            $(this).css('background', 'white');
            $(this).css('color', '#3ACC4C');
            $(this).css('cursor', 'default');
            $('#hot').css('background', 'none');
            $('#hot').css('color', 'white');
            $('#hot').css('cursor', 'pointer');
            newClicked = true;
            hotClicked = false;


            //$('html, body').scrollTop($(".allPosts").offset().top - 60);
            //$('.allPosts').css('height','100vh');


        }
    });




query = new Parse.Query("NewPost");
if (newClicked)
    query.descending('createdAt');
else
    query.descending('numVotes');
loadPosts();




$('#write').mouseenter(function() {
    $('#instructions').show('slide', {
        direction: 'right'
    }, 200);

});
$('#write').mouseleave(function() {
    $('#instructions').hide('slide', {
        direction: 'right'
    }, 200);
});
$('#write').click(function() {
    $('#overlay').show();
    $('#modalCompose').show('drop', 500);
    $('#songName').focus();
});
$('#overlay').click(function() {
    $('#modalCompose').hide('drop', 500);
    $(this).hide();
});


/*submit post*/
$('#form1').on('submit', function(e) {
    e.preventDefault();

    songName = $('#songName').val();
    artistName = $('#artistName').val();
    if (artistName == '')
        artistName = '---';

    var NewPost = Parse.Object.extend("NewPost");
    var newPost = new NewPost();

    var parsePost = newPost.save({
        songName: songName,
        artistName: artistName,
        numVotes: 0,
        eventName: eventName
    }, {
        success: function(object) {
            console.log('we made it');
                //reset form and button
                $('#form1').trigger('reset');
                $("#submitButton").val('Submitted!').removeAttr('disabled');
                setTimeout(function() {
                    $('#submitButton').val('Submit');
                }, 1000);
                $('#modalCompose').hide('drop', {
                    direction: 'up'
                }, 500);
                $('#overlay').hide();
                stringResult = '<div class="divider">\
                <div class="message-item">\
                <div class="messageid" style="display:none">' + object.id + '</div>\
                <div class="voteType" style="display:none"></div>\
                <div class="allText">\
                <div class="songText">' + object.attributes.songName + '</div>\
                <span class="artist">' + object.attributes.artistName + '</span>\
                </div>\
                <div class="score">' + object.attributes.numVotes + '</div>\
                <div class="upvote"><i class="fa fa-chevron-up up2"></i>\
                </div>\
                <div class="downvote"><i class="fa fa-chevron-down down2"></i>\
                </div>\
                <span class="time">just now <i class="fa fa-clock-o"></i></span>\
                </div>\
                </div>'
                $('#nothingYet').hide();
                if (newClicked)
                    $('.allPosts').prepend($(stringResult).fadeIn(1000));
                else
                    $('.allPosts').append($(stringResult).fadeIn(1000));



            },
            error: function(model, error) {
                console.log('shucks')
            }
        });

});

})

function loadPosts() {
    $('.allPosts').html('');

    querydidI = new Parse.Query("NewVote");

    querydidI.equalTo("userIP", userIP);
    query.equalTo("eventName", eventName);

    query.find({
        success: function(results) {
            if (results.length == 0)
                $('#nothingYet').show();
            trueResults = results;
            counter = 0;
            fauxFor(counter);


        },
        error: function(error) {
            // error is an instance of Parse.Error.
        }
    });

}

function fauxFor(counter) {
    if (counter >= trueResults.length)
        return;
    /*account for time diff, too*/
    timeSincePost = Math.floor((currentDate.getTime() - trueResults[counter].createdAt.getTime()) / 1000);

    if (timeSincePost > 31536000) {
        timeSincePost = (Math.floor(timeSincePost / 31536000)) + 'y';
    } else if (timeSincePost > 2592000) {
        timeSincePost = (Math.floor(timeSincePost / 2592000)) + 'm';
    } else if (timeSincePost > 86400) {
        timeSincePost = (Math.floor(timeSincePost / 86400)) + 'd';
    } else if (timeSincePost > 3600) {
        timeSincePost = (Math.floor(timeSincePost / 3600)) + 'h';
    } else if (timeSincePost > 60) {
        timeSincePost = (Math.floor(timeSincePost / 60)) + 'm';
    } else if (timeSincePost > 30) {
        timeSincePost = '< 1m';
    } else {
        timeSincePost = 'just now';
    }
    thisPostID = trueResults[counter].id;
    songName = trueResults[counter].attributes.songName;
    artistName = trueResults[counter].attributes.artistName;
    numVotes = trueResults[counter].attributes.numVotes;
    putinType = '';

    querydidI.equalTo("postID", thisPostID)
    querydidI.descending('createdAt');
    querydidI.find({
        success: function(object) {
            if (object != '') {
                putinType = object[0].attributes.typeVote;
                console.log(putinType);
            } else {

            }

            if (putinType == 'upvote') {
                voters = '<div class="upvote"><i class="fa fa-chevron-up up2 voted"></i>\
                </div>\
                <div class="downvote"><i class="fa fa-chevron-down down2"></i>\
                </div>';
            } else if (putinType == 'downvote') {
                voters = '<div class="upvote"><i class="fa fa-chevron-up up2"></i>\
                </div>\
                <div class="downvote"><i class="fa fa-chevron-down down2 voted"></i>\
                </div>';
            } else {
                voters = '<div class="upvote"><i class="fa fa-chevron-up up2"></i>\
                </div>\
                <div class="downvote"><i class="fa fa-chevron-down down2"></i>\
                </div>';
            }
            stringResult = '<div class="divider">\
            <div class="message-item">\
            <div class="messageid" style="display:none">' + thisPostID + '</div>\
            <div class="voteType" style="display:none">' + putinType + '</div>\
            <div class="allText">\
            <div class="songText">' + songName + '</div>\
            <span class="artist">' + artistName + '</span>\
            </div>\
            <div class="score">' + numVotes + '</div>' + voters + '\
            <span class="time">' + timeSincePost + ' <i class="fa fa-clock-o"></i></span>\
            </div>\
            </div>'

            $('.allPosts').append(stringResult);
            counter++;
            fauxFor(counter);
        }
    });

}