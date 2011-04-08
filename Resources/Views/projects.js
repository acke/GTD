(function (){

	var data = [];
	var user = Titanium.App.Properties.getString("user");
	var pass = Titanium.App.Properties.getString("pass");

	xhr = Ti.Network.createHTTPClient();

	xhr.open ("GET",'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/'+user+'&password='+pass+'&action=list_active_projects');
	xhr.onload = function()
	{
		try
		{
			Ti.API.info(this.responseXML.documentElement);
			var doc = this.responseXML.documentElement;
			
			//TODO: Set proper paths in this code to parse the xml.
			
			var items = doc.getElementsByTagName("projects");
			
			var x = 0;
			var doctitle = doc.evaluate("//result/projects/content/text()").item(0).nodeValue;
			for (var c=0;c<items.length;c++)
			{
				var item = items.item(c);
				var content = item.getElementsByTagName("content").item(0).text;				
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
				row.url = item.getElementsByTagName("content").item(0).text;
			}
			
			Ti.include('../utils/createTableView.js');
			createNewTableView(data);
		}
		catch(E)
		{
			alert(E);
		}
	};
	
	xhr.send();
	
})();