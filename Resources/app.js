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

//Database testning

var checklist = [{
	checklist_id: 1
	},{
	name: 'TestDB'
	}];
	
gtd.model.checklist.addNewChecklist(checklist);

Titanium.API.info(gtd.model.checklist.getChecklist(0));

gtd.model.checklist.addNewChecklist([{
	checklist_id: 2
	},{
	name: 'TestDB2'
	}]);

Titanium.API.info(gtd.model.checklist.getChecklist(0));

var tabs = gtd.ui.navigator.createApplicationTabGroup();

tabs.open();

