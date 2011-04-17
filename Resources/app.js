// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var gtd = {};

Ti.include('navigator.js',
	'database/checklistDB.js',
	'model/project.js',
	'model/checklist.js',
	'Views/login.js',
	'utils/log.js',
	'net/httpClient.js',
	'net/sendHTTP.js'
);

var tabs = gtd.ui.navigator.createApplicationTabGroup();

tabs.open();

