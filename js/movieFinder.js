function searchMovie(){
    document.getElementById("demo").innerHTML=""
    var movie = document.getElementById("moviesearch").value;
    console.log(movie)
    
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkN2ZhZjZhMjdjMmI2M2Y4YWZjOGZiNjA5ZWJhMDU4ZSIsInN1YiI6IjY1Mjk0ZjA5MWYzZTYwMDExYzQ5OTQxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DOlj0BgYx9vWzHficVnFBwSL95hxE4R6FnKDxm7BzHY'
        }
    };
    fetch('https://api.themoviedb.org/3/search/multi?query='+movie+'&include_adult=true&language=en-US&page=1', options)
        .then(response => response.json())
        //.then(response => console.log(response))
        .then(function(moviesearch){
            moviesearch.results.forEach(fetchSearch);
            function fetchSearch(result){
                if (result.media_type == "movie"){
                    document.getElementById("demo").innerHTML+="<div class='responseBox'><div id='ImageBoxL' class='ImageBoxL-"+result.id+"' ><img class='poster' id='movieimg"+result.id+"' src=\"https://image.tmdb.org/t/p/w500" + result.poster_path + "\" alt=\"" + result.overview+ "\"/></div><div class='TextBox' id='textbox-"+result.id+"'></div></div>";
                    fetch('https://api.themoviedb.org/3/movie/'+result.id+'?language=en-US', options)
                    .then(response => response.json())
                    .then(response => document.getElementById("textbox-"+response.id+"").innerHTML+="<div class='Title'>"+response.title+"</div><div class='TagLine'>"+response.tagline+"</div><div class='RunTime'>Runtime (Minutes) - "+response.runtime+"</div><div class='Overview'>"+response.overview+"</div><div class='Genres'>Genres: "+getGenres(response)+"</div>")
                    function getGenres(_response){
                        let Out = ""
                        for (var Genre in _response.genres){
                            Out += _response.genres[Genre].name + ", ";
                        }
                        return Out.slice(0, -2);
                    }
                }else if(result.media_type == "tv"){
                    document.getElementById("demo").innerHTML+="<div class='responseBox'><div id='ImageBoxL' class='ImageBoxL-"+result.id+"' ><img class='poster' id='movieimg"+result.id+"' src=\"https://image.tmdb.org/t/p/w500" + result.poster_path + "\" alt=\"" + result.overview+ "\"/></div><div class='TextBox' id='textbox-"+result.id+"'></div></div>";
                    fetch('https://api.themoviedb.org/3/tv/'+result.id+'?language=en-US', options)
                    .then(response => response.json())
                    .then(response => document.getElementById("textbox-"+response.id+"").innerHTML+="<div class='Title'>"+response.name+"</div><div class='TagLine'>"+response.tagline+"</div><div class='RunTime'>Number of Episodes - "+response.number_of_episodes+"</div><div class='Overview'>"+response.overview+"</div><div class='Genres'>Genres: "+getGenres(response)+"</div>")
                    function getGenres(_response){
                        let Out = ""
                        for (var Genre in _response.genres){
                            Out += _response.genres[Genre].name + ", ";
                        }
                        return Out.slice(0, -2);
                    }
                }else if(result.media_type == "person"){
                    document.getElementById("demo").innerHTML+="<div class='responseBox'><div id='ImageBoxL' class='ImageBoxL-"+result.id+"' ><img class='poster' id='movieimg"+result.id+"' src=\"https://image.tmdb.org/t/p/w500" + result.profile_path + "\" alt=\"" + result.name+ "\"/></div><div class='TextBox' id='textbox-"+result.id+"'></div></div>";
                    fetch('https://api.themoviedb.org/3/person/'+result.id+'?language=en-US', options)
                    .then(response => response.json())
                    .then(response => document.getElementById("textbox-"+response.id+"").innerHTML+="<div class='Title'>"+response.name+"</div><div class='TagLine'>"+response.known_for_department+"</div><div class='RunTime'>Birthday - "+response.birthday+"</div><div class='RunTime'>Deathday - "+response.deathday+"</div><div class='Overview'>Biography - "+response.biography+"</div>")
                }
            }
        })
        .catch(err => console.error(err));
    return false;
}