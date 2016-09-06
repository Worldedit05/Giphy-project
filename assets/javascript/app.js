var topics = ['Auburn Tigers', 'Alabama Crimson Tide', 'LSU Tigers', 'Georgia Bulldogs', 'Tennessee Volunteers', 'Ole Miss Rebels', 'South Carolina Gamecocks', 'Arkansas Razorbacks', 'Kentucky Wildcats', 'Missouri Tigers', 'Mississippi State Bulldogs', 'Texas A&M Aggies', 'Florida Gators', 'Vanderbilt Commodores']

renderButtons();

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
