// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var gtd = {};

Ti.include('navigator.js');

var tabs = gtd.ui.navigator.createApplicationTabGroup();

tabs.open();

