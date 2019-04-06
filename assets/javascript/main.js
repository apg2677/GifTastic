var topics = ["Guitar", "Drums", "Bass", "Piano", "Saxaphone", "Trumpet"];
var still;

$(document).ready(function () {
    Initialize();
   
});

function RenderButtons() {
    for (var i = 0; i < topics.length; i++) {
        var tempButton = $("<button>");
        tempButton.attr("data-name", topics[i]);
        tempButton.attr("data-state", still);
        tempButton.attr("class", "topic");
        tempButton.text(topics[i]);
        $("#buttons").append(tempButton);
    }
}

function Initialize() {
    RenderButtons();
    $(".topic").click(GetTopic);
    $("#btnAdd").click(AddButton);

}
function GetTopic() {
    var choice = $(this).attr("data-name");
    
    var requestUrl = "https://api.giphy.com/v1/gifs/search?q=" + choice + "&api_key=L6xowQE91UNaYXFSoXvO5mEkxcG0Y3Tn&limit=10";
    $.ajax({
        url: requestUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        // $("#gif-view").text(JSON.stringify(response));
        RenderGifs(response);
    });
}

const GiphyClick = function () {
    if(still) {
        
        var state = $(this).attr("data-state");
        console.log("Still: "+ still);
        // Change data source to animate
        var dataStill = $(this).attr("data-still");

        $(this).attr("src", dataStill);
        still = !still;
       
    }
    else {
        
        var state = $(this).attr("data-state");
        console.log("Still: " + still);
        // change data source to still
        var dataAnimate = $(this).attr("data-animate");
        $(this).attr("src", dataAnimate);
        still = !still;
    }
};
function RenderGifs(res) {
    for (var i = 0; i < 10; i++) {
        // console.log(res.data[i].images.preview_gif);
        var tempGif = $("<img>");
        tempGif.attr("class", "giphy");
        tempGif.attr("data-still", res.data[i].images.fixed_height_still.url);
        tempGif.attr("data-animate", res.data[i].images.fixed_height.url);
        tempGif.attr("src", res.data[i].images.fixed_height_still.url );
        tempGif.click(GiphyClick);
        var card = $("<div class=\"card\">");
        
        var cardBody = $("<div class=\"card-body\">");
        var cardTitle = $("<div class=\"card-title\">");
        cardTitle.text(res.data[i].rating);
        
        cardBody.append(cardTitle);
        cardBody.append(tempGif);
       
        card.append(cardBody);
        
    
        $("#gif-view").prepend(card);
    }

}

function AddButton() {
    var newTopic = $("#newTopic").val();
    topics.push(newTopic);
    // $("#buttons").empty();
    // console.log(newTopic);
    // console.log(topics);
    // RenderButtons();
    var tempButton = $("<button>");
        tempButton.attr("data-name", newTopic);
        tempButton.attr("class", "topic");
        tempButton.text(newTopic);
        $("#buttons").append(tempButton);
        $(".topic").click(GetTopic);
}