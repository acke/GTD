(function(){

    var user = Titanium.App.Properties.getString("user");
    var pass = Titanium.App.Properties.getString("pass");
    var filename = "checklists.xml";
    
    getChecklists = function(_cb){
        Ti.API.info('reading checklists from service');
        var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
        xhr = Ti.Network.createHTTPClient();
        
        xhr.onload = function(){
            try {
                var checklists = [];
				var childData = "";
                var doc = this.responseXML.documentElement;
                
                var items = doc.getElementsByTagName("checklist");
                
                if (items) {
                    for (var c = 0; c < items.length; c++) {
                        var item = items.item(c);
                        
                        var children = item.childNodes;
                        for (var d = 0; d < children.length; d++) {
                            var child = children.item(d);
							childData += '- ' +parseChecklistEntry(child)+"\n";
                        }
						
						Titanium.API.info(childData);
                        checklists = parseChecklists(checklists, item, childData);
						childData = '';
                    }
                    _cb(checklists);
                }
                
            } 
            catch (E) {
                alert(E);
            }
            f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
            Titanium.API.info(f.read());
            
            Ti.API.fireEvent('updateLogLabel', {
                text: f.read()
            });
        };
        
        xhr.ondatastream = function(e){
            Ti.API.info('ONDATASTREAM1 - PROGRESS: ' + e.progress);
        };
        xhr.onerror = function(e){
            Ti.API.info('XHR Error ' + e.error);
        };
        
        xhr.file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
        xhr.open("POST", 'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/' + user + '&password=' + pass + "&action=checklists");
        
        xhr.send();
        
    };
})();
