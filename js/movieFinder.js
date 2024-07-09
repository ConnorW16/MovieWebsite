// COMMENT: This function has the settings for making requests as well as the fetch request itself
function searchMovie(){
    document.getElementById("rContainer").innerHTML=""
    var movie = document.getElementById("moviesearch").value;
    console.log(movie)
    
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkN2ZhZjZhMjdjMmI2M2Y4YWZjOGZiNjA5ZWJhMDU4ZSIsInN1YiI6IjY1Mjk0ZjA5MWYzZTYwMDExYzQ5OTQxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DOlj0BgYx9vWzHficVnFBwSL95hxE4R6FnKDxm7BzHY'
        }
    };
    // COMMENT: This is the initial fetch request
    fetch('https://api.themoviedb.org/3/search/multi?query='+movie+'&include_adult=true&language=en-US&page=1', options)
        .then(response => response.json())
        //.then(response => console.log(response))
        .then(function(moviesearch){
            moviesearch.results.forEach(fetchSearch);
            function fetchSearch(result){
                // COMMENT: This IF statement works out what type of content the results are
                if (result.media_type == "movie"){
                    // COMMENT: If the result has no image, a placeholder is diaplayed
                    if (result.poster_path == null){placeholderimage(result)}
                    // COMMENT: This creates new containers to display the information
                    else{document.getElementById("rContainer").innerHTML+="<a href='specificMovie.html?id="+result.id+"'><div class='responseBox'><div id='ImageBoxP' class='ImageBoxP-"+result.id+"' ><img class='poster' id='movieimg"+result.id+"' src=\"https://image.tmdb.org/t/p/w780" + result.poster_path + "\" alt=\"" + result.overview+ "\"/></div><div class='detailsBox'><div id='ImageBoxB' class='ImageBoxB-"+result.id+"' ><img class='backdrop' id='movieimg"+result.id+"' src=\"https://image.tmdb.org/t/p/w1280" + result.backdrop_path + "\" alt=\"" + result.overview+ "\"/></div><div class='Details' id='details-"+result.id+"'></div><div class='Overview' id='overview-"+result.id+"'></div></div></div></a>";}
                    // COMMENT: This is the next fetch which brings more details for the type of content
                    fetch('https://api.themoviedb.org/3/movie/'+result.id+'?language=en-US', options)
                        .then(response => response.json())
                        .then(response => displayDetails(response))
                    // COMMENT: It is then displayed in the relevant containers
                    function displayDetails(response){
                        document.getElementById("details-"+response.id+"").innerHTML+="<div class='Title'>"+response.title+"</div><div class='TagLine'>"+response.tagline+"</div><div class='Genres'>Genres:"+'<br>'+""+getGenres(response)+"</div>"
                        
                        document.getElementById("overview-"+response.id+"").innerHTML+="<div id='Overview'>"+response.overview+"</div>"
                        
                        // COMMENT: This function go into the array returned and gathers the different things to display
                        function getGenres(_response){
                            let Out = ""
                            for (var Genre in _response.genres){
                                Out += _response.genres[Genre].name + ", "+"<br>"+"  ";
                            }
                            return Out.slice(0, -2);
                        }
                    }
                // COMMENT: The same thing is then done for the other types of content returned
                }else if(result.media_type == "tv"){
                    if (result.poster_path == null){placeholderimage(result)}
                    else{document.getElementById("rContainer").innerHTML+="<a href='specificShow.html?id="+result.id+"'><div class='responseBox'><div id='ImageBoxP' class='ImageBoxP-"+result.id+"' ><img class='poster' id='tvimg"+result.id+"' src=\"https://image.tmdb.org/t/p/w780" + result.poster_path + "\" alt=\"" + result.overview+ "\"/></div><div class='detailsBox'><div id='ImageBoxB' class='ImageBoxB-"+result.id+"' ><img class='backdrop' id='tvimg"+result.id+"' src=\"https://image.tmdb.org/t/p/w1280" + result.backdrop_path + "\" alt=\"" + result.overview+ "\"/></div><div class='Details' id='details-"+result.id+"'></div><div class='Overview' id='overview-"+result.id+"'></div></div></div></a>";}
                    fetch('https://api.themoviedb.org/3/tv/'+result.id+'?language=en-US', options)
                        .then(response => response.json())
                        .then(response => displayDetails(response))
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
                }else if(result.media_type == "person"){
                    if (result.profile_path == null){placeholderimage(result)}
                    else{document.getElementById("rContainer").innerHTML+="<div class='responseBox'><div id='ImageBoxP' class='ImageBoxP-"+result.id+"' ><img class='poster' id='movieimg"+result.id+"' src=\"https://image.tmdb.org/t/p/w500" + result.profile_path + "\" alt=\"" + result.name+ "\"/></div><div class='detailsBox'><div class='Details' id='details-"+result.id+"'></div><div class='Overview' id='overview-"+result.id+"'></div></div></div>";}
                    fetch('https://api.themoviedb.org/3/person/'+result.id+'?language=en-US', options)
                        .then(response => response.json())
                        .then(response => displayDetails(response))

                    function displayDetails(response){
                        document.getElementById("details-"+response.id+"").innerHTML+="<div class='Title'>"+response.name+"</div><div class='Genres'>Known for - "+response.known_for_department+"</div><div class='Genres'>Birthday - "+response.birthday+"</div><div class='Genres'>Deathday - "+response.deathday+"</div>"

                        document.getElementById("overview-"+response.id+"").innerHTML+="<div id='Overview'>Biography - "+response.biography+"</div>"
                    }
                }
                
                function placeholderimage(result){
                    //console.log("hello world")
                    document.getElementById("rContainer").innerHTML+="<div class='responseBox'><div id='ImageBoxP' class='ImageBoxP-"+result.id+"' ><img class='poster' id='movieimg"+result.id+"' src=\"img/avatar-placeholder.jpg \" alt=\"" + result.name+ "\"/></div><div class='detailsBox'><div class='Details' id='details-"+result.id+"'></div><div class='Overview' id='overview-"+result.id+"'></div></div></div>";
                }
            }
        })
        .catch(err => console.error(err));
    return false;
}