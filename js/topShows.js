// COMMENT: This is a pre-written section of code written by the movie database's API which gets my login authorization to make requests to the API.
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: ''
    }
  };
    
    // COMMENT: This is a fetch request that gets the top tv shows of the week. It stores response to a JSON then runs a function which creates the required containers and then runs a seperate fetch togather more information to put in the containers
    fetch('https://api.themoviedb.org/3/trending/tv/week?language=en-US', options)
        .then(response => response.json())
        //.then(response => console.log(response))
        .then(function(tvimg){
            tvimg.results.forEach(fetchPopularTV);
    
            function fetchPopularTV(series){
                document.getElementById("rContainer").innerHTML+="<a href='specificShow.html?id="+series.id+"'><div class='responseBox'><div id='ImageBoxP' class='ImageBoxP-"+series.id+"' ><img class='poster' id='tvimg"+series.id+"' src=\"https://image.tmdb.org/t/p/w780" + series.poster_path + "\" alt=\"" + series.overview+ "\"/></div><div class='detailsBox'><div id='ImageBoxB' class='ImageBoxB-"+series.id+"' ><img class='backdrop' id='tvimg"+series.id+"' src=\"https://image.tmdb.org/t/p/w1280" + series.backdrop_path + "\" alt=\"" + series.overview+ "\"/></div><div class='Details' id='details-"+series.id+"'></div><div class='Overview' id='overview-"+series.id+"'></div></div></div></a>";
    
                fetch('https://api.themoviedb.org/3/tv/'+series.id+'?language=en-US', options)
                    .then(response => response.json())
                    //.then(response => console.log(response))
                    .then(response => displayDetails(response))
            } 
        })
        .catch(err => console.error(err));
    
// COMMENT: This funtion is called by the 2nd fetch to insert the relevant data into the containers.
function displayDetails(response){
    document.getElementById("details-"+response.id+"").innerHTML+="<div class='Title'>"+response.name+"</div><div class='TagLine'>"+response.tagline+"</div><div class='Genres'>Genres:"+'<br>'+""+getGenres(response)+"</div>"

    document.getElementById("overview-"+response.id+"").innerHTML+="<div id='Overview'>"+response.overview+"</div>"

    function getGenres(_response){
        let Out = ""
        for (var Genre in _response.genres){
            Out += _response.genres[Genre].name + ", "+"<br>"+"  ";
        }
        return Out.slice(0, -2);
    }
}
