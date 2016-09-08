var topics = ['Auburn Tigers', 'Texas Longhorns', 'Alabama Crimson Tide', 'LSU Tigers', 'Georgia Bulldogs', 'Tennessee Volunteers', 'Ole Miss Rebels', 'South Carolina Gamecocks', 'Arkansas Razorbacks', 'Kentucky Wildcats', 'Missouri Tigers', 'Mississippi State Bulldogs', 'Texas A&M Aggies', 'Florida Gators', 'Vanderbilt Commodores']

var baseQueryURL = "http://api.giphy.com/v1/gifs/search?q=";
var apiKey = "&api_key=dc6zaTOxFJmzC";
var limit = "&limit=10";
var rating = "&rating=pg";
var offset = "&offset="
var offsetCount = 0;

renderButtons();

$(document).on('click', '.team', queryGiphy);

$(document).on('click', '.gif', animateGif);

$('#submitBtn').on('click', function(event) {

  event.preventDefault();
  var newTeam = $('#teamInput').val().trim();

  topics.push(newTeam);

  renderButtons();

})

function renderButtons() {

    $('.team-buttons').empty();

    for (var i = 0; i < topics.length; i++) {
        var button = $('<button>');
        var buttonClasses = {
            type: "button",
            class: "btn btn-default team"
        }

        // Need to add the data-team value to the button along with the Bootstrap classes and text
        button.attr(buttonClasses).text(topics[i]).attr('data-team', topics[i]);

        $('.team-buttons').append(button);
    }
}

function queryGiphy() {

    $('.row').removeClass('hidden');
    $('#gifs').empty();

    var team = $(this).attr('data-team');
    var queryURL = baseQueryURL + team + limit + rating + offset + offsetCount + apiKey;
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function(response) {

        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            var teamDiv = $('<div>');
            var p = $('<p>').text('Rating: ' + results[i].rating.toUpperCase());
            var teamImage = $('<img>');

            teamImage.attr({
                'class': 'gif center-block',
                'src': results[i].images.fixed_height_still.url,
                'data-still': results[i].images.fixed_height_still.url,
                'data-animate': results[i].images.fixed_height.url,
                'data-state': 'still'
            });

            p.attr('class', 'text-center')
            teamDiv.append(teamImage);
            teamDiv.append(p);

            $('#gifs').prepend(teamDiv);
        }
    })
}

function animateGif() {
    var state = $(this).attr('data-state');

    if (state === 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
}
