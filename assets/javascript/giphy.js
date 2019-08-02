//GLOBAL VARIABLES
var topics =["Mr. D", "Kim's Convenience", "Fresh Off the Boat", "Stranger Things", "Community"];   

function displayGif() {
    var topics = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topics + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
    console.log(queryURL);

    //AJAX REQUEST USING THE GET METHOD
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
    //EMPITES THE DIV HOLDING THE PREVIOUS GIF RESULTS
        $("#resultsDiv").empty();
        var results = repsonse.data;
        console.log(response);
        
        for (var i = 0; i < results.length; i++) {
            //CREATING A DIV FOR THE GIF
            var gifDiv = $("<div class='gifDiv'>");
            //STORING THE RESULT ITEM'S RATING
            var rating = results[i].rating;
            //CREATING A PARAGRPAH TAG WITH THE RESULT ITEM'S RATING
            var ratingDiv = $("<p>").html("Rating: " + rating);
            //CREATING ANIMATED IMAGES VAR
            var animated = results[i].images.fixed_height.url;
            //CREATING A STILL IMAGE VAR
            var still = results[i].images.fixed_height_still.url;
            //CREATING AN IMAGE TAG FOR THE SHOWS GIFS
            var topicsImg = $("<img class='sImage'>");

            //SETTING THE GIFS' DEFAULT TO STILL
            topicsImg.attr("src", still);
            topicsImg.attr("data-still", still);
            topicsImg.attr("data-animate", animated);
            topicsImg.attr("data-state", "still");

            //GIF RATINGS APPEAR ALONGSIDE DESGINATED GIFS
            gifDiv.append(ratingDiv);
            gifDiv.prepend(topicsImg);
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
        // $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
    //If state !== still, clicking will pause the gif
    } else {
        // $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
  });

//FUNCTION FOR NEW BUTTONS (BASED ON USERS' SEARCH)
function renderButtons () {
    $("#buttonsMain").empty ();
    for (var i = 0; i < topics.length; i++) {
        var addButton = $("<button class='button'>");
        addButton.addClass("topics");
        addButton.attr("data-name", topics[i]);
        addButton.html(topics[i]);

        $("#buttonsMain").append(addButton);
    }
};

//CREATING NEW BUTTONS WHEN USER HAS ENTERED A VALUE IN THE SEARCH BAR AND SUBMITTING
$(".add-gif").on("click", function(event) {
    event.preventDefault();
    var showGifs = $("#show-input").val().trim();
    topics.push(showGifs);
    $("#show-input").val("");
    renderButtons();
});

//CALLS BUTTON TO BE CREATED
$(document).on("click", ".topics", displayGif);
renderButtons();

