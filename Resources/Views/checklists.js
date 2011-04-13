
// create table view data object
var data = [];
var user = Titanium.App.Properties.getString("user");
var pass = Titanium.App.Properties.getString("pass");

//These rows are for log/debug purpouses 
//TODO fix so that result is added to log page.
var poststring = 'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/'+user+'&password='+pass+'&action=checklists';
var fileName = 'checklists.xml';

Ti.include('../httppost.js');

var t = postHTTPClient (poststring, fileName);

//This is where the checklist view is populated

var xhr = Ti.Network.createHTTPClient();

xhr.open("POST",'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/'+user+'&password='+pass+'&action=checklists');
xhr.onload = function()
{
	try
	{
		var doc = this.responseXML.documentElement;
		
		var items = doc.getElementsByTagName("checklist");
		
		var x = 0;
		var doctitle;
		Ti.API.info("node name: "+doctitle);
		
		for (var c=0;c<items.length;c++)
		{
			var item = items.item(c);				
			var content = item.getAttribute("name");				
			var title = content;
			doctitle = content;
			var row = Ti.UI.createTableViewRow({height:50});
			var label = Ti.UI.createLabel({
				text:content,
				left:72,
				top:5,
				bottom:5,
				right:5				
			});
			row.add(label);
			var img;

			data[x++] = row;
			row.url = item.getAttribute("name");
			
		}
		
		Ti.include('../utils/createTableView.js');
		createNewTableView(data, doctitle);
		
		
	}
	catch(E)
	{
		alert(E);
	}
};
xhr.send();




