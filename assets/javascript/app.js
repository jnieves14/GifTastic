//GLOBAL VARIABLES
var shows =["Mr. D", "Kim's Convenience", "Fresh Off the Boat", "Stranger Things", "Community"];   

function displayGif() {
    var shows = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        shows + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    //AJAX REQUEST USING THE GET METHOD
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
    //EMPITES THE DIV HOLDING THE PREVIOUS GIF RESULTS
        $("#resultsDiv").empty();
        console.log(response);
        var results = response.data;
        for (var i = 0; i < response.data.length; i++) {
            //CREATING A DIV FOR THE GIF
            var gifDiv = $("<div class='gifDiv'>");
            //STORING THE RESULT ITEM'S RATING
            var rating = response.data[i].rating;
            //CREATING A PARAGRPAH TAG WITH THE RESULT ITEM'S RATING
            var ratingDiv = $("<p>").html("Rating: " + rating);
            //CREATING ANIMATED IMAGES VAR
            var animated = response.data[i].images.fixed_height.url;
            //CREATING A STILL IMAGE VAR
            var still = response.data[i].images.fixed_height_still.url;
            //CREATING AN IMAGE TAG FOR THE SHOWS GIFS
            var showsImg = $("<img class='sImage'>");

            //SETTING THE GIFS' DEFAULT TO STILL
            showsImg.attr("src", still);
            showsImg.attr("data-still", still);
            showsImg.attr("data-animate", animated);
            showsImg.attr("data-state", still);

            //GIF RATINGS APPEAR ALONGSIDE DESGINATED GIFS
            gifDiv.append(ratingDiv);
            gifDiv.prepend(showsImg);
            $("#resultsDiv").prepend(gifDiv);
        }
});
};

//ONCLICK FUNCTOINS TO ANIMATE AND PAUSE GIFS
$("#resultsDiv").on("click", ".sImage", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, onclick will animate gif based on data-animate value
    if (state === "still") {
      $(this).attr("src", $(this).data("data-animate"));
      $(this).attr("data-state", "animate");
    //If state !== still, clicking will pause the gif
    } else {
      $(this).attr("src", $(this).data("data-still"));
      $(this).attr("data-state", "still");
    }
  });

//FUNCTION FOR NEW BUTTONS (BASED ON USERS' SEARCH)
function renderButtons () {
    $("#buttonsMain").empty ();
    for (var i = 0; i < shows.length; i++) {
        var addButton = $("<button class='button'>");
        addButton.addClass("shows");
        addButton.attr("data-name", shows[i]);
        addButton.html(shows[i]);

        $("#buttonsMain").append(addButton);
    }
};

//CREATING NEW BUTTONS WHEN USER HAS ENTERED A VALUE IN THE SEARCH BAR AND SUBMITTING
$(".add-gif").on("click", function(event) {
    event.preventDefault();
    var showGifs = $("#show-input").val().trim();
    shows.push(showGifs);
    $("#show-input").val("");
    renderButtons();
});

//CALLS BUTTON TO BE CREATED
$(document).on("click", ".shows", displayGif);
renderButtons();

