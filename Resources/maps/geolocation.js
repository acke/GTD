(function() {
	gtd.location = {};

	gtd.location.getLocation = function () {
		var location = "";

		//NOTE: starting in 3.2+, you'll need to set the applications
		//purpose property for using Location services on iPhone
		Ti.Geolocation.purpose = "GPS demo";

		//
		// GET CURRENT POSITION - THIS FIRES ONCE
		//
		if (Titanium.Geolocation.locationServicesEnabled==false) {
			Titanium.UI.createAlertDialog({
				title:'Kitchen Sink',
				message:'Your device has geo turned off - turn it on.'
			}).show();
		} else {
			Titanium.Geolocation.getCurrentPosition( function(e) {
				if (!e.success || e.error) {
					currentLocation.text = 'error: ' + JSON.stringify(e.error);
					Ti.API.info("Code translation: "+translateErrorCode(e.code));
					alert('error ' + JSON.stringify(e.error));
					return;
				}

				//Titanium.API.info('geo - current location: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);

				location = {
					longitude: e.coords.longitude,
					latitude: e.coords.latitude,
					altitude: e.coords.altitude,
					heading: e.coords.heading,
					accuracy: e.coords.accuracy,
					speed: e.coords.speed,
					timestamp: e.coords.timestamp,
					altitudeAccuracy: e.coords.altitudeAccuracy
				};
				Ti.API.info("Longitude: " + location.longitude);
			});

			return location;
		};

	};
	
	function translateErrorCode(code) {
		if (code == null) {
			return null;
		}
		switch (code) {
			case Ti.Geolocation.ERROR_LOCATION_UNKNOWN:
				return "Location unknown";
			case Ti.Geolocation.ERROR_DENIED:
				return "Access denied";
			case Ti.Geolocation.ERROR_NETWORK:
				return "Network error";
			case Ti.Geolocation.ERROR_HEADING_FAILURE:
				return "Failure to detect heading";
			case Ti.Geolocation.ERROR_REGION_MONITORING_DENIED:
				return "Region monitoring access denied";
			case Ti.Geolocation.ERROR_REGION_MONITORING_FAILURE:
				return "Region monitoring access failure";
			case Ti.Geolocation.ERROR_REGION_MONITORING_DELAYED:
				return "Region monitoring setup delayed";
		}
	};
})();