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

