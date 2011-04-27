(function(){

    var gtd = {};
    gtd.ui = {};
    gtd.ui.inbox = {};
    
    var inboxData = [];
    var user = Titanium.App.Properties.getString("user");
    var pass = Titanium.App.Properties.getString("pass");
    var filename = 'inbox.xml';
    
    Ti.include('../net/httpClient.js', 
			'../Editors/new_task_editor.js'
			);
    
    var xhr = createHTTPClient();
    
	createNewTableView = function(tableData, doctitle){
        var tableview = Titanium.UI.createTableView();
        
        tableview.addEventListener('click', function(e){
            Titanium.API.info("tableview event triggered: " + e.rowData.title);
            var w = createTaskEditor(e.rowData);

            w.open({
                modal: true
            });
        });
        
        return tableview;
    };
	
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
            
                inboxItems.push({
                    //add these attributes for the benefit of a table view
                    title: title,
                    id: id,
                    hasChild: true,
                    //custom data attribute to pass to detail page
                    content: title,
					isTask: false
                });
                
            }
            
            
            var tableView = createNewTableView();
            tableView.setData(inboxItems);
            Titanium.UI.currentWindow.add(tableView);
            
        } 
        catch (E) {
            alert(E);
        }
        
        var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
        
        Ti.API.fireEvent('updateLogLabel', {text: f.read()});
    };
    
    
    xhr.file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,filename);
	
    xhr.open("POST", 'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/' + user + '&password=' + pass + '&action=inboxentries');
	
    xhr.send();
})();




