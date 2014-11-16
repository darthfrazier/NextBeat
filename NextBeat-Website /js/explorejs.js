  $(function() {
  	loaded = false;
  	Parse.initialize("5ai5K40eruZd75H1e7DJKm9yFflPDcrY4p8CBhYz", "7ZPkok5QEJePRza2GmHIu7l7HZBRpLcygrGODbAr");
  	getLocation();




  	$(document).on('keypress', '.enterPass', function(e) {
  		$this = $(this);
  		if (!e) e = window.event;
  		var keyCode = e.keyCode || e.which;
  		if (keyCode == '13') {
  			identifier = $(this).siblings('.eIdentify').text();
  			passwordGuess = $(this).val();
  			queryEvent = new Parse.Query("NewEvent");
  			queryEvent.get(identifier, {
  				success: function(object) {
  					realPass = object.attributes.eventPass;
  					if (passwordGuess == realPass)
  					{
  						window.location.href = '/' + identifier + '.html';
  					}
  					else
  					{
  						$this.val('');
  						$this.css('background','#EEB4B4');
  						$this.css('color','white');
  						

  					}
  				},

  				error: function(object, error) {
                      // error is an instance of Parse.Error.
                  }
              });

  			return false;
  		}
  	});
  	$(document).on('click', '.someEvent', function(e) {
  		if ($(this).children('.eTitle').children('.lock').html() == '')
  		{
  			$(this).children('.goTo').slideDown(250);
  			$(this).children('.goTo').click(function() {

  				identifier = $(this).siblings('.eIdentify').html();
  				window.location.href = '/' + identifier + '.html';
  			});
  			$(this).css('cursor','default');
  		}
  		else
  		{
  			$(this).children('.enterPass').slideDown(250);
  			$(this).children('.enterPass').focus();
  			$(this).css('cursor','default');
  		}
  	});


      /*
      		eName = $('#eName').val();
      		eDetails = $('#eDetails').val();
      		adminPass = $('#adminPass').val();
      		eventPass = $('#eventPass').val();

      		Parse.initialize("5ai5K40eruZd75H1e7DJKm9yFflPDcrY4p8CBhYz", "7ZPkok5QEJePRza2GmHIu7l7HZBRpLcygrGODbAr");

      		var NewEvent = Parse.Object.extend("NewEvent");
      		var newEvent = new NewEvent();
      		
      		var parseEvent = newEvent.save(
      			{name: eName, details: eDetails, adminPass: adminPass, eventPass: eventPass, latitude: lat, longitude: longi},
      			{
      				success:function(object) {
      					console.log('we made it');
      					mostRecent = object.id;
      					createPage();

      				},
      				error:function(model, error) {
      					console.log('shucks')
      				}
      			});*/




});
  /*put up all data*/
  function initialize() {
  	/*to hold all events*/
  	allEvents = [];
  	/*near events*/
  	nearEvents = [];
  	/*distances of close events*/
  	distances = [];

  	var query = new Parse.Query("NewEvent");
  	query.find({
  		success: function(results) {
  			for (var i = 0; i < results.length; i++) {
  				anEvent = results[i];
  				allEvents.push(anEvent);
  			}
  			dropMarkers();
  			loadEventBox();
  			loadSuccess = true;
              // results is an array of Parse.Object.
          },
          error: function(error) {
              // error is an instance of Parse.Error.
          }
      });

  }

  function dropMarkers() {
  	var myCurrLoc = new google.maps.LatLng(myCurrLat, myCurrLong);
  	var mapOptions = {
  		zoom: 14,
  		center: myCurrLoc
  	}
  	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  	var meMarker = new google.maps.Marker({
  		position: myCurrLoc,
  		map: map,
  		title: 'Current Location',
  		icon: '/meMarker.png'
  	});

  	/*what happens if you click on yourself*/
  	var meInfoWindow = new google.maps.InfoWindow({
  		content: "Current Location"
  	});

  	google.maps.event.addListener(meMarker, 'click', function() {
  		meInfoWindow.open(map, meMarker);
  	});


  	for (var j = 0; j < allEvents.length; j++) {
  		eventLat = allEvents[j].attributes.latitude;
  		eventLong = allEvents[j].attributes.longitude;

  		/*calculate near distance*/
  		var myLoc = new Parse.GeoPoint(myCurrLat, myCurrLong);
  		var eventLoc = new Parse.GeoPoint(eventLat, eventLong);
  		distance = myLoc.milesTo(eventLoc);

  		/*include events within radius of 5 miles*/
  		if (distance <= 5) {
  			console.log('events thus far:\n');
  			nearEvents;
  			nearEvents.push(allEvents[j]);
  			distances.push(distance);
  		}

  		/*each events location, description string & window, marker, clickable*/
  		var eventLoc = new google.maps.LatLng(eventLat, eventLong);

  		/*display lock?*/
  		if (allEvents[j].attributes.eventPass == '') {
  			lockOption = '';
  		} else {
  			lockOption = '<div class="lock"><i class="fa fa-lock"></i></div>';
  		}

  		/*display distance*/
  		distance = Math.round(distance * 10) / 10;
  		if (distance == 0)
  			distance = '<div class="distance">&nbsp<i class="fa fa-map-marker"></i> < 0.1 mi</div>'
  		else {
  			distance = '<div class="distance">&nbsp<i class="fa fa-map-marker"></i> ' + distance + ' mi</div>'
  		}


  		var contentString = '<div class="someEvent" style="background:white; box-shadow: none;"> \
  		<div class="eTitle">' + allEvents[j].attributes.name + lockOption + distance + '</div> \
  		<div class="eDetails">' + allEvents[j].attributes.details + '</div>\
  		</div>';

  		var infowindow = new google.maps.InfoWindow();

  		var marker = new google.maps.Marker({
  			position: eventLoc,
  			map: map,
  			title: allEvents[j].attributes.name
  		});

  		google.maps.event.addListener(marker, 'click', (function(marker, contentString, infowindow) {
  			return function() {
  				infowindow.setContent(contentString);
  				infowindow.open(map, marker);
  			};
  		})(marker, contentString, infowindow));

  	}
  	console.log('laoded');
  	$('#overlay').hide();
  	$('#waiting').hide();
  }



  function getLocation() {
  	console.log('trying to get location...');
  	$('#waiting').show();
  	$('#overlay').show();

  	if (navigator.geolocation) {
  		console.log('entered 1st part');
  		navigator.geolocation.getCurrentPosition(showPosition);
  	} else {
  		alert('If you want to create an event, please update your browser. Geolocation services need to be supported.');
  	}
  	navigator.geolocation.watchPosition(function(position) {
  		console.log('entered second part');
  		initialize();
  	},
  	function(error) {
  		if (error.code == error.PERMISSION_DENIED) {
  			initialize();
  			/*default to equad location if they deny*/
  			myCurrLat = 40.350707299999996;
  			myCurrLong = -74.65176290000001;
  			locAllowed = false;
  			return;
  		}
  	});
  }

  function showPosition(position) {
  	console.log('entered show position fn');
  	myCurrLat = position.coords.latitude;
  	myCurrLong = position.coords.longitude;
  }


  function loadEventBox() {
  	if (!loaded) {
  		console.log(nearEvents);
  		for (var k = 0; k < nearEvents.length; k++) {
  			if (nearEvents[k].attributes.eventPass == '') {
  				lockOption = '<div class="lock"></div>';
  			} else {
  				lockOption = '<div class="lock"><i class="fa fa-lock"></i></div>';
  			}

  			loadDistance = Math.round(distances[k] * 10) / 10;
  			if (loadDistance == 0)
  				loadDistance = '<div class="distance">&nbsp<i class="fa fa-map-marker"></i> < 0.1 mi</div>'
  			else {
  				loadDistance = '<div class="distance">&nbsp<i class="fa fa-map-marker"></i> ' + loadDistance + ' mi</div>'
  			}
  			console.log(nearEvents[k].attributes.eventPass);
  			htmlString = '<div class="someEvent"> \
  			<div class="eTitle">' + nearEvents[k].attributes.name + lockOption + loadDistance + '</div> \
  			<div class="eDetails">' + nearEvents[k].attributes.details + '</div>\
  			<div class="eIdentify" style="display:none">' + nearEvents[k].id + '</div>\
  			<input type="password" class="enterPass" placeholder="This event needs a password (enter)" style="display:none">\
  			<div class="goTo" style="display:none">Go to event</div>\
  			</div>';
  			console.log(nearEvents[k]);
  			$('#allEvents').prepend(htmlString);
  		}
  	}
  	loaded = true;


  }