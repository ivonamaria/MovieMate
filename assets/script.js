//API from TMDB API

// var queryURL = "https://api.themoviedb.org/3/trending/all/week?api_key=11d709982d73ca3b61226bf899b78a2b"

//  $.ajax(
//   {
//     url: queryURL,
//     method: "GET"
//   })
//   .then(function(response){
//     console.log(response);
//     $('#movie-view').text(JSON.stringify(response));
//   })

//   function renderbutton() {
//     movies.forEach(function (movie) {
//       const movieButton = $('<button>');
//       movieButton.text(movie);
//       movieButton.attr("data-movie", movie);
//       moviesContainer.append(movieButton);

//     });
//     }

//API from imdb8, gives best picture winners, but only with movie ID

// const settings = {
//   "async": true,
//   "crossDomain": true,
//   "url": "https://imdb8.p.rapidapi.com/title/get-best-picture-winners",
//   "method": "GET",
//   "headers": {
//     "X-RapidAPI-Key": "2b2a801777msh19b7949ddada893p1c81e8jsn1c809b7c5d89",
//     "X-RapidAPI-Host": "imdb8.p.rapidapi.com"
//   }
// };

// $.ajax(settings).done(function (response) {
//   console.log(response);
// });

//API from TMDB website

// const API_KEY = 'api_key=4d4b3c800fcb1c117f604df7499ce00e';
// const MAIN_URL = 'https://api.themoviedb.org/3'
// const API_URL = MAIN_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;


//API from MovieGlu

// var settings = {
//   "url": "https://api-gate2.movieglu.com/trailers/?film_id=0317248",
//   "method": "GET",
//   "timeout": 0,
//   "headers": {
//   "api-version": "v200",
//   "Authorization": "Basic WEFWVjprcjdFZnc5NE9hRms=",
//   "client": "XAVV",
//   "x-api-key": "u1mzoGoznhBZ5iJDhBUd13ZZOiVZLvM2I82iFnne",
//   "device-datetime": "2020-06-18T12:07:57.296Z",
//   "territory": "UK",
//   "crossDomain": true
//   },
//   };
  
//   $.ajax(settings).done(function (response) {
//   console.log(response);
//   });




