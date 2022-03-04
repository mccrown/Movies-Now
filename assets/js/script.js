

// fetch movies based on genre and streaming service
var streamingAPI = function(streamingService,genre) {
    fetch("https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=" + streamingService + "&type=movie&genre=" + genre + "&output_language=en&language=en", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "streaming-availability.p.rapidapi.com",
		"x-rapidapi-key": "454448608emsh73079d61e5d57cep1bb207jsn7a7395c1a6e0"
	}
})
.then(response => {
	
    if (response.ok) {
        response.json().then(function(data){
            // send data to displaystreaming function to display on page
            displayStreaming(data);
            // send movie titles to moviedb api
            
        })
    }
})
.catch(err => {
	console.error(err);
});
};
streamingAPI();