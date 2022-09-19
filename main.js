let genreList = document.querySelector(".genre-list");
let moviesList = document.querySelector(".movies-list");
const genreUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key=03b17a1691b771af4f892d87416c2236&language=en-US";
let page = 1;
let gChose = [];
let selectedMovies = [][2];

// fetch api to get genres
fetch(genreUrl)
    .then(res => res.json())
    .then((file) =>
        {file.genres.forEach(
            (genreSet) => {
                let D = document.createElement("li");
                let a = document.createElement("p");
                a.setAttribute("target", "_blank");
                a.addEventListener("click", function(){editList(gChose, genreSet.id, page, D, selectedMovies)});
                a.setAttribute("style", "padding-top: 5px;");
                a.textContent = genreSet.name;
                D.className = ".genre-list";
                console.log(a);
                console.log(D);
                D.appendChild(a);
                genreList.appendChild(D);
            }
        )}
    )

// edits gChose (array of genre ids), and creates an appropriate url for the api
function editList(gC, id, page, D, selectedMovies){
    // removes id from gChose if id already exists in gChose, adds id to gChose if id does not exist in gChose
    let doesNotExist = true;
    for (let i = 0; i<gC.length; i++){
        if (gC[i]==id){
            gC.splice(i, 1);
            doesNotExist = false;
            D.style.backgroundColor = "#F2F2F2"
        }
    }
    if(doesNotExist){
        gC.push(id);
        D.style.backgroundColor = "#ffffdc";
    }
        
    
    // error checking
    let tempCheck = "";
    for (let i = 0; i<gC.length; i++){
        tempCheck += " ";
        tempCheck += gC[i];
    }
    console.log(tempCheck);

    // clears movie-list
    document.getElementById("root").innerHTML = "";

    // creates proper url to fetch
    if (gC.length>0){
        let tempGenre = "&with_genres=".concat(gC[0].toString());
        for (let i = 1; i<gC.length; i++){
            tempGenre += "%2C";
            tempGenre += (gC[i].toString());
        }
        let movieData = {
            url: "https://api.themoviedb.org/3/discover/movie?api_key=03b17a1691b771af4f892d87416c2236&language=en-US&region=Us&sort_by=popularity.desc&include_adult=false&include_video=false",
            pg: "&page=".concat(page.toString()),
            yr: "&year=".concat(((new Date()).getFullYear()).toString()),
            gnre: tempGenre
        };
        let {url, pg, yr, gnre} = movieData;
        let movieURL = `${url}${page}${yr}${gnre}`;
        
        getMovies(movieURL, page);
    }
}

// calls an api that will allow the website to display the names of movies
function getMovies(movieURL, page){
    console.log(movieURL);

    fetch(movieURL)
        .then(res => res.json())
        .then((file1) =>
            {file1.results.forEach(
                (movieSet) => {//if not in array of movies, execute?
                    let D = document.createElement("li");
                    let a = document.createElement("p");
                    a.setAttribute("target", "_blank");
                    a.addEventListener("click", function(){makeCard(movieSet.id)});
                    a.setAttribute("style", "padding-top: 5px;");
                    a.textContent = movieSet.original_title;
                    D.className = ".movies-list";
                    D.appendChild(a);
                    moviesList.appendChild(D);
                }
            )}
        )
}

function makeCard(mID){
    
}

/* to do:
1. Make it so that on hover of a genre, hilight
2. When genre is clicked, permanent hilight and show cards in not selected
3. When genre is clicked twice, unhilight
4. When movie is hovered over, hilight temp
5. When movie is clicked, highlight permament 
6. When movie is clicked twice, unhilight
7. When movie is clicked, show a card in selected
*/