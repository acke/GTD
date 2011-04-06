(function (){

	Ti.include('../net/httpClient.js');
	
	var user = Titanium.App.Properties.getString("user");
	var pass = Titanium.App.Properties.getString("pass");
	
	var xhr = createHTTPClient();

	xhr.open ("POST",'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/'+user+'&password='+pass+'&action=list_active_projects');
	
	xhr.send();
	
})();