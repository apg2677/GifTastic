var topics = ["Guitar", "Drums", "Bass", "Piano", "Saxaphone", "Trumpet"];
var still = true;

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
    // $(".giphy").click(function() {
    //     console.log("Clicked image!");
    // });
}
function GetTopic() {
    var choice = $(this).attr("data-name");
    if(still==true) {
        
        var state = $(this).attr("data-state");
        console.log("Still: "+ still);
        still = !still;
       
    }
    else {
        
        var state = $(this).attr("data-state");
        console.log("Still: " + still);
        still = !still;
    }
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

function RenderGifs(res) {
    for (var i = 0; i < 10; i++) {
        console.log(res.data[i].images.preview_gif);
        var tempGif = $("<img>");
        tempGif.attr("class", "giphy");
        tempGif.click(function() {
            alert("Clicked Image!");
        })
        tempGif.attr("src", res.data[i].images.fixed_height_still.url);
        $("#gif-view").prepend(tempGif);
    }

}

function AddButton() {
    var newTopic = $("#newTopic").val();
    topics.push(newTopic);
    // $("#buttons").empty();
    console.log(newTopic);
    console.log(topics);
    // RenderButtons();
    var tempButton = $("<button>");
        tempButton.attr("data-name", newTopic);
        tempButton.attr("class", "topic");
        tempButton.text(newTopic);
        $("#buttons").append(tempButton);
        $(".topic").click(GetTopic);
}