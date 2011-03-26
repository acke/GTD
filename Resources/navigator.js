// create table view data object
var data = [
	{title:'Inbox', hasChild:true, test:'inbox.js'},
	{title:'API', hasChild:true, test:'api.js'}
];

// add iphone specific tests
if (Titanium.Platform.name == 'iPhone OS')
{
//	data.push({title:'Tabs', hasChild:true, test:'../examples/tabs.js'});
}

// add android specific tests
if (Titanium.Platform.osname == 'android')
{
//	data.push({title:'Preferences', hasChild:true, test:'../examples/preferences.js'});
}

// create table view
var tableview = Titanium.UI.createTableView({
	data:data
});

// create table view event listener
tableview.addEventListener('click', function(e)
{
	if (e.rowData.test)
	{
		var win = null;
		if (Ti.Platform.name == "android") {
			win = Titanium.UI.createWindow({
				url:e.rowData.test,
				title:e.rowData.title
			});
		} else {
			win = Titanium.UI.createWindow({
				url:e.rowData.test,
				title:e.rowData.title,
				backgroundColor:'#fff',
				barColor:'#111'

			});
		}


		if (e.index == 3)
		{
			win.hideTabBar();
		}
		Titanium.UI.currentTab.open(win,{animated:true});
	}
});

// add table view to the window
Titanium.UI.currentWindow.add(tableview);

Titanium.UI.currentWindow.addEventListener('focus', function()
{
	Ti.API.info('FOCUS RECEIVED IN navigator');
});
//
//  ADD EVENT LISTENERS FOR CUSTOM EVENTS
//
var win = Titanium.UI.createWindow({
	height:30,
	width:250,
	bottom:110,
	borderRadius:10
});

var view = Titanium.UI.createView({
	backgroundColor:'#000',
	opacity:0.7,
	height:30,
	width:250,
	borderRadius:10
});

var label = Titanium.UI.createLabel({
	color:'#fff',
	font:{fontSize:13},
	textAlign:'center',
	width:'auto',
	height:'auto'
});
win.add(view);
win.add(label);

Titanium.App.addEventListener('event_one', function(e)
{
	label.text = 'navigator.js: event one, array length = ' + e.data.length;
	win.open();
	setTimeout(function()
	{
		win.close({opacity:0,duration:500});
	},1000);
});

Titanium.App.addEventListener('event_two', function(e)
{
	label.text = 'navigator.js: event two, name = ' + e.name;
	win.open();
	setTimeout(function()
	{
		win.close({opacity:0,duration:500});
	},1000);

});


