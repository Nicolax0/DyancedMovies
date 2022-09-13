const genreList = document.querySelector(".genre-list");
const movieList = document.querySelector(".movie-list");
const genreUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key=03b17a1691b771af4f892d87416c2236&language=en-US";

let gChose = [];

// call api to get genres
fetch(genreUrl)
    .then(res => res.json())
    .then((file) =>
        {file.genres.forEach(
            (genreSet) => {
                let list = document.createElement("li");
                let space = document.createElement("p");
                space.setAttribute("target", "_blank");
                space.addEventListener("click", function(){editList(gChose, genreSet.id)});
                space.setAttribute("style", "padding-top: 5px;");
                space.textContent = genreSet.name;
                list.className = ".genre-list";
                list.appendChild(space);
                genreList.appendChild(list);
            }
        )}
    )

function editList(gC, id){
    // removes id from gChose if exist in gChose, adds if not exist
    let doesNotExist = true;
    for (let i = 0; i<gC.length; i++){
        if (gC[i]==id){
            gC.splice(i, 1);
            doesNotExist = false;
        }
    }
    if(doesNotExist)
        gC.push(id);
    
    for (let i = 0; i<gC.length; i++){
        console.log(gC[i]);
    }
}