(function(){

    var user = Titanium.App.Properties.getString("user");
    var pass = Titanium.App.Properties.getString("pass");
    var filename = "checklists.xml";
    
    getChecklists = function(_cb){
        Ti.API.info('reading checklists from service');
        xhr = Ti.Network.createHTTPClient();
        
        xhr.onload = function(){
            try {
                var checklists = [];
                var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
                var doc = this.responseXML.documentElement;
                
                var items = doc.getElementsByTagName("checklist");
                
                if (items) {
                    for (var c = 0; c < items.length; c++) {
                        var item = items.item(c);
                        checklists = parseChecklists(checklists, item);
                    }
                    _cb(checklists);
                }
                
                Ti.API.fireEvent('checklistsReadFromService', {
                    checklistsList: checklists
                });
            } 
            catch (E) {
                alert(E);
            }
            var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
            
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
