/*
This file contains all of the code running in the background that makes resumeBuilder.js possible. We call these helper functions because they support your code in this course.

Don't worry, you'll learn what's going on in this file throughout the course. You won't need to make any changes to it until you start experimenting with inserting a Google Map in Problem Set 3.

Cameron Pittman
*/
/*
These are HTML strings. As part of the course, you'll be using JavaScript functions
replace the %data% placeholder text you see in them.
*/
var HTMLheaderName = '<h1 id="name">%data%</h1>';
var HTMLheaderRole = '<span class="white-text">%data%</span><hr>';

var HTMLcontactGeneric = '<li class="flex-item"><span class="orange-text">%contact%</span><span class="white-text">%data%</span></li>';
var HTMLmobile = '<li class="flex-item"><span class="orange-text">mobile</span><span class="white-text">%data%</span></li>';
var HTMLemail = '<li class="flex-item"><span class="orange-text">email</span><span class="white-text">%data%</span></li>';
var HTMLtwitter = '<li class="flex-item"><span class="orange-text">twitter</span><span class="white-text">%data%</span></li>';
var HTMLgithub = '<li class="flex-item"><span class="orange-text">github</span><span class="white-text">%data%</span></li>';
var HTMLblog = '<li class="flex-item"><span class="orange-text">blog</span><span class="white-text">%data%</span></li>';
var HTMLlocation = '<li class="flex-item"><span class="orange-text">location</span><span class="white-text">%data%</span></li>';

var HTMLbioPic = '<img src="%data%" class="biopic">';
var HTMLwelcomeMsg = '<span class="welcome-message class=white-text">%data%</span>';

var HTMLskillsStart = '<h3 id="skills-h3">Skills at a Glance:</h3><ul id="skills" class="flex-column"></ul>';
var HTMLskills = '<li class="flex-item items_list_style"><span class="white-text">%data%</span></li>';
var HTMLobjectiveStart = '<h3 id="objectiveh3">Objectives:</h3>';
var HTMLObjective = '<div class="objective flex-column">%data%</div>';

var HTMLworkStart = '<div class="work-entry"></div>';
var HTMLworkEmployer = '<a href="#">%data%';
var HTMLworkTitle = ' - %data%</a>';
var HTMLworkDates = '<div class="date-text">%data%</div>';
var HTMLworkLocation = '<div class="location-text">%data%</div>';
var HTMLworkDescription = '<p><br>%data%</p>';

var HTMLprojectStart = '<div class="project-entry"></div>';
var HTMLprojectTitle = '<a href="#">%data%';
var HTMLprojectClient = ' - %data%</a>';
var HTMLprojectDates = '<div class="date-text">%data%</div>';
var HTMLprojectLocation = '<div class="location-text">%data%</div>';
var HTMLprojectDescription = '<p><br>%data%</p>';
var HTMLprojectImage = '<img src="%data%">';

var HTMLschoolStart = '<div class="education-entry"></div>';
var HTMLschoolName = '<a href="#">%data%';
var HTMLschoolDegree = ' -- %data%</a>';
var HTMLschoolDates = '<div class="date-text">%data%</div>';
var HTMLschoolLocation = '<div class="location-text">%data%</div>';
var HTMLschoolMajor = '<em><br>Major: %data%</em>';

var HTMLonlineClasses = '<h3>Online Classes</h3>';
var HTMLonlineTitle = '<a href="#">%data%';
var HTMLonlineSchool = ' - %data%</a>';
var HTMLonlineDates = '<div class="date-text">%data%</div>';
var HTMLonlineURL = '<br><a href="https://www.udacity.com/" target="_blank">%data%</a>';

//var internationalizeButton = '<button>Internationalize</button>';
var googleMap = '<div id="map"></div>';

/*
The Internationalize Names challenge found in the lesson Flow Control from JavaScript Basics requires you to create a function that will need this helper code to run. Don't delete! It hooks up your code to the button you'll be appending.
*/
$(document).ready(function() {
    $('button').click(function() {
        var $name = $('#name');
        var iName = inName($name.text()) || function() {};
        $name.html(iName);
    });
});

/*
The next few lines about clicks are for the Collecting Click Locations quiz in the lesson Flow Control from JavaScript Basics.
*/
var clickLocations = [];

function logClicks(x, y) {
    clickLocations.push({
        x: x,
        y: y
    });
    console.log('x location: ' + x + '; y location: ' + y);
}

$(document).click(function(loc) {
    // your code goes here!
});

/*
This is the fun part. Here's where we generate the custom Google Map for the website.
See the documentation below for more details.
https://developers.google.com/maps/documentation/javascript/reference
*/
var map; // declares a global map variable
var currentInfoWindow = null;
/*
Start here! initializeMap() is called when page is loaded.
*/
function initializeMap() {
    var locations;
    var mapOptions = {
        disableDefaultUI: true

    };

    /*
    For the map to be displayed, the googleMap var must be
    appended to #mapDiv in resumeBuilder.js.
    */
    map = new google.maps.Map(document.querySelector('#map'), mapOptions);

    /*
    locationFinder() returns an array of every location string from the JSONs
    written for bio, education, and work.
    */
    function locationFinder() {

        // initializes an empty array
        var locations = [];

        // adds the single location property from bio to the locations array
        locations.push(bio.contacts.location);

        // iterates through school locations and appends each location to
        // the locations array. Note that forEach is used for array iteration
        // as described in the Udacity FEND Style Guide:
        // https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
        education.schools.forEach(function(school) {
            locations.push(school.location);
        });

        // iterates through work locations and appends each location to
        // the locations array. Note that forEach is used for array iteration
        // as described in the Udacity FEND Style Guide:
        // https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
        work.jobs.forEach(function(job) {
            locations.push(job.location);
        });
        return locations;
    }

    /*
    createMapMarker(placeData) reads Google Places search results to create map pins.
    placeData is the object returned from search results containing information
    about a single location.
    */

    function createMapMarker(placeData) {

        // The next lines save location data from the search result object to local variables
        var lat = placeData.geometry.location.lat(); // latitude from the place service
        var lon = placeData.geometry.location.lng(); // longitude from the place service
        var name = placeData.formatted_address; // name of the place from the place service
        var bounds = window.mapBounds; // current boundaries of the map window

        // marker is an object with additional data about the pin for a single location

        var marker = new google.maps.Marker({
            map: map,
            position: placeData.geometry.location,
            title: name
        });

        var contentString = name;

        if (name == "New York, NY, USA") {
            contentString = name + '<div id="content">' +
                '<p><img src="images/New-york-city-Earth.jpg"></p> <a href="https://en.wikipedia.org/wiki/New_York" target="_blank">' +
                'https://en.wikipedia.org/wiki/New_York </a> ' +
                '</div>';
        } else if (name == "Hyderabad, Telangana, India") {
            contentString = name + '<div id="content">' +
                '<p><img src="images/Hyderabad.jpg"></p> <a href="https://en.wikipedia.org/wiki/Hyderabad" target="_blank">' +
                'https://en.wikipedia.org/wiki/Hyderabad </a> ' +
                '</div>';
        } else if (name == "Chennai, Tamil Nadu, India") {
            contentString = name + '<div id="content">' +
                '<p><img src="images/chennai.jpg"></p> <a href="https://en.wikipedia.org/wiki/Chennai" target="_blank">' +
                'https://en.wikipedia.org/wiki/Chennai </a> ' +
                '</div>';
        } else if (name == "Salem, Tamil Nadu, India") {
            contentString = name + '<div id="content">' +
                '<p><img src="images/Salem.JPG"></p> <a href="https://en.wikipedia.org/wiki/Salem,_Tamil_Nadu" target="_blank">' +
                'https://en.wikipedia.org/wiki/Salem_Tamil_Nadu </a> ' +
                '</div>';
        }

        // infoWindows are the little helper windows that open when you click
        // or hover over a pin on a map. They usually contain more information
        // about a location.
        var infoWindow = new google.maps.InfoWindow({
            content: contentString
        });

        // hmmmm, I wonder what this is about...
        google.maps.event.addListener(marker, 'click', function() {
            if (currentInfoWindow !== null) {
                currentInfoWindow.close();
            }

            infoWindow.open(map, marker);
            currentInfoWindow = infoWindow;
        });

        // this is where the pin actually gets added to the map.
        // bounds.extend() takes in a map location object
        bounds.extend(new google.maps.LatLng(lat, lon));
        // fit the map to the new marker
        map.fitBounds(bounds);
        // center the map
        map.setCenter(bounds.getCenter());
    }

    /*
    callback(results, status) makes sure the search returned results for a location.
    If so, it creates a new map marker for that location.
    */
    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            createMapMarker(results[0]);
        }
    }

    /*
    pinPoster(locations) takes in the array of locations created by locationFinder()
    and fires off Google place searches for each location
    */
    function pinPoster(locations) {

        // creates a Google place search service object. PlacesService does the work of
        // actually searching for location data.
        var service = new google.maps.places.PlacesService(map);

        // Iterates through the array of locations, creates a search object for each location
        locations.forEach(function(place) {
            // the search request object
            var request = {
                query: place
            };

            // Actually searches the Google Maps API for location data and runs the callback
            // function with the search results after each search.
            service.textSearch(request, callback);
        });
    }

    // Sets the boundaries of the map based on pin locations
    window.mapBounds = new google.maps.LatLngBounds();

    // locations is an array of location strings returned from locationFinder()
    locations = locationFinder();

    // (locations) creates pins on the map for each location in
    // the locations array
    pinPoster(locations);

}

/*
Uncomment the code below when you're ready to implement a Google Map!
*/

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
    //Make sure the map bounds get updated on page resize
    map.fitBounds(mapBounds);
});

//Bar Chart for Marks Scored
var margin = {
        top: 40,
        right: 20,
        bottom: 70,
        left: 70
    },
    width = 800 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var formatPercent = d3.format(".0%");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.1);

var y = d3.scale.linear()
    .domain([0, 100])
    .range([height, 1]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent);

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
        return "<strong>Marks Scored:</strong> <span style='color:red'>" + d.markScored * 100 + "%</span>";
    });

var svg = d3.select("#barchart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

// The barchart data variable.
var data = [{
        letter: "Secondary School Edu",
        markScored: 0.84
    }, {
        letter: "Higher Secondary",
        markScored: 0.82
    }, {
        letter: "B.Sc.Computer Science",
        markScored: 0.75
    }, {
        letter: "M.Sc.Computer Science",
        markScored: 0.77
    }

];

// The following code was contained in the callback function.
x.domain(data.map(function(d) {
    return d.letter;
}));
y.domain([0, d3.max(data, function(d) {
    return d.markScored;
})]);
y.domain([0, 1]);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);


svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) {
        return x(d.letter);
    })
    .attr("width", x.rangeBand())
    .attr("y", function(d) {
        return y(d.markScored);
    })
    .attr("height", function(d) {
        return height - y(d.markScored);
    })
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);

// responsive bar chart
document.addEventListener("DOMContentLoaded", resize);
d3.select(window).on('resize', resize);

function resize() {

    width = parseInt(d3.select('#barchart').style('width'), 10);
    width = width - margin.left - margin.right;
    height = parseInt(d3.select("#barchart").style("height"));
    height = height - margin.top - margin.bottom;

    // resize the chart
    x.range([0, width]);
    x.rangeRoundBands([0, width], 0.1);
    y.range([height, 0]);

    yAxis.ticks(Math.max(height / 50, 2));
    xAxis.ticks(Math.max(width / 50, 2));

    d3.select(svg.node().parentNode)
        .style('width', (width + margin.left + margin.right) + 'px');

    svg.selectAll('.bar')
        .attr("x", function(d) {
            return x(d.letter);
        })
        .attr("width", x.rangeBand());

    svg.select('.x.axis').call(xAxis.orient('bottom')).selectAll("text").attr("y", 10);}