//javascript.js
//set map options
            var myLatLng = {lat: 47.6062, lng: -122.3321};
            var mapOptions = {
                center: myLatLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP

            };

            //create map
            var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

//create a DirectionsService object to use the route method and get a result for our request
            var directionsService = new google.maps.DirectionsService();

            //create a DirectionsRenderer object which we will use to display the route
            var directionsDisplay = new google.maps.DirectionsRenderer();

            //bind the DirectionsRenderer to the map
            directionsDisplay.setMap(map);


//define calcRoute function
function calcRoute(){
    //create request
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    //pass the request to the route method
    directionsService.route(request, function(result, status){
    if(status == google.maps.DirectionsStatus.OK){

        //Get distance and time
        $("#output").html("<div class='alert-info'>From: "+ document.getElementById("from").value[0].toUpperCase() + document.getElementById("from").value.slice(1) + ".<br />To: "+document.getElementById("to").value.charAt(0).toUpperCase() + document.getElementById("to").value.slice(1)+".<br /> Driving distance: "+result.routes[0].legs[0].distance.text+".<br />Duration: "+result.routes[0].legs[0].duration.text + ".<br /> The road you're going to is: " +result.routes[0].summary +".</div>");
        console.log(result)

        //display route
        directionsDisplay.setDirections(result);
    }else{
        //delete route from map
        directionsDisplay.setDirections({routes: []});
        //center map in London
        map.setCenter(myLatLng);

        //show error message
        $("#output").html("<div class='alert-danger'>Could not retrieve distance.</div>");
    }
    });

}



//create autocomplete objects for all inputs
var options = {
    types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
