(function(){

    var user = Titanium.App.Properties.getString("user");
    var pass = Titanium.App.Properties.getString("pass");
    
    getTasks = function(_cb){
        Ti.API.info('reading tasks from service');
        xhr = Ti.Network.createHTTPClient();
        
        xhr.onload = function(){
            var tasks = [];
            try {
                var doc = this.responseXML.documentElement;
                var items = doc.getElementsByTagName("task");
                
                var x = 0;
                var doctitle = doc.evaluate("//result/tasks/task/name/text()").item(0).nodeValue;
                for (var c = 0; c < items.length; c++) {
                    var item = items.item(c);
                    parseTasks(tasks, item);
                    _cb(tasks[c]);
                }

            } 
            catch (E) {
                alert(E);
            }
        };
		
		xhr.open("POST", 'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/' + user + '&password=' + pass + '&action=tasks');
		
        xhr.send();
        
    };
})();
