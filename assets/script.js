<<<<<<< HEAD:assets/script.js
//API from TMDB website

const API_KEY = 'api_key=4d4b3c800fcb1c117f604df7499ce00e';
const MAIN_URL = 'https://api.themoviedb.org/3'
const API_URL = MAIN_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;

=======
var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=11d709982d73ca3b61226bf899b78a2b&language=en-US&page=1&include_adult=false";



 $.ajax(
  {
    url: queryURL,
    method: "GET"
  })
  .then(function(response){
    console.log(response);
    $('#movie-view').text(JSON.stringify(response));
  })

  function renderbutton() {
    movies.forEach(function (movie) {
      const movieButton = $('<button>');
      movieButton.text(movie);
      movieButton.attr("data-movie", movie);
      moviesContainer.append(movieButton);

    });
    }

    // const settings = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": "https://ott-details.p.rapidapi.com/advancedsearch?start_year=2010&end_year=2022&min_imdb=6&max_imdb=9&genre=action&language=english&type=movie&region&sort=latest&page=1",
    //     "method": "GET",
    //     "headers": {
    //         "X-RapidAPI-Key": "2b2a801777msh19b7949ddada893p1c81e8jsn1c809b7c5d89",
    //         "X-RapidAPI-Host": "ott-details.p.rapidapi.com"
    //     }
    // };
    
    // $.ajax(settings).done(function (response) {
    //     console.log(response);
    // });

    // const settings = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": "https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=netflix&type=movie&genre=18&page=1&output_language=en&language=en",
    //     "method": "GET",
    //     "headers": {
    //         "X-RapidAPI-Key": "2b2a801777msh19b7949ddada893p1c81e8jsn1c809b7c5d89",
    //         "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com"
    //     }
    // };
    
    // $.ajax(settings).done(function (response) {
    //     console.log(response);
    // });

//take input from the search button

    // const settings = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": "https://imdb8.p.rapidapi.com/auto-complete?q=game%20of%20thr",
    //     "method": "GET",
    //     "headers": {
    //         "X-RapidAPI-Key": "2b2a801777msh19b7949ddada893p1c81e8jsn1c809b7c5d89",
    //         "X-RapidAPI-Host": "imdb8.p.rapidapi.com"
    //     }
    // };
    
    // $.ajax(settings).done(function (response) {
    //     console.log(response);
    // });

    // const settings = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": "https://movie-quote.p.rapidapi.com/movie/fight",
    //     "method": "GET",
    //     "headers": {
    //         "X-RapidAPI-Key": "2b2a801777msh19b7949ddada893p1c81e8jsn1c809b7c5d89",
    //         "X-RapidAPI-Host": "movie-quote.p.rapidapi.com"
    //     }
    // };
    
    // $.ajax(settings).done(function (response) {
    //     console.log(response);
    // });


    // const settings = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": "https://imdb-movies-web-series-etc-search.p.rapidapi.com/thegodfather.json",
    //     "method": "GET",
    //     "headers": {
    //         "X-RapidAPI-Key": "2b2a801777msh19b7949ddada893p1c81e8jsn1c809b7c5d89",
    //         "X-RapidAPI-Host": "imdb-movies-web-series-etc-search.p.rapidapi.com"
    //     }
    // };
    
    // $.ajax(settings).done(function (response) {
    //     console.log(response);
    // });
>>>>>>> 4d43f64 (minor changes):assests/script.js
