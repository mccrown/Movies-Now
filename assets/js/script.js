var genre = document.querySelector("data-genre-id");
var movieElement = document.querySelector("#movies");
var searchButton = document.querySelector("#button");
const disney = document.querySelector("#disney");
const netflix = document.querySelector("#netflix");
const hulu = document.querySelector("#hulu");
var disneyBtn = document.querySelector(".disney-btn");
var netflixBtn = document.querySelector(".netflix-btn");
var huluBtn = document.querySelector(".hulu-btn");
var linkHistory = JSON.parse(localStorage.getItem("links")) || [];
var historyEl = document.getElementById("history");



// fetch movies based on genre and streaming service
var streamingAPI = function (streamingService, genre) {

    fetch("https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=" + streamingService + "&type=movie&genre=" + genre + "&output_language=en&language=en", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
            "x-rapidapi-key": "c2e4a40e25msh764d0c03c3c77b5p1908ccjsnd1ec048c5ef4"
        }
    })
        .then(response => {

            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    // send data to displaystreaming function to display on page
                    displayStreaming(data);
                    // send movie titles to moviedb api
                    displayButton(streamingService, data);
                })
            }
        })
        .catch(err => {
            console.error(err);
        });
};

var displayStreaming = function (movies) {
    // console.log(movies);

    // iterate through movie data
    for (var i = 0; i < 5; i++) {

        //display movie name
        var nameEl = movieElement.querySelector("#movieName-" + i);
        var movieName = movies.results[i].title;
        nameEl.textContent = movieName;
        // console.log(movieName);

        // display movie overview
        var overviewEl = movieElement.querySelector("#overview-" + i);
        var movieOverview = movies.results[i].overview;
        overviewEl.textContent = movieOverview;

        // display movie image
        var image = movies.results[i].posterURLs[92];
        var imageEl = movieElement.querySelector("#movieImage-" + i);
        imageEl.setAttribute("src", image);
        imageEl.setAttribute("alt", "Movie poster");
        imageEl.width = "100px";
        imageEl.height = "200px";


        var index = 0;

        fetch("https://api.themoviedb.org/3/search/movie?api_key=aa604aaef9964db123112323ebc2e25b&query=" + movies.results[i].title.replace(" ", "+"))

            .then(response => {

                if (response.ok) {
                    response.json().then(function (data) {

                        // send data to displaystreaming function to display on page
                        // console.log(data, index);
                        displayRating(data, index);
                        index = index + 1;

                    })
                }
            })
            .catch(err => {
                console.error(err);
            });
    }
};


var displayRating = function (movies, index) {

    var ratingEl = movieElement.querySelector("#rating-" + index);
    var ratingNum = movies.results[0].vote_average;
    ratingEl.textContent = ratingNum + " / 10";
    // console.log(ratingNum);
}

var displayButton = function (streamingService, data) {
    var index = 0;
    for (var i = 0; i < 5; i++) {
        var watchOnBtn = document.querySelector("." + streamingService + "-btn-" + i).style.display = "block";

        //console.log(data);
        //console.log(streamingService);
        if (streamingService === "disney") {
            link = data.results[i].streamingInfo.disney.us.link;
            title = data.results[i].title;
            streamingDisBtn(link, index, title);
        }
        else if (streamingService === "netflix") {
            link = data.results[i].streamingInfo.netflix.us.link;
            title = data.results[i].title;
            streamingNetBtn(link, index, title);

        }
        else {
            link = data.results[i].streamingInfo.hulu.us.link;
            title = data.results[i].title;
            streamingHuluBtn(link, index, title);
        }
        index++;


        watchOnBtn.href = link;
        console.log(link);
    }
};

var streamingNetBtn = function (link, index, title) {
    for (i = 0; i < 5; i++)
    var linkSave = {
        clickedLink: link,
        title: title
    }
        document.getElementById("netflix-btn-" + index).onclick = function () {
            location.href = link;
            linkHistory.push(linkSave);
            localStorage.setItem("links", JSON.stringify(linkHistory));
        }
};

var streamingDisBtn = function (link, index, title) {
    for (i = 0; i < 5; i++)
        var linkSave = {
            clickedLink: link,
            title: title
        }
        document.getElementById("disney-btn-" + index).onclick = function () {
            location.href = link;
            linkHistory.push(linkSave);
            localStorage.setItem("links", JSON.stringify(linkHistory));
        }
};

var streamingHuluBtn = function (link, index, title) {
    for (i = 0; i < 5; i++)
    var linkSave = {
        clickedLink: link,
        title: title
    }
        document.getElementById("hulu-btn-" + index).onclick = function () {
            location.href = link;
            linkHistory.push(linkSave);
            localStorage.setItem("links", JSON.stringify(linkHistory));
        }
};

var loadLinkHistory = function () {
    var searchHis = [];
    searchHis = linkHistory;
    console.log(searchHis);
    createHistoryEl(searchHis);
}

var createHistoryEl = function (searchHis) {
    for (var i = 0; i < searchHis.length; i++) {
        const link = searchHis[i].clickedLink
        const title = searchHis[i].title;
        var historyItem = document.createElement("input");
        historyItem.setAttribute("type", "text");
        historyItem.setAttribute("readonly", true);
        historyItem.setAttribute("clas", "is-link is-light is-centered is-normal is-fullwidth")
        historyItem.setAttribute("href", link);
        historyItem.setAttribute("value", title);
        historyItem.addEventListener("click", function (event){
            event.preventDefault();
            location.href = link;
        })
        historyEl.append(historyItem);
    }
}

searchButton.addEventListener("click", function () {
    var streaming;
    var genre;
    if (disney.checked) {
        streaming = "disney";
    }
    else if (netflix.checked) {
        streaming = "netflix";
    }
    else {
        streaming = "hulu";
    };
    if (action.checked) {
        genre = "28";
    }
    else if (adventure.checked) {
        genre = "12";
    }
    else if (biography.checked) {
        genre = "1";
    }
    else if (comedy.checked) {
        genre = "35";
    }
    else if (crime.checked) {
        genre = "80";
    }
    else if (drama.checked) {
        genre = "18";
    }
    else if (horror.checked) {
        genre = "27";
    }
    else if (musical.checked) {
        genre = "4";
    }
    else if (mystery.checked) {
        genre = "9648";
    }
    else if (romance.checked) {
        genre = "10749";
    }
    else if (sport.checked) {
        genre = "5";
    };

    streamingAPI(streaming, genre);
});
loadLinkHistory();
