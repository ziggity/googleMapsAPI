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


// ParticlesJS Config.
 particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 180,
      "density": {
        "enable": true,
        "value_area": 1000
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "square",
      "stroke": {
        "width": 1,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 7
      }
    },
    "opacity": {
      "value": 0.8,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 6,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 5,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 300,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 3,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});
