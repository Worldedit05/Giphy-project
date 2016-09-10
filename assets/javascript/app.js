var topics = ['Auburn Tigers', 'Texas Longhorns', 'Alabama Crimson Tide', 'LSU Tigers', 'Georgia Bulldogs', 'Tennessee Volunteers', 'Ole Miss Rebels', 'South Carolina Gamecocks', 'Arkansas Razorbacks', 'Kentucky Wildcats', 'Missouri Tigers', 'Mississippi State Bulldogs', 'Texas A&M Aggies', 'Florida Gators', 'Vanderbilt Commodores']
// Create an array that will record the number of times a specific button is pressed
var clickCount = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
// Defined global variables
var baseQueryURL = "https://api.giphy.com/v1/gifs/search?q=";
var apiKey = "&api_key=dc6zaTOxFJmzC";
var limit = "&limit=10";
var rating = "&rating=pg";
var offset = "&offset="
var offsetCount = 0;

renderButtons();
// Add click events to all buttons and
//gifs that are dynamically created
//
$(document).on('click', '.team', queryGiphy);

$(document).on('click', '.gif', animateGif);

$('#submitBtn').on('click', function(event) {

  event.preventDefault();
  // Grab the user's value from the text field
  //
  var newTeam = $('#teamInput').val().trim();
  // Push it to the array
  topics.push(newTeam);
  // Render all new buttons
  renderButtons();
  // Clear the text field
  $('#teamInput').val('');
})

$('#clearInput').on('click', function() {
  // Clear button to clear the text field
  //
  $('#teamInput').val('');
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
    //
    // Remove previous gifs from the well
    //
    $('#gifs').empty();

    var team = $(this).attr('data-team');
    var refIndex = topics.indexOf(team); // Grab the index of the team in 'topics'
    var clickNumber = parseInt(clickCount[refIndex]); // Convert to int

    offset = "&offset=" + (clickNumber*10); // Multiply the number of clicks by 10
    clickNumber++;

    clickCount.splice(refIndex, 1, clickNumber); // Push the new clickNumber back into the array to reference it again

    var queryURL = encodeURI(baseQueryURL + team + limit + rating + offset + apiKey); // Build the URI to send to Giphy's API

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function(response) {
        // Check to see if Giphy returned any gifs
        if (response.pagination.total_count == "0") {

          var h = $('<h2>').text('Giphy returned no results');
          var i = $('<h3>').text('Please select another team');

          h.attr('class', 'text-center');
          i.attr('class', 'text-center');
          $('#gifs').append(h);
          $('#gifs').append(i);

          return false;
        }
        console.log(response);
        var results = response.data;
        // Display 10 gifs from the response
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
