
// create table view data object
var data = [];
var user = Titanium.App.Properties.getString("user");
var pass = Titanium.App.Properties.getString("pass");

//These rows are for log purpouses
//TODO fix so that result is added to log page.
var poststring = 'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/'+user+'&password='+pass+'&action=tasks';
var fileName = 'tasks.xml';

Ti.include('../httppost.js');

var t = postHTTPClient (poststring, fileName);

//This is where the tasks view is populated

var xhr = Ti.Network.createHTTPClient();

xhr.open("POST",'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/'+user+'&password='+pass+'&action=tasks');

xhr.onload = function()
{
	try
	{
		var doc = this.responseXML.documentElement;
		var items = doc.getElementsByTagName("task");
		
		var x = 0;
		var doctitle = doc.evaluate("//result/tasks/task/name/text()").item(0).nodeValue;
		for (var c=0;c<items.length;c++)
		{
			var item = items.item(c);
			var content = item.getElementsByTagName("name").item(0).text;				
			var title = content;
			var row = Ti.UI.createTableViewRow({height:50});
			var label = Ti.UI.createLabel({
				text:title,
				left:72,
				top:5,
				bottom:5,
				right:5				
			});
			row.add(label);
			var img;

			data[x++] = row;
			row.url = item.getElementsByTagName("name").item(0).text;
		}
		var tableview = Titanium.UI.createTableView({data:data});
		Titanium.UI.currentWindow.add(tableview);
		tableview.addEventListener('click',function(e)
		{
			var w = Ti.UI.createWindow({title:doctitle});
			var wb = Ti.UI.createWebView({url:e.row.url});
			w.add(wb);
			var b = Titanium.UI.createButton({
				title:'Close',
				style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
			});
			w.setLeftNavButton(b);
			b.addEventListener('click',function()
			{
				w.close();
			});
			w.open({modal:true});
		});
	}
	catch(E)
	{
		alert(E);
	}
};
xhr.send();




