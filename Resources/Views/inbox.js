(function(){

    var inboxData = [];
    var user = Titanium.App.Properties.getString("user");
    var pass = Titanium.App.Properties.getString("pass");
    var filename = 'inbox.xml';
    
    Ti.include('../Editors/new_task_editor.js', '../utils/inboxParsers.js', '../net/getInboxEntries.js');
    
    var xhr = Ti.Network.createHTTPClient();
    
    createNewTableView = function(tableData){
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
    
    showInbox = function(){
        var tableView = createNewTableView();
		
		 getInboxEntries(function(data){
		 	tableView.setData(data);
		 });
		
        Titanium.UI.currentWindow.add(tableView);
        
        updateInboxView = function(data){
            tableView.setData(data);
        };
        
        Titanium.API.addEventListener('inboxItemRemoved', function(_e){
            function removeItem(element, index, array){
                if (element.id == _e.id) {
                    inboxItems.splice(index, index);
                    Ti.API.info("Element " + index + " contains the value " + element.id + " and will be deleted with match to: " + _e.id);
                };
                            };
            
            Ti.API.info("inboxItemRemoved occured");
            inboxItems.forEach(removeItem);
            
            updateInboxView(inboxItems);
        });
    };
    
    showInbox();
    
})();




