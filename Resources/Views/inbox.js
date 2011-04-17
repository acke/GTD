(function (){
	
// create table view data object
	var data = [];
	var user = Titanium.App.Properties.getString("user");
	var pass = Titanium.App.Properties.getString("pass");
	
	Ti.include('../net/httpClient.js');
	
	var xhr = createHTTPClient();
	
	xhr.open("POST",'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/'+user+'&password='+pass+'&action=inboxentries');
	
	xhr.send();
})();




