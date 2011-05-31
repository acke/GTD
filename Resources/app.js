// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var gtd = {};

Ti.include(	
	'navigator.js',
	'database/projectsDB.js',
	'database/tasksDB.js',
	'utils/log.js', 
	'net/sendHTTP.js',
	'net/httppost.js',
	'utils/quadrant.js',
	'utils/projectParsers.js',
	'utils/taskParsers.js',
	'net/getProjects.js',
	'net/getTasks.js', 
	'utils/verifyCredentials.js',
	'Views/login.js'
);

initProjectDB();

getProjects(function (project){
	updateProjectsDB(project);
});

initTasksDB();

getTasks(function (task){
	updateTasksDB(task);
});


var tabs = gtd.ui.navigator.createApplicationTabGroup();

tabs.open();

//Geolocatin testing
//var myLocation = gtd.location.getLocation();
//
//Ti.API.info('longitude: ' + myLocation.longitude);

//Returning to regular application execution.


