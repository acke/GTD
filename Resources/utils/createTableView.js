(function(){

    Titanium.include('../Editors/task_editor.js');
    
    createNewTableView = function(tableData, doctitle){
        var tableview = Titanium.UI.createTableView();
        
        tableview.addEventListener('click', function(e){
            Titanium.API.info("tableview event triggered: " + e.rowData.title);
            var w = createTaskEditor(e.rowData);
//            
//            var w = Ti.UI.createWindow({
//                title: e.rowData.title
//            });
            
            //            w.add(Titanium.UI.createLabel({
            //                color: '#999',
            //                text: 'Test label',
            //                font: {
            //                    fontSize: 20,
            //                    fontFamily: 'Helvetica Neue'
            //                },
            //                height: 35,
            //                top: 50,
            //                width: 'auto'
            //            }));
            //            
            //            var b = Titanium.UI.createButton({
            //                title: 'Close',
            //                style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN
            //            });
            //            w.setLeftNavButton(b);
            //            b.addEventListener('click', function(){
            //                w.close();
            //            });
            w.open({
                modal: true
            });
        });
        
        return tableview;
    };
    
})();
