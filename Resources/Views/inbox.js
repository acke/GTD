(function(){

    var gtd = {};
    gtd.ui = {};
    gtd.ui.inbox = {};
    
    var inboxData = [];
    var user = Titanium.App.Properties.getString("user");
    var pass = Titanium.App.Properties.getString("pass");
    var filename = 'inbox.xml';
    
    Ti.include('../Editors/new_task_editor.js');
    
    var xhr = Ti.Network.createHTTPClient();
    
    gtd.ui.inbox.createNewTableView = function(tableData){
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
            
            var tableView = gtd.ui.inbox.createNewTableView();
            
            updateInboxView = function(data){
                tableView.setData(data);
            };
            
            updateInboxView(inboxItems);
            Titanium.UI.currentWindow.add(tableView);
            
            Titanium.API.addEventListener('inboxItemRemoved', function(_e){
	            function removeItem(element, index, array){
	                if (element.id == _e.id) {
	                    inboxItems.splice(index, index);
	                    Ti.API.info("Element " + index + " contains the value " + element.id + " and will be deleted with match to: "+_e.id);
	                };
	            };
                
                Ti.API.info("inboxItemRemoved occured");
                inboxItems.forEach(removeItem);
                
                updateInboxView(inboxItems);
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
    
    
    xhr.file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
    
    xhr.open("POST", 'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/' + user + '&password=' + pass + '&action=inboxentries');
    
    xhr.send();
})();




