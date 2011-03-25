//
// create base UI tab and root window
//
var win3 = Titanium.UI.createWindow({  
    title:'Log info',
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

function listapi(){
	var poststring = 'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/'+tfuser.value+'&password='+tfpass.value+'&action=api_help';
	var fileName = 'inboxentries.xml';
	
	Ti.include(
  		'httppost.js'
	);
	
	var t = postHTTPClient (poststring, fileName);
}

listapi();

win3.add(label3);

