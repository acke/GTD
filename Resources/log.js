//
// create base UI tab and root window
//
var win3 = Titanium.UI.createWindow({  
    title:'Welcome',
    backgroundColor:'#fff'
});
var tab3 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Log',
    window:win3
});

var label3 = Titanium.UI.createLabel({
	color:'#999',
	text:'Log info:',
	font:{fontSize:10,fontFamily:'Helvetica Neue'},
	textAlign:'left',
	width:'auto'
});

win3.add(label3);
