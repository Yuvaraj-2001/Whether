function registerLocal() {
    var name = document.getElementById("name").value;
    var mob = parseInt(document.getElementById("mob").value);

    if (name == "") {
        alert("please enter the valid details")
        return false;
    } else {
        console.log(typeof mob, typeof name)
        window.localStorage.setItem('name', name);
        window.localStorage.setItem('mobile', mob);
        document.getElementById("sign").style.display = "none";
        document.getElementById("signUser").innerHTML = window.localStorage.getItem('name');
        loading();
    }
}
function initialize() {
    geocoder = new google.maps.Geocoder();
  }
function loading() {
    var checkName = window.localStorage.getItem('name');
    if (checkName == null) {
        document.getElementById("signed").style.display = "none";
        document.getElementById("sign").style.display = "block";
    } else {
        document.getElementById("signUser").innerHTML = checkName;
        document.getElementById("signed").style.display = "block";
        document.getElementById("sign").style.display = "none";
    }

}

function update(){
    initialize() 
    var Name = window.localStorage.getItem('name');
    var Phone = window.localStorage.getItem('mobile');
    
    // var whether =  document.getElementById("whether");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    } 

}
function getWheterDetails() {
    const myKey = "39a9a737b07b4b703e3d1cd1e231eedc";
    const input = document.getElementById("location").innerHTML;
    //make request to url
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {

      var result = this.responseText;
      var data = [];
      data.push(result);
      debugger
      data = JSON.parse(data);
      console.log(data);
      document.getElementById("whether").innerHTML = data.weather[0].description;

      document.getElementById("high").innerHTML = data.main.temp_max - 273.15;
      document.getElementById("low").innerHTML = data.main.temp_min - 273.15;
      document.getElementById("time").innerHTML = new Date();
      
    }
    xhttp.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${myKey}`);
    xhttp.send();
    
 
  }
function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    codeLatLng(lat, lng)
}
function errorFunction(){
    alert("Geocoder failed");
}
function codeLatLng(lat, lng) {

    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
      console.log(results)
        if (results[0]) {
         //formatted address
         document.getElementById("location").innerHTML = results[0].address_components[3].long_name
         getWheterDetails();
        //find country name
             for (var i=0; i<results[0].address_components.length; i++) {
            for (var b=0;b<results[0].address_components[i].types.length;b++) {

            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                    //this is the object you are looking for
                    city= results[0].address_components[i];
                    break;
                }
            }
        }
        //city data
        // console.log(city);
        // alert(city.short_name + " " + city.long_name)


        } else {
          alert("No results found");
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
  }

