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


//IMDB results display.

var $input = document.getElementById('searchBox');
var baseUrl = "http://sg.media-imdb.com/suggests/";
var $result = document.getElementById('result');
var body = document.getElementsByTagName('body');

$input.addEventListener('keyup', function(){

	//clearing blank spaces from input
	var cleanInput = $input.value.replace(/\s/g, "");
	
	//clearing result div if the input box in empty
	if(cleanInput.length === 0) {
		$result.innerHTML = "";
	}
	
	if(cleanInput.length > 0) {
		
		var queryUrl = baseUrl + cleanInput[0].toLowerCase() + "/" 
					  + cleanInput.toLowerCase()
					  + ".json";	
		$.ajax({
		    
		    url: queryUrl,
		    dataType: 'jsonp',
		    cache: true,
		    jsonp: false,
		    jsonpCallback: "imdb$" + cleanInput.toLowerCase()
		
		}).done(function (result) {
	    	
	    	//clearing result div if there is a valid response
	    	if(result.d.length > 0) {
	    		$result.innerHTML = "";
	    	}
		    
		    for(var i = 0; i < result.d.length; i++) {
		    	
		    	var category = result.d[i].id.slice(0,2);
		    	
		    	if(category === "tt" || category === "nm") {		    		
		    		//row for risplaying one result
		    		var resultRow = document.createElement('a');
		    		resultRow.setAttribute('class', 'resultRow');
		    		var destinationUrl;

		    		if(category === "tt") {
		    			destinationUrl = "http://www.imdb.com/title/" + result.d[i].id;
		    		} else {
		    			destinationUrl = "http://www.imdb.com/name/" + result.d[i].id;
		    		}
		    		
		    		resultRow.setAttribute('href', destinationUrl);
		    		resultRow.setAttribute('target', '_blank');
		    		
		    		//creating and setting poster
		    		var poster = document.createElement('img');
		    		poster.setAttribute('class', 'poster');

		    		if(result.d[i].i) {
			    		var imdbPoster = result.d[i].i[0];
			    		imdbPoster = imdbPoster.replace("._V1_.jpg", "._V1._SX40_CR0,0,40,54_.jpg");
			    		var posterUrl = 
			    			"http://i.embed.ly/1/display/resize?key=798c38fecaca11e0ba1a4040d3dc5c07&url="
			    			+ imdbPoster
			    			+ "&height=54&width=40&errorurl=http%3A%2F%2Flalwanivikas.github.io%2Fimdb-autocomplete%2Fimg%2Fnoimage.png&grow=true"
			    		poster.setAttribute('src', posterUrl);
		    		}

		    		//creating and setting description
		    		var description = document.createElement('div');
		    		description.setAttribute('class', 'description');
		    		var name = document.createElement('h4');
		    		var snippet = document.createElement('h5');

		    		if(category === "tt" && result.d[i].y) {
		    			name.innerHTML = result.d[i].l + " (" + result.d[i].y + ")";
		    		} else {
		    			name.innerHTML = result.d[i].l;
		    		}
		    		snippet.innerHTML = result.d[i].s;

		    		$(description).append(name);
		    		$(description).append(snippet);

		    		$(resultRow).append(poster);
		    		$(resultRow).append(description);
		    		$("#result").append(resultRow);
		    	}
		    }
		
		});
	}
});
