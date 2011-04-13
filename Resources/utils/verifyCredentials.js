(function (){
	gtd.utils = {};
	
	gtd.utils.verify_credentialsToLabel = function (loginStatus){
		postCredentials (loginStatus);
	};
	
	gtd.utils.verify_credentials = function (){
		var verified = null;
		var result = null;
		var veriedCreds = "Login Not OK";
		
		verified = Titanium.App.Properties.getString("retval");
		
		result = verified.indexOf("result status=\"200\"");
		
		if (result !== -1) {
			veriedCreds = "Login OK";
		}
		
		return veriedCreds;
	};
	
	//Function only for use in by package public functions.
	postCredentials = function (loginStatus){
		var poststring = 'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/'+tfuser.value+'&password='+tfpass.value+'&action=verify_credentials';
		
		var fileName = 'verify_credentials.xml';
		
		Titanium.API.info("calling post creds");
	
		Ti.include('httppost.js');
	
		postHTTPClient (poststring, fileName, loginStatus);
		
	};
})();