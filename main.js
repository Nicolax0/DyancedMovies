const genreList = document.querySelector(".genre-list");
const movieList = document.querySelector(".movie-list");

const apiData = {
    url: "https://api.themoviedb.org/",
    parameters: "3/genre/tv/list",
    apiKey: "?api_key=03b17a1691b771af4f892d87416c2236",
    language: "&language=en-US"
}

const {url, parameters, apiKey, language}= apiData;
const apiUrl = `${url}${parameters}${apiKey}${language}`;

// call api to get genres
fetch(apiUrl)
    .then(res => res.json())
    .then((file) =>
        {file.genres.forEach(
            (genreSet) => {
                let list = document.createElement("li");
                let space = document.createElement("p");
                space.setAttribute("target", "_blank");
                space.addEventListener("click", function(){addToArray(genreSet.id)});
                space.setAttribute("style", "padding-top: 5px;");
                space.textContent = genreSet.name;
                list.className = ".genre-list";
                list.appendChild(space);
                genreList.appendChild(list);
            }
        )
        }
    )

function addToArray(id){

}