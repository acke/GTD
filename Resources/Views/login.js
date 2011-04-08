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
	value:Titanium.App.Properties.getString("pass"),
	color:'#336699',
	height:35,
	top:150,
	left:10,
	width:300,
	passwordMask:true,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

var loginStatus = Titanium.UI.createLabel({
	color:'#999',
	text:'Status: ',
	font:{fontSize:15,fontFamily:'Helvetica Neue'},
	height:100,
	top: 250,
	textAlign:'left',
	width:'auto'
});

var confirmbtn = Titanium.UI.createButton({
	title:'Test connection',
	height:40,
	width:200,
	top:210

});


confirmbtn.addEventListener('click', function()
{
	Titanium.App.Properties.setString("user",tfuser.value);
	Titanium.App.Properties.setString("pass",tfpass.value);

	Ti.include('utils/verifyCredentials.js');
	
	gtd.utils.verify_credentials(loginStatus);

});



win2.add(label2);
win2.add(tfuser);
win2.add(tfpass);
win2.add(confirmbtn);
win2.add(loginStatus);
