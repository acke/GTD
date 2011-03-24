// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

Ti.include(
  'myRealApp.js'
);

//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Welcome',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Welcome to the GTD viewer',
    window:win1
});

var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'Welcome to the GTD viewer',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win1.add(label1);

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Configuration',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Configuration',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'Enter login details',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	height:35,
	top: 50,
	width:'auto'
});
var tfuser = Titanium.UI.createTextField({
	value:Titanium.App.Properties.getString("user"),
	color:'#336699',
	height:35,
	top:110,
	left:10,
	width:300,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});


var tfpass = Titanium.UI.createTextField({
	color:'#336699',
	height:35,
	top:150,
	left:10,
	width:300,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});


var confirmbtn = Titanium.UI.createButton({
	title:'Login',
	height:40,
	width:200,
	top:210

});

confirmbtn.addEventListener('click', function()
{
	Titanium.App.Properties.setString("user",tfuser.value);
    
	Ti.API.info('user',tfuser.value);

        c = Titanium.Network.createHTTPClient();
	c.setTimeout(10000);
	c.onload = function()
	{
		Ti.API.info('IN ONLOAD ');

		var filename = Titanium.Platform.name == 'android' ? 'test.png' : 'test.pdf';
		var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,filename);
		if (Titanium.Platform.name == 'android') {
			f.write(this.responseData);
		}
	};
	c.ondatastream = function(e)
	{
		Ti.API.info('ONDATASTREAM1 - PROGRESS: ' + e.progress);
	};
	c.onerror = function(e)
	{
		Ti.API.info('XHR Error ' + e.error);
	};

	// open the client
	if (Titanium.Platform.name == 'android') {
		//android's WebView doesn't support embedded PDF content
		c.open('GET', 'pn://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/knut.funkel&password=nktu.ufknle&action');
	} else {
		c.open('GET','https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/'+tfuser.value+'&password='+tfpass.value+'&action=inboxentries');
		c.file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'inboxentries.xml');
	}

	// send the data
	c.send();
	Ti.API.info('XML:',c.file);

});


win2.add(label2);
win2.add(tfuser);
win2.add(tfpass);
win2.add(confirmbtn);


//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  

// open tab group
tabGroup.open();

