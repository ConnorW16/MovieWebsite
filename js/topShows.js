const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkN2ZhZjZhMjdjMmI2M2Y4YWZjOGZiNjA5ZWJhMDU4ZSIsInN1YiI6IjY1Mjk0ZjA5MWYzZTYwMDExYzQ5OTQxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DOlj0BgYx9vWzHficVnFBwSL95hxE4R6FnKDxm7BzHY'
    }
  };
  
    fetch('https://api.themoviedb.org/3/trending/tv/week?language=en-US', options)
        .then(response => response.json())
        //.then(response => console.log(response))
        .then(function(tvimg){
            tvimg.results.forEach(fetchPopularTV);
    
            function fetchPopularTV(series){
                document.getElementById("demo").innerHTML+="<div class='responseBox'><div id='ImageBoxL' class='ImageBoxL-"+series.id+"' ><img class='poster' id='tvimg"+series.id+"' src=\"https://image.tmdb.org/t/p/w500" + series.poster_path + "\" alt=\"" + series.overview+ "\"/></div><div class='TextBox' id='textbox-"+series.id+"'></div></div>";
    
                fetch('https://api.themoviedb.org/3/tv/'+series.id+'?language=en-US', options)
                    .then(response => response.json())
                    //.then(response => console.log(response))
    
                    .then(response => document.getElementById("textbox-"+response.id+"").innerHTML+="<div class='Title'>"+response.name+"</div><div class='TagLine'>"+response.tagline+"</div><div class='RunTime'>Number of Episodes - "+response.number_of_episodes+"</div><div class='Overview'>"+response.overview+"</div><div class='Genres'>Genres: "+getGenres(response)+"</div>")
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
    