//API from TMDB API



const API_KEY = '11d709982d73ca3b61226bf899b78a2b';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const API_URL = 'https://api.themoviedb.org/3/search/movie?api_key=11d709982d73ca3b61226bf899b78a2b'

const searchButton = document.querySelector('#search');
const input = document.querySelector('#inputMovie');
const movieShow = document.querySelector('#results-nowshowing')
const moviesContainer = document.querySelector('#movie-container')

const quotesEl = document.querySelector('#quotes')
const nextQuoteEl = document. querySelector('#nextQuote')

function quote() {
	fetch("https://api.api-ninjas.com/v1/quotes", {
	  method: "GET",
	  headers: { "X-Api-Key": "u12WMyDGHr9csYRBllF65A==cmlxJv37WKUgXjXz" },
	})
	  .then((res) => res.json())
	  .then((quote) => {
		let generatedQuote = quote[0].quote;
		let generatedAuthor = quote[0].author;
		// let getAuthor = quote[0].author;
		
		console.log(quote);
		quotesEl.innerHTML = generatedQuote;
	  });
  }

//   const author = document.createElement('p');
//   author.textContent = "Author: ", + quote[0].author;
//   quotesEl.append(author);



//Trailer video created url path
function createURL(path) {
const API_URL = `https://api.themoviedb.org/3${path}?api_key=11d709982d73ca3b61226bf899b78a2b`
return API_URL;
}

function requestMovies(API_URL, onComplete, onError) {
	fetch(API_URL)
.then((res) => res.json())
.then(onComplete)
.catch((onError) => {
});
}

function movieSegment(movies) {
	return movies.map((movie) => {
	if (movie.poster_path){
		return `<img 
		src=${IMG_URL + movie.poster_path} 
		data-movie-id=${movie.id}/>`;
	}
	  })
}

// movie div created
function movieContainer(movies, title = '',) {
	const movieEl = document.createElement('div');
	movieEl.setAttribute('class', 'movie');

	const moviePattern = `
	<h2>${title}</2>
	<section class="section">
  ${movieSegment(movies)}
</section>
<div class="content">
<p id="content-close">X</p>
</div>
	`;

	movieEl.innerHTML = moviePattern ;
	return movieEl;
}

function searchMovies(data) {
//data.results[] - how we get the movies to show
movieShow.innerHTML = '' //clears/replaces the search value
const movies = data.results;
const movieBlock = movieContainer(movies);
movieShow.appendChild(movieBlock);
}

function renderMovies(data) {
const movies = data.results;
const movieBlock = movieContainer(movies, this.title);
moviesContainer.appendChild(movieBlock);
}

function findMovie(value) {
	const path = '/search/movie';
	const url = createURL(path) + '&query=' + value;

	requestMovies(url, searchMovies, handleError);
}
function upcomingMovies(value) {
	const path = '/movie/upcoming';
	const url = createURL(path) + '&query=' + value;

	const render = renderMovies.bind({ title: 'UPCOMING MOVIES'});
	requestMovies(url, render, handleError);
}

function popularMovies (value) {
	const path = '/movie/popular';
	const url = createURL(path) + '&query=' + value;

	const render = renderMovies.bind({ title: 'POPULAR MOVIES'});
	requestMovies(url, render, handleError);
}

findMovie('hobbit')
upcomingMovies()
popularMovies()

function handleError(error) {
	console.log('Error: ', error);
}


searchButton.onclick = function(e) {
	e.preventDefault();
	const value = input.value;

	// used to fetch videos/movies
	findMovie(value);
input.value = '';
console.log('Value: ', value);
}

function createIframe(video) {
	const inframe = document.createElement('iframe');
	inframe.src = `https://www.youtube.com/embed/${video.key}`
	inframe.width = 360;
	inframe.height = 315;
	inframe.allowFullscreen = true;

	return inframe;
}

function videoTemplate(data, content) {
	// display movies
	content.innerHTML = '<p id="content-close"><i class="fa-sharp fa-solid fa-xmark"></i></i></p>'
	console.log('Videos: ', data);
	const videos = data.results;
	const length = videos.length > 4 ? 4 : videos.length;
	const iframeContainer = document.createElement('div'); //container to store the videos
	
	for (let i = 0; i < 1; i++) {
	
		const video = videos[0]; // video
		const iframe = createIframe(video);
		iframeContainer.appendChild(iframe);
		content.append(iframeContainer);
	}
}


//Event Delegation
document.onclick = function(event) {

	const target = event.target;

	if (target.tagName.toLowerCase() === 'img') {
		const movieId = target.dataset.movieId;
		console.log('Movie ID: ', movieId)
		const section = event.target.parentElement; //section
		const content = section.nextElementSibling; // content
		content.classList.add('content-display');

		if (target.id === 'content-close') {
			const content = target.parentElement;
			content.classList.remove('content-display');
		}

		const path = `/movie/${movieId}/videos`;
		const API_URL = createURL(path);
		//fetch movie videos
		fetch(API_URL)
		.then((res) => res.json())
	.then((data) => videoTemplate(data, content))
	.catch((error) => {
	
	console.log('Error ', error)
});
	}
	

}

// allows user to click the button for next quote
nextQuoteEl.addEventListener("click", function (event) {
	event.preventDefault();
	quote();
  });
  

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

//Trending Movies TMDB API

const movieURL = "https://api.themoviedb.org/3/trending/all/week?api_key=11d709982d73ca3b61226bf899b78a2b";
const movieImages = "https://image.tmdb.org/t/p/w500/";
const movieSearch = "https://api.themoviedb.org/3/search/movie?&api_key=11d709982d73ca3b61226bf899b78a2b&query=";

//Display results in browser

const main = document.getElementById("content");

getMovies(movieURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);

    showMovies(respData.results);
}

function showMovies(movies) {
    // clear main
    main.innerHTML = "";

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img
                src="${movieImages + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                    vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;

        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
};


