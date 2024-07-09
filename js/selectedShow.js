// COMMENT: This funtion is called by the fetch to insert the relevant data into the containers.
function seriesDetails(response){
    document.getElementById("rContainer").innerHTML+="<a href='specific.html?id="+response.id+"'><div class='responseBox'><div id='BackdropImage' class='ImageBoxB-"+response.id+"' ><img class='backdrop' id='movieimg"+response.id+"' src=\"https://image.tmdb.org/t/p/w1280" + response.backdrop_path + "\" alt=\"" + response.overview+ "\"/></div><div id='PosterImage' class='ImageBoxP"+response.id+"' ><img class='poster' id='tvimg"+response.id+"' src=\"https://image.tmdb.org/t/p/w780" + response.poster_path + "\" alt=\"" + response.overview+ "\"/></div><div class='DetailBox' id='details-"+response.id+"'></div></div></a>";
    
    document.getElementById("details-"+response.id+"").innerHTML+="<div class='Title'>"+response.name+"</div><div class='TagLine'>"+response.tagline+"</div><div class='Overview'>"+response.overview+"</div><a href="+response.homepage+"><div class='Networks'>Networks: "+getNetwork(response)+" (Link)</div></a><div class='RunTime'>Number of Episodes - "+response.number_of_episodes+"</div><div class='RunTime'>Number of Seasons - "+response.number_of_seasons+"</div><div class='AirDate'>First Aired - "+response.first_air_date+"</div><div class='AirDate'>Last Aired - "+response.last_air_date+"</div><div class='Creators'>Creators: "+getCreators(response)+"</div><div class='Genres'>Genres: "+getGenres(response)+"</div>";
    // COMMENT: These functions go into the arrays returned and gather the different things to display
    function getGenres(_response){
        let Out = ""
        for (var Genre in _response.genres){
          Out += _response.genres[Genre].name + ", ";
        }
        return Out.slice(0, -2);
    }
    function getNetwork(__response){
      let Out2 = ""
      for (var Network in __response.networks){
        Out2 += __response.networks[Network].name + ", ";
      }
      return Out2.slice(0, -2);
    }
    function getCreators(___response){
      let Out3 = ""
      for (var Creator in ___response.created_by){
        Out3 += ___response.created_by[Creator].name + ", ";
      }
      return Out3.slice(0, -2);
    }
}

// COMMENT: This function has the settings for making requests as well as the fetch request itself
function findContent(){
    document.getElementById("rContainer").innerHTML=""
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const seriesID = urlParams.get('id')
    console.log(seriesID);

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer'
        }
      };
      fetch('https://api.themoviedb.org/3/tv/'+seriesID+'?language=en-US', options)
        .then(response => response.json())
        //.then(response => console.log(response))
        .then(response=>seriesDetails(response))
        .catch(err => console.error(err));
}
