(function(){

    var user = Titanium.App.Properties.getString("user");
    var pass = Titanium.App.Properties.getString("pass");
    var filename = "tasks.xml";
	
    getTasks = function(_cb){
        Ti.API.info('reading tasks from service');
        xhr = Ti.Network.createHTTPClient();
        
        xhr.onload = function(){
            var tasks = [];
            try {
                var doc = this.responseXML.documentElement;
                var items = doc.getElementsByTagName("task");
                if (items) {
					for (var c = 0; c < items.length; c++) {
						var item = items.item(c);
						parseTasks(tasks, item);
						_cb(tasks[c]);
					}
				}
                
            } 
            catch (E) {
                alert(E);
            }
            var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
            
            Ti.API.fireEvent('updateLogLabel', {
                text: f.read()
            });
        };
        
        xhr.file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
        xhr.open("POST", 'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/' + user + '&password=' + pass + '&action=tasks');
        xhr.send();
        
    };
})();
