(function(){
    Titanium.include('../uicomponents/tableViewOptions.js', '../Editors/checklistViewer.js');
    
    createNewTableView = function(tableData){
        var tableview = Titanium.UI.createTableView(getTableViewOptions());
        
        tableview.addEventListener('click', function(e){
            Titanium.API.info("tableview event triggered: " + e.rowData.title);
            var w = createChecklistViewer(e.rowData);
            
            w.open({
                modal: true
            });
        });
        
        return tableview;
    };
    
})();
