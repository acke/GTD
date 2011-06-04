(function(){

    var user = Titanium.App.Properties.getString("user");
    var pass = Titanium.App.Properties.getString("pass");
    var filename = "inbox.xml";
    
    getInboxEntries = function(_cb){
        Ti.API.info('reading inbox from service');
        xhr = Ti.Network.createHTTPClient();
        
        xhr.onload = function(){
            try {
                var inboxItems = [];
                var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'inbox.xml');
                var doc = this.responseXML.documentElement;
                
                var items = doc.getElementsByTagName("inbox_entry");
                if (items) {
                
                    for (var c = 0; c < items.length; c++) {
                        var item = items.item(c);
                        inboxItems = parseInboxEntries(inboxItems, item);
                    }
                    _cb(inboxItems);
                }
                else {
                    alert("Inbox empty");
                };
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
        xhr.open("POST", 'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/' + user + '&password=' + pass + '&action=inboxentries');
        
        xhr.send();
        
    };
})();
