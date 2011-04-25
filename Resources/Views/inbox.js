(function(){

    var gtd = {};
    gtd.ui = {};
    gtd.ui.inbox = {};
    
    var data = [];
    var inboxData = [];
    var user = Titanium.App.Properties.getString("user");
    var pass = Titanium.App.Properties.getString("pass");
    var filename = 'inbox.xml';
    
    Ti.include('../net/httpClient.js', '../utils/createTableView.js');
    
    var xhr = createHTTPClient();
    
    xhr.onload = function(){
		var inboxItems = [];
        try {
            var doc = this.responseXML.documentElement;
            var items = doc.getElementsByTagName("inbox_entry");
            
            var x = 0;
            var doctitle = doc.evaluate("//result/inbox_entry/content/text()").item(0).nodeValue;
            for (var c = 0; c < items.length; c++) {
                var item = items.item(c);
                var title = item.getElementsByTagName("content").item(0).text;
				var id = item.getElementsByTagName("id").item(0).text;
                var row = Ti.UI.createTableViewRow({
                    height: 50
                });
                var label = Ti.UI.createLabel({
                    text: title,
                    left: 72,
                    top: 5,
                    bottom: 5,
                    right: 5
                });
                row.add(label);
               
			    inboxItems.push({
                    //add these attributes for the benefit of a table view
                    title: title,
                    id: id, //custom data attribute to pass to detail page
					hasChild:true,
                    content: title
                });
				
                //data[x++] = row;
                //row.url = item.getElementsByTagName("content").item(0).text;
            }
            
            
            var tableView = createNewTableView();
            
            tableView.setData(inboxItems);
            //            var win = Titanium.UI.createWindow({
            //                title: 'Inbox'
            //                activity: {
            //                    onCreateOptionsMenu: function(e){
            //                        var menu = e.menu;
            //                        var m1 = menu.add({
            //                            title: L('add')
            //                        });
            //                        m1.addEventListener('click', function(e){
            //                            //open in tab group to get free title bar (android)
            //                            var tab = (_captured) ? bh.capturedTab : bh.fugitivesTab;
            //                            tab.open(bh.ui.createAddWindow());
            //                        });
            //                    }
            //                }
            //            });
            //            win.add(tableView);
            
            Titanium.UI.currentWindow.add(tableView);
            
        } 
        catch (E) {
            alert(E);
        }
        
        var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
        
        Ti.API.fireEvent('updateLogLabel', {
            text: f.read()
        });
    };
    
    
    xhr.open("POST", 'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/' + user + '&password=' + pass + '&action=inboxentries');
    
    xhr.send();
})();




