const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// initinal URL
getMovie(API_URL);

async function getMovie(url) {
  const response = await fetch(url);
  const movieData = await response.json();
  showMovie(movieData.results);
}

function showMovie(movieData) {
  main.innerHTML = ""; // 清空舊的內容

  movieData.forEach((movie) => {
    const { title, poster_path, overview, vote_average } = movie;

    const newDiv = document.createElement("div");
    newDiv.classList.add("movie");

    newDiv.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}" />
        <div class="movie-info">
            <h3>${title}</h3>
        <span class="${voteAverage(vote_average)}">${vote_average}</span>
        </div>
             <div class="overview">
              <h3>${overview}</h3>
        </div>
          `;

    main.appendChild(newDiv);
  });
}

function voteAverage(vote_average) {
  if (vote_average > 7) {
    return "green";
  } else if (vote_average > 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchEL = search.value;

  if (searchEL && searchEL !== "") {
    getMovie(SEARCH_API + searchEL);
  } else {
    window.location.reload();
  }
});
