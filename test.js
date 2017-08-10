
(function ($) {



        function getLocation() {
            
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else { 

            
                console.log( "Geolocation is not supported by this browser.");
            }
        }

        function showPosition(position) {

        	var html = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude +',' + position.coords.longitude + '&sensor=false';
            var county_name = '';
            var full_county_array = $.parseJSON(county_array);


        	$.get(html, function (response) {

        		//console.log(response.results);

                response.results.forEach(function(result) {
     
                  result.address_components.forEach(function(comp) {
                  
                      if(comp.types[0] == 'administrative_area_level_2'){

                        //if this is found from google we have the county name
                        county_name = comp.long_name;

                      }

                    });

                });
               
                //attach the users county name to a div
                $("#demo").html(county_name);



                full_county_array.forEach(function(county){

                    console.log(county.county);
                    console.log(county.url);

                    if(county['county'] == county_name){

                        //set url here
                        console.log('HIT!')
                        //$(a.header-location-link).attr('href', county['url']);
                    }


                });



        	}, "json");
         

        }

          getLocation();

})(jQuery);