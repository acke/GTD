(function(){

    //Titanium.include('../Editors/task_editor.js');
    
    createNewTableView = function(tableData, doctitle){
        var tableview = Titanium.UI.createTableView();
        
        tableview.addEventListener('click', function(e){
            Titanium.API.info("tableview event triggered: " + e.rowData.title);
            //var w = createTaskEditor(e.rowData);

            w.open({
                modal: true
            });
        });
        
        return tableview;
    };
    
})();
