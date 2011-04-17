
var win = Titanium.UI.currentWindow;

var scrollView = Titanium.UI.createScrollView({
	contentWidth:'auto',
	contentHeight:'auto',
	top:0,
	showVerticalScrollIndicator:true,
	showHorizontalScrollIndicator:true
});

var view = Ti.UI.createView({
	backgroundColor:'#fff',
	borderRadius:10,
	width:300,
	height:'auto',
	top:10
});

scrollView.add(view);

var label3 = Titanium.UI.createLabel({
	color:'#999',
	text:'API:',
	font:{fontSize:10,fontFamily:'Helvetica Neue'},
	textAlign:'left',
	width:'auto',
	height:'auto'
});

Ti.API.addEventListener ('updateLogLabel', function(_e){
	label3.text = _e.text;
});

function listapi(){
	var user = Titanium.App.Properties.getString("user");
	var pass = Titanium.App.Properties.getString("pass");

	var poststring = 'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/'+user+'&password='+pass+'&action=api_help';
	var fileName = 'api.xml';
	
	Ti.include('../net/httppost.js');
	
	var t = postHTTPClient (poststring, fileName);
}

listapi();

view.add(label3);

win.add(scrollView);


