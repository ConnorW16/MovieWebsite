const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkN2ZhZjZhMjdjMmI2M2Y4YWZjOGZiNjA5ZWJhMDU4ZSIsInN1YiI6IjY1Mjk0ZjA5MWYzZTYwMDExYzQ5OTQxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DOlj0BgYx9vWzHficVnFBwSL95hxE4R6FnKDxm7BzHY'
    }
};

fetch('https://api.themoviedb.org/3/trending/movie/week?language=en-US', options)
    .then(response => response.json())
    //.then(response => console.log(response))
    .then(function(movieimg){
        movieimg.results.forEach(fetchPopularMovies);




        function fetchPopularMovies(movie){
            document.getElementById("demo").innerHTML+="<div class='responseBox'><div id='ImageBoxL' class='ImageBoxL-"+movie.id+"' ><img class='poster' id='movieimg"+movie.id+"' src=\"https://image.tmdb.org/t/p/w500" + movie.poster_path + "\" alt=\"" + movie.overview+ "\"/></div><div class='TextBox' id='textbox-"+movie.id+"'></div></div>";
            //console.log("random");

            fetch('https://api.themoviedb.org/3/movie/'+movie.id+'?language=en-US', options)
                .then(response => response.json())
                // .then(response => console.log(response.genres))
                //.then(response => console.log(movie.title, movie.tagline, movie.runtime, movie.overview, movie.genres))
                //.then(response => console.log(response.title, response.tagline, response.runtime, response.overview, response.genres))
                //.then(response => console.log("ImageBoxL-"+movie.id+""))
                //.then(response => document.getElementById("textbox-"+movie.id+"").innerHTML+=movie.title+ movie.tagline +movie.runtime +movie.overview+ movie.genres)
                // response.genres.forEach(response.genres[1].name)
                //.then(response => response.genres.forEach(getGenres))

                .then(response => document.getElementById("textbox-"+response.id+"").innerHTML+="<div class='Title'>"+response.title+"</div><div class='TagLine'>"+response.tagline+"</div><div class='RunTime'>Runtime (Minutes) - "+response.runtime+"</div><div class='Overview'>"+response.overview+"</div><div class='Genres'>Genres: "+getGenres(response)+"</div>")
                function getGenres(_response){
                    let Out = ""
                    for (var Genre in _response.genres){
                        Out += _response.genres[Genre].name + ", ";
                    }
                    return Out.slice(0, -2);
                }
        } 
    })
    .catch(err => console.error(err));
