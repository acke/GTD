// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var gtd = {};

Ti.include('maps/geolocation.js', 
	'navigator.js', 
	'database/checklistDB.js',
	'model/project.js',
	'model/checklist.js',
	'Views/login.js', 
	'utils/log.js', 
	'net/httpClient.js', 
	'net/sendHTTP.js'
);

//Database testning

var data = {
    checklist_id: 1,
    name: 'TestDBStringValue'
};


gtd.model.checklist.addNewChecklist(data);

Titanium.API.addEventListener('databaseUpdated', function(){
    Titanium.API.info("event databaseUpdated caught");
});

var checklist = gtd.model.checklist.getChecklist(1);

//Geolocatin testing
var location = gtd.location.getLocation();

Ti.API.info('longitude: ' + location.longitude);

Titanium.API.info("get checklist [1] from model: "+gtd.model.checklist.getChecklist(1)[0].name);

var tabs = gtd.ui.navigator.createApplicationTabGroup();

tabs.open();

