let genreList = document.querySelector(".genre-list");
let moviesList = document.querySelector(".movies-list");
let titleContainer = document.querySelector("title-box");
const genreUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key=03b17a1691b771af4f892d87416c2236&language=en-US";
let page = 1;
let gChose = [];
let selectedMovies = [];
let sMovName = [];

// fetch api to get genres
fetch(genreUrl)
    .then(res => res.json())
    .then((file) =>
        {file.genres.forEach(
            (genreSet) => {
                let D = document.createElement("li");
                let a = document.createElement("p");
                a.setAttribute("target", "_blank");
                a.addEventListener("click", function(){editList(gChose, genreSet.id, page, D, selectedMovies, sMovName, prevBttn, nextBttn, countNum)});
                a.setAttribute("style", "padding-top: 5px;");
                a.textContent = genreSet.name;
                D.className = ".genre-list";
                D.appendChild(a);
                genreList.appendChild(D);
            }
        )}
    )

// removes id from gChose if id already exists in gChose, adds id to gChose if id does not exist in gChose
// creates proper url to fetch movies
function editList(gC, id, page, D, selectedMovies, sMovName, prevBttn, nextBttn, countNum){
    let doesNotExist = true;
    for (let i = 0; i<gC.length; i++){
        if (gC[i]==id){
        gC.splice(i, 1);
        doesNotExist = false;
        D.style.backgroundColor = "#F2F2F2";
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

    getMovies(movieURL, page, selectedMovies, sMovName);
    }
}

// calls an api that will allow the website to display the names of movies
function getMovies(movieURL, page, selectedMovies, sMovName){
    console.log(movieURL);

    document.getElementById("root").innerHTML = "";
    for (let i = 0; i<selectedMovies.length; i++){
        let D = document.createElement("li");
        let a = document.createElement("p");
        a.setAttribute("target", "_blank");
        a.addEventListener("click", function(){editSMovies(selectedMovies[i], selectedMovies, D, sMovName[i], sMovName)});
        a.setAttribute("style", "padding-top: 5px;");
        a.textContent = sMovName[i];
        D.style.backgroundColor = "#ffffdc";
        D.className = ".movies-list";
        D.appendChild(a);
        moviesList.appendChild(D);
    }

    fetch(movieURL)
        .then(res => res.json())
        .then((file1) =>
            {file1.results.forEach(
                (movieSet) => {
                    let D = document.createElement("li");
                    let a = document.createElement("p");
                    a.setAttribute("target", "_blank");
                    a.addEventListener("click", function(){editSMovies(movieSet.id, selectedMovies, D, movieSet.original_title, sMovName)});
                    a.setAttribute("style", "padding-top: 5px;");
                    a.textContent = movieSet.original_title;
                    D.className = ".movies-list";
                    D.appendChild(a);
                    moviesList.appendChild(D);
                }
            )}
        )
}

// removes movie id from selectedMovies if the id already exists in selectedMovies, 
// adds the id to selectedMovies if id does not exist in selectedMovies
function editSMovies(id, selectedMovies, D, name, sMovName){
    let doesNotExist = true;
    for (let i = 0; i<selectedMovies.length; i++){
        if (selectedMovies[i]==id){
            selectedMovies.splice(i, 1);
            sMovName.splice(i, 1);
            doesNotExist = false;
            D.style.backgroundColor = "#F2F2F2";
        }
    }
    if(doesNotExist){
        selectedMovies.push(id);
        sMovName.push(name);
        D.style.backgroundColor = "#ffffdc";
    }
    createCards(selectedMovies);
}

function createCards(selectedMovies){
    let b = " ";
    for (let x = 0 ; x<selectedMovies.length; x++){
        b+= selectedMovies[x];
        b+=" ";
    }
    console.log(b);
}

/* to do: 
1. make next and previous buttons work
-figure out the syntax behind .append and setting innerhtml
2. need to add clause in fetch inside getMovie to prevent any selectedMovies from displaying twice
3. Make 2 boxes in index.html for cards that depend on the content inside
-ex. very thin layer of grey with title at top at the beginning when nothing is selected
-create a second function for editSMovies, but only for selectedMovies. only gets called in the first for loop of get movies
-the second editSMovies will call a different create cards
-the first editSMovies will call its original createCards which will create cards that have not yet been selected
4. There will be two flex boxes that the cards will output to. Each row will contain up to 4 cards.
-Each card will contain the title, genres, and bio. The container holding the contents of the card will be at z level 1.
-When the container is clicked, the user will be redirected to another part of the website that will display even more information about the movie
5. After the first few rows and, and the number of rows exceede the height of the lists, the maximum number of cards will increase to 5
6. There needs to be big text when there are no cards being displayed
*/