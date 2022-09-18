const genreList = document.querySelector(".genre-list");
const movieList = document.querySelector(".movies-list");
const genreUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key=03b17a1691b771af4f892d87416c2236&language=en-US";
let page = 1;
let gChose = [];

// fetch api to get genres
fetch(genreUrl)
    .then(res => res.json())
    .then((file) =>
        {file.genres.forEach(
            (genreSet) => {
                let list = document.createElement("li");
                let space = document.createElement("p");
                space.setAttribute("target", "_blank");
                space.setAttribute("rel", "noopener noreferer");
                space.addEventListener("click", function(){editList(gChose, genreSet.id, page)});
                space.setAttribute("style", "padding-top: 5px;");
                space.textContent = genreSet.name;
                list.className = ".genre-list";
                list.appendChild(space);
                genreList.appendChild(list);
            }
        )}
    )

// edits gChose (array of genre ids), and creates an appropriate url for the api
function editList(gC, id, page){
    // removes id from gChose if id already exists in gChose, adds id to gChose if id does not exist in gChose
    let doesNotExist = true;
    for (let i = 0; i<gC.length; i++){
        if (gC[i]==id){
            gC.splice(i, 1);
            doesNotExist = false;
        }
    }
    if(doesNotExist)
        gC.push(id);
    
    // error checking
    let tempCheck = "";
    for (let i = 0; i<gC.length; i++){
        tempCheck += " ";
        tempCheck += gC[i];
    }
    console.log(tempCheck);

    let tempGenre = "&with_genres=".concat(gC[0].toString());
    for (let i = 1; i<gC.length; i++){
        tempGenre += "%2C";
        tempGenre += (gC[i].toString());
    }

    let movieData = {
        url: "https://api.themoviedb.org/3/discover/movie?api_key=03b17a1691b771af4f892d87416c2236&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false",
        pg: "&page=".concat(page.toString()),
        yr: "&year=".concat(((new Date()).getFullYear()).toString()),
        gnre: tempGenre
    };
    let {url, pg, yr, gnre} = movieData;
    let movieURL = `${url}${page}${yr}${gnre}`;
    
    getMovies(movieURL, page);
}

// calls an api that will allow the website to display the names of movies
function getMovies(movieURL, page){
    document.getElementsByClassName(".movies-list").innerHTML = "";

    fetch(movieURL)
        .then(res => res.json())
        .then((file1) =>
            {file1.results.forEach(
                (movieSet) => {
                    let list = document.createElement("li");
                    let space = document.createElement("p");
                    space.setAttribute("target", "_blank");
                    space.addEventListener("click", function(){makeCard(movieSet.id)});
                    space.setAttribute("style", "padding-top: 5px;");
                    space.textContent = movieSet.original_title;
                    list.className = ".movies-list";
                    list.appendChild(space);
                    movieList.appendChild(list);
                }
            )}
        )
}

function makeCard(mID){

}