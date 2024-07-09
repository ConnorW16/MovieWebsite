// COMMENT: This is a pre-written section of code written by the movie database's API which gets my login authorization to make requests to the API.
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: ''
    }
};

// COMMENT: This is a fetch request that gets the top movies of the week. It stores response to a JSON then runs a function which creates the required containers and then runs a seperate fetch togather more information to put in the containers
fetch('https://api.themoviedb.org/3/trending/movie/week?language=en-US', options)
    .then(response => response.json())
    //.then(response => console.log(response))
    .then(function(movieimg){
        movieimg.results.forEach(fetchPopularMovies);

        function fetchPopularMovies(movie){
            document.getElementById("rContainer").innerHTML+="<a href='specificMovie.html?id="+movie.id+"'><div class='responseBox'><div id='ImageBoxP' class='ImageBoxP-"+movie.id+"' ><img class='poster' id='movieimg"+movie.id+"' src=\"https://image.tmdb.org/t/p/w780" + movie.poster_path + "\" alt=\"" + movie.overview+ "\"/></div><div class='detailsBox'><div id='ImageBoxB' class='ImageBoxB-"+movie.id+"' ><img class='backdrop' id='movieimg"+movie.id+"' src=\"https://image.tmdb.org/t/p/w1280" + movie.backdrop_path + "\" alt=\"" + movie.overview+ "\"/></div><div class='Details' id='details-"+movie.id+"'></div><div class='Overview' id='overview-"+movie.id+"'></div></div></div></a>";
            //console.log("random");
            //const movieID = movie.id;
            //console.log(movie.id);
            localStorage.setItem("movieId", movie.id);

            fetch('https://api.themoviedb.org/3/movie/'+movie.id+'?language=en-US', options)
                .then(response => response.json())
                //.then(response => console.log(response.genres))
                //.then(response => console.log(movie.title, movie.tagline, movie.runtime, movie.overview, movie.genres))
                //.then(response => console.log(response.title, response.tagline, response.runtime, response.overview, response.genres))
                //.then(response => console.log("ImageBoxL-"+movie.id+""))
                //.then(response => document.getElementById("textbox-"+movie.id+"").innerHTML+=movie.title+ movie.tagline +movie.runtime +movie.overview+ movie.genres)
                // response.genres.forEach(response.genres[1].name)
                //.then(response => response.genres.forEach(getGenres))
                .then(response => displayDetails(response))
        } 
    })
    .catch(err => console.error(err));

// COMMENT: This funtion is called by the 2nd fetch to insert the relevant data into the containers.
function displayDetails(response){
    document.getElementById("details-"+response.id+"").innerHTML+="<div class='Title'>"+response.title+"</div><div class='TagLine'>"+response.tagline+"</div><div class='Genres'>Genres:"+'<br>'+""+getGenres(response)+"</div>"
    
    document.getElementById("overview-"+response.id+"").innerHTML+="<div id='Overview'>"+response.overview+"</div>"
    
    function getGenres(_response){
        let Out = ""
        for (var Genre in _response.genres){
            Out += _response.genres[Genre].name + ", "+"<br>"+"  ";
        }
        return Out.slice(0, -2);
    }
}
