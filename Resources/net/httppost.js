 
 function postHTTPClient (poststring, fileName, sendParams){
 	c = Titanium.Network.createHTTPClient();
	c.setTimeout(10000);
	c.onload = function(filename)
	{
		Ti.API.info('IN ONLOAD ');

		var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, fileName);
		
		if (Titanium.Platform.name == 'android') {
			f.write(this.responseData);
		}else {
			Ti.API.info('responseData: '+f.read());
		}
		var retString = f.read();
		Titanium.App.Properties.setString("retval",retString);
		
		Ti.API.fireEvent('updateLogLabel', {text:retString});
		if (filename == 'api.xml'){
			Ti.API.fireEvent('udateAPILabel', {text:retString});
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
		c.open('POST', poststring);
	} else {
		c.open('POST', poststring);
		c.file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,fileName);
	}
	
	// send the data
	c.send(sendParams);
	
 }