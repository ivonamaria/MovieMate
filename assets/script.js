//IMDB results display

var $input = document.getElementById("searchBox");
var baseUrl = "https://sg.media-imdb.com/suggests/";
var $result = document.getElementById("result");
var body = document.getElementsByTagName("body");

$input.addEventListener("keyup", function () {
  //clearing blank spaces from input
  var cleanInput = $input.value.replace(/\s/g, "");

  // clearing result div if the input box is empty
  if (cleanInput.length == 0) {
    $result.innerHTML = "";
    $result.style.display = "none"; // Hide the result div
  }

  if (cleanInput.length > 0) {
    var queryUrl = `${
      baseUrl + cleanInput[0].toLowerCase()
    }/${cleanInput.toLowerCase()}.json`;
    $.ajax({
      _url: queryUrl,
      get url() {
        return this._url;
      },
      set url(value) {
        this._url = value;
      },
      _dataType: "jsonp",
      get dataType() {
        return this._dataType;
      },
      set dataType(value) {
        this._dataType = value;
      },
      _cache: true,
      get cache() {
        return this._cache;
      },
      set cache(value) {
        this._cache = value;
      },
      _jsonp: false,
      get jsonp() {
        return this._jsonp;
      },
      set jsonp(value) {
        this._jsonp = value;
      },
      _jsonpCallback: "imdb$" + cleanInput.toLowerCase(),
      get jsonpCallback() {
        return this._jsonpCallback;
      },
      set jsonpCallback(value) {
        this._jsonpCallback = value;
      },
    }).done(function (result) {
      //clearing result div if there is a valid response
      if (result.d.length > 0) {
        $result.innerHTML = "";
        $result.style.display = "block";
      } else {
        $result.style.display = "none"; // Hide the result div if there are no search results
      }

      for (var i = 0; i < result.d.length; i++) {
        var category = result.d[i].id.slice(0, 2);

        if (category === "tt" || category === "nm") {
          //row for displaying one result
          var resultRow = document.createElement("a");
          resultRow.setAttribute("class", "resultRow");
          var destinationUrl;

          if (category === "tt") {
            destinationUrl = "https://www.imdb.com/title/" + result.d[i].id;
          } else {
            destinationUrl = "https://www.imdb.com/name/" + result.d[i].id;
          }

          resultRow.setAttribute("href", destinationUrl);
          resultRow.setAttribute("target", "_blank");

          //creating and setting poster
          var poster = document.createElement("img");
          poster.setAttribute("class", "poster");

          if (result.d[i].i) {
            var imdbPoster = result.d[i].i[0];
            imdbPoster = imdbPoster.replace(
              "._V1_.jpg",
              "._V1._SX40_CR0,0,40,54_.jpg"
            );
            var posterUrl =
              "https://i.embed.ly/1/display/resize?key=798c38fecaca11e0ba1a4040d3dc5c07&url=" +
              imdbPoster +
              "&height=54&width=40";
            poster.setAttribute("src", posterUrl);
          }

          //creating and setting description
          var description = document.createElement("div");
          description.setAttribute("class", "description");
          var name = document.createElement("h4");
          var snippet = document.createElement("h5");

          if (category === "tt" && result.d[i].y) {
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

// API key and URL for The Movie Database (TMDb)
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const API_URL =
  "https://api.themoviedb.org/3/search/movie?api_key=11d709982d73ca3b61226bf899b78a2b";

// DOM elements
const searchButton = document.querySelector("#search");
const input = document.querySelector("#inputMovie");
const movieShow = document.querySelector("#results-nowshowing");
const moviesContainer = document.querySelector("#movie-container");

// Creates a full API URL using the given path and API key
function createURL(path) {
  const API_URL = `https://api.themoviedb.org/3${path}?api_key=11d709982d73ca3b61226bf899b78a2b`;
  return API_URL;
}

// Sends a request to the TMDb API with the given URL and handles the response
function requestMovies(API_URL, onComplete, onError) {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data); // Log the JSON results
      onComplete(data);
    })
    .catch((error) => {
      console.log(error);
      onError(error);
    });
}

function movieSegment(movie) {
  const genres = movie.genres ? movie.genres.join(", ") : "";

  return `
    <div class="bg-white rounded-md bg-gray-800 shadow-lg">
      <div class="md:flex px-4 leading-none max-w-4xl">
        <div class="flex-none">
          <img
            src="${IMG_URL + movie.poster_path}"
            alt="${movie.title}"
            class="h-72 w-56 rounded-md shadow-2xl transform -translate-y-4 border-4 border-gray-300 shadow-lg"
          />
        </div>

        <div class="flex-col text-gray-300">
          <p class="pt-4 text-2xl font-bold">${movie.title}</p>
          <hr class="hr-text" data-content="">
          <div class="text-md flex justify-between px-4 my-2">
            <span class="font-bold">${movie.runtime} | ${genres}</span>
            <span class="font-bold">${movie.release_date}</span>
          </div>
          <p class="hidden md:block px-4 my-4 text-sm text-left">${
            movie.overview
          }</p>

          <p class="flex text-md px-4 my-2">
            Rating: ${movie.vote_average}/10 
            <span class="font-bold px-2">|</span>
            Mood: ${movie.mood}
          </p>

          <div class="text-xs">
            <button type="button" class="border border-gray-400 text-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline">TRAILER</button>
              
            <button type="button" class="border border-gray-400 text-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline">IMDB</button>
          </div>       
        </div>
      </div>
    </div>
  `;
}

// Creates the HTML for a movie container, which includes a title and movie segments
function movieContainer(movies, title = "") {
  const movieEl = document.createElement("div");
  movieEl.setAttribute("class", "movie");

  const movieSegments = movies.map((movie) => movieSegment(movie)).join('');

  const moviePattern = `
    <h2>${title}</h2>
    <section class="section">
      ${movieSegments}
    </section>
    <div class="content">
      <div id="content-close" type="search"></div>
    </div>
  `;

  movieEl.innerHTML = moviePattern;
  return movieEl;
}
// Handles the response from a movie search, and displays the results in the "now showing" section
function searchMovies(data) {
  movieShow.innerHTML = ""; //clears/replaces the search value
  const movies = data.results;
  const movieBlock = movieContainer(movies);
  movieShow.appendChild(movieBlock);
}

// Renders a list of movies in the movies container
function renderMovies(data) {
  const movies = data.results;

  const movieBlock = movieContainer(movies, this.title);
  moviesContainer.appendChild(movieBlock);
}

function findMovie(value) {
  const path = "/search/movie";
  const url = createURL(path) + "&query=" + value;

  requestMovies(url, searchMovies, handleError);
}
function upcomingMovies(value) {
  const path = "/movie/upcoming";
  const url = createURL(path) + "&query=" + value;

  const render = renderMovies.bind({ title: "UPCOMING MOVIES" });
  requestMovies(url, render, handleError);
}

function popularMovies(value) {
  const path = "/movie/popular";
  const url = createURL(path) + "&query=" + value;

  const render = renderMovies.bind({ title: "POPULAR MOVIES" });
  requestMovies(url, render, handleError);
}

findMovie("Avengers");
upcomingMovies();
popularMovies();

function handleError(error) {
  console.log("Error: ", error);
}

searchButton.onclick = function (e) {
  e.preventDefault();
  const value = input.value;

  // used to fetch videos/movies
  findMovie(value);
  input.value = "";
  console.log("Value: ", value);
};

function createIframe(video) {
  const inframe = document.createElement("iframe");
  inframe.src = `https://www.youtube.com/embed/${video.key}`;
  inframe.width = 360;
  inframe.height = 315;
  inframe.allowFullscreen = true;

  return inframe;
}

// Store reference to current open video section
let currentVideoSection = null;

function videoTemplate(data, content) {
  // Remove current open video section (if it exists)
  if (currentVideoSection) {
    currentVideoSection.remove();
  }

  // Display movies
  const videos = data.results;
  const videoSection = document.createElement("div"); //container to store the videos
  videoSection.className = "video-section";

  const closeButton = document.createElement("button");
  closeButton.innerHTML = "X";
  closeButton.addEventListener("click", () => {
    videoSection.remove();
  });
  videoSection.appendChild(closeButton);

  const iframeContainer = document.createElement("div");
  videos.forEach((video) => {
    const iframe = createIframe(video);
    iframeContainer.appendChild(iframe);
  });

  videoSection.appendChild(iframeContainer);
  content.appendChild(videoSection);

  // Store reference to current open video section
  currentVideoSection = videoSection;
}

//Event Delegation
document.onclick = function (event) {
  const target = event.target;

  if (target.tagName.toLowerCase() === "img") {
    const movieId = target.dataset.movieId;
    console.log("Movie ID: ", movieId);
    const section = event.target.parentElement; //section
    const content = section.nextElementSibling; // content
    content.classList.add("content-display");

    if (target.id === "content-close") {
      const content = target.parentElement;
      content.classList.remove("content-display");
    }

    const path = `/movie/${movieId}/videos`;
    const API_URL = createURL(path);
    //fetch movie videos
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => videoTemplate(data, content))
      .catch((error) => {
        console.log("Error ", error);
      });
  }
};



// Elements for random quotes section
const quotesEl = document.querySelector("#quotes");
const nextQuoteEl = document.querySelector("#nextQuote");

// Apply Tailwind classes to the elements
quotesEl.classList.add("text-lg", "font-bold", "text-white", "my-4");
nextQuoteEl.classList.add(
  "bg-blue-500",
  "text-white",
  "px-4",
  "py-2",
  "rounded"
);


// Fetches a random quote from an API and displays it on the page
function quote() {
  fetch("https://api.api-ninjas.com/v1/quotes?category=movies", {
    method: "GET",
    headers: {
      "X-Api-Key": "4AmTehiaKN3T/adJXOG83Q==YFsdIoPitDwwKv7D",
    },
  })
    .then((res) => res.json())
    .then((quote) => {
      let generatedQuote = quote[0].quote;
      let generatedAuthor = quote[0].author;
      quotesEl.innerHTML = `"<i>${generatedQuote}</i>" - ${generatedAuthor}`;
    });
}

// Displays a random quote
quote("");

// Allows user to click the button for the next quote
nextQuoteEl.addEventListener("click", function (event) {
  event.preventDefault();
  quote();
});
