// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var gtd = {};

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

Ti.include('gtd.js');

// open tab group
tabGroup.open();

