(function(){

    var inboxData = [];
    var inboxWin = Titanium.UI.currentWindow;
	var tableView;
    
    Ti.include('../Editors/new_task_editor.js', '../utils/inboxParsers.js', '../net/getInboxEntries.js');
    
    var actInd = Titanium.UI.createActivityIndicator({
        bottom: 10,
        height: 50,
        width: 10,
        top: 20,
        style: Titanium.UI.iPhone.ActivityIndicatorStyle.BIG
    });
    
    createNewTableView = function(){
        var tableView = Titanium.UI.createTableView();
        
        tableView.addEventListener('click', function(e){
            Titanium.API.info("tableview event triggered: " + e.rowData.title);
            var w = createTaskEditor(e.rowData);
            
            w.open({
                modal: true
            });
        });
        
        return tableView;
    };
    
    updateInboxView = function(inboxData){
        tableView.setData(inboxData);
    };
    
    function endReloading(){
        tableView = createNewTableView();
        
        inboxWin.add(tableView);
        
        updateInboxView(inboxEntries);
        actInd.hide();
        
    }
    
    showInbox = function(){
        inboxWin.add(actInd);
        actInd.show();
        
        getInboxEntries(function(data){
            inboxEntries = data;
        });

        setTimeout(endReloading, 500);
        
    };
    
    Titanium.API.addEventListener('inboxItemRemoved', function(_e){
        showInbox();
    });
    
    Titanium.API.addEventListener('inboxUpdated', function(_e){
        showInbox();
    });
    
    showInbox();
    
})();




