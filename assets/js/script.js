var genre = document.querySelector("data-genre-id");
var movieElement = document.querySelector("#movies");
const disney = document.querySelector("#disney");
const netflix = document.querySelector("#netflix");
const hulu = document.querySelector("#hulu");



// fetch movies based on genre and streaming service
var streamingAPI = function (streamingService, genre) {

    /* streamingService = whatever streaming service checkbox is checked
    var streamingService = function () {
        if (disney.checked) {
            streamingService = disney;
        }
        else if (netflix.checked) {
            streamingService = netflix;
        }
        else {
            streamingService = hulu;
        };
    };*/

    fetch("https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=" + streamingService + "&type=movie&genre=" + genre + "&page=1&output_language=en&language=en", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
            "x-rapidapi-key": "454448608emsh73079d61e5d57cep1bb207jsn7a7395c1a6e0"
        }
    })
        .then(response => {

            if (response.ok) {
                response.json().then(function (data) {
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


var displayStreaming = function (movies) {
    console.log(movies);

    // iterate through movie data
    for (var i = 0; i < movies.results.length; i++) {
        var entryIndex = i;

        fetch("https://api.themoviedb.org/3/search/movie?api_key=aa604aaef9964db123112323ebc2e25b&query=" + movies.results[i].title.replace(" ", "+"))
            .then(response => {

                if (response.ok) {
                    response.json().then(function (data) {
                        var templet = `
                        <hr>
                        <h4 >${data.results[0].title}</h4>
                        <hr>
                        <p class="rating">&starf;&starf;&starf;&starf;&starf;</p>
                        <p >${data.results[0].overview}</p>
                        <!-- pull movie image from API -->
                        <img alt="">
                        <div class="streaming-services columns is-mobile is-centered">
                            <!-- add image from API for streaming services -->
                            <button class="button is-info is-medium is-outlined column is-3">Watch on Disney+</button>
                            <button class="button is-danger is-medium is-outlined column is-3">Watch on Netflix</button>
                            <button class="button is-success is-medium is-outlined column is-3">Watch on Hulu</button>
                        </div>`
                        var resultsDiv = document.createElement("div");
                        resultsDiv.innerHTML = templet;
                        movieElement.append(resultsDiv);
                        debugger;
                        /*/ send data to displaystreaming function to display on page
                        //display movie name
                        var nameEl = document.getElementById("movieName-" + entryIndex);
                        console.log(nameEl);
                        var movieName = data.results[0].title;
                        console.log(movieName);
                        nameEl.textContent = movieName;



                        // display movie overview
                        var overviewEl = document.querySelector("#overview-" + entryIndex);
                        var movieOverview = data.results[0].overview;
                        overviewEl.textContent = movieOverview;

                        //display movie image
                        var image = data.results[0].posterURLs[i];
                        var imageEl = document.querySelector("#movieImage-" + entryIndex);
                        imageEl.setAttribute("src", image);
                        imageEl.setAttribute("alt", "Movie poster");*/





                    })
                }
            })
            .catch(err => {
                console.error(err);
            });

    }
};


streamingAPI("netflix", "1");




