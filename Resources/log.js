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

function listapi(){
 c = Titanium.Network.createHTTPClient();
	c.setTimeout(10000);
	c.onload = function()
	{
		Ti.API.info('IN ONLOAD ');

		var filename = Titanium.Platform.name == 'android' ? 'test.png' : 'test.pdf';
		var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'inboxentries.xml');
		if (Titanium.Platform.name == 'android') {
			f.write(this.responseData);
		}else {
			Ti.API.info('responseData: '+this.responseText);
			Ti.API.info('responseData: '+f.read());
			label3.setText(f.read());
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
		Ti.API.info('Open called');
		c.open('POST','https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/knut.funkel&password=nktu.ufknle&action=api_help');
		c.file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'inboxentries.xml');
	}

	// send the data
	Ti.API.info('Send called');
	c.send();
}

listapi();

win3.add(label3);

