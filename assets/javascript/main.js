var topics = ["Guitar", "Drums", "Bass", "Piano", "Saxaphone", "Trumpet"];


$(document).ready(function() {
    Initialize();
    
});

function RenderButtons() {
    for(var i= 0;i<topics.length;i++) {
        var tempButton = $("<button>");
        tempButton.attr("data-name", topics[i]);
        tempButton.attr("class", "topic");
        tempButton.text(topics[i]);
        $("#buttons").append(tempButton);
    }
}

function Initialize() {
    RenderButtons();
    $(".topic").click(GetTopic);
}

function GetTopic() {
    var choice = $(this).attr("data-name");
    var requestUrl = "https://api.giphy.com/v1/gifs/search?q=" + choice + "&api_key=L6xowQE91UNaYXFSoXvO5mEkxcG0Y3Tn&limit=5";
    $.ajax({
        url: requestUrl,
        method:"GET"
    }).then(function(response) {
        console.log(response);
        
        // $("#gif-view").text(JSON.stringify(response));
        RenderGifs(response);
    });
}

function RenderGifs(res) {
    for (var i=0;i<5;i++) {
        console.log(res.data[i].images.preview_gif);
        var tempGif = $("<img>");
        tempGif.attr("src", res.data[i].images.preview_gif.url);
        $("#gif-view").append(tempGif);
    }

}