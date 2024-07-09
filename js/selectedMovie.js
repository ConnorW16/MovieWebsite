// COMMENT: This funtion is called by the fetch to insert the relevant data into the containers.
function movieDetails(response){
  document.getElementById("rContainer").innerHTML+="<a href='specific.html?id="+response.id+"'><div class='responseBox'><div id='BackdropImage' class='ImageBoxB-"+response.id+"' ><img class='backdrop' id='movieimg"+response.id+"' src=\"https://image.tmdb.org/t/p/w1280" + response.backdrop_path + "\" alt=\"" + response.overview+ "\"/></div><div id='PosterImage' class='ImageBoxP"+response.id+"' ><img class='poster' id='movieimg"+response.id+"' src=\"https://image.tmdb.org/t/p/w780" + response.poster_path + "\" alt=\"" + response.overview+ "\"/></div><div class='DetailBox' id='details-"+response.id+"'></div></div></a>";
  
  document.getElementById("details-"+response.id+"").innerHTML+="<div class='Title'>"+response.title+"</div><div class='TagLine'>"+response.tagline+"</div><div class='RunTime'>Runtime (Minutes) - "+response.runtime+"</div><div class='Overview'>"+response.overview+"</div><a href="+response.homepage+"><div class='Networks'>Homepage - "+response.title+"</div></a><div class='Genres'>Production Companies: "+getCompanies(response)+"</div><div class='Genres'>Genres: "+getGenres(response)+"</div><div class='Genres'>Languages: "+getLanguages(response)+"</div>";
  // COMMENT: These functions go into the arrays returned and gather the different things to display
  function getGenres(_response){
    let Out = ""
    for (var Genre in _response.genres){
        Out += _response.genres[Genre].name + ", ";
    }
    return Out.slice(0, -2);
  }
  function getLanguages(__response){
    let Out2 = ""
    for (var Language in __response.spoken_languages){
        Out2 += __response.spoken_languages[Language].name + ", ";
    }
    return Out2.slice(0, -2);
  }
  function getCompanies(___response){
    let Out3 = ""
    for (var Company in ___response.production_companies){
        Out3 += ___response.production_companies[Company].name + ", ";
    }
    return Out3.slice(0, -2);
  }
}

// COMMENT: This function has the settings for making requests as well as the fetch request itself
function findContent(){
    document.getElementById("rContainer").innerHTML=""
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const movieID = urlParams.get('id')
    console.log(movieID);

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: ''
        }
      };
      fetch('https://api.themoviedb.org/3/movie/'+movieID+'?language=en-US', options)
        .then(response => response.json())
        //.then(response => console.log(response))
        .then(response=>movieDetails(response)
          // response => document.getElementById("rContainer").innerHTML+="<div class='responseBox'><div id='ImageBoxL' class='ImageBoxL-"+response.id+"' ><img class='poster' id='movieimg"+response.id+"' src=\"https://image.tmdb.org/t/p/w500" + response.poster_path + "\" alt=\"" + response.overview+ "\"/></div><div class='TextBox' id='textbox-"+response.id+"'></div></div>",
          // response => document.getElementById("textbox-"+movieID+"").innerHTML+="<div class='Title'>"+response.title+"</div><div class='TagLine'>"+response.tagline+"</div><div class='RunTime'>Runtime (Minutes) - "+response.runtime+"</div><div class='Overview'>"+response.overview+"</div>"
        )
        //.then(response => console.log(response))
        // .then(response => document.getElementById("textbox-"+movieID+"").innerHTML+="<div class='Title'>"+response.title+"</div><div class='TagLine'>"+response.tagline+"</div><div class='RunTime'>Runtime (Minutes) - "+response.runtime+"</div><div class='Overview'>"+response.overview+"</div>")
        .catch(err => console.error(err))
}
