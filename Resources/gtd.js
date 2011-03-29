//
// create base UI tab and root window
//

gtd.ui = {};

//Skapar ny tråd, denna kan inte nå variabler i resten av applicationen.
var win1 = Titanium.UI.createWindow({
    url:'navigator.js',
    title:'GTD'
});

var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'GTD viewer',
    window:win1
});

Ti.include('Views/login.js');

Ti.include('log.js');

//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2); 
tabGroup.addTab(tab3); 