(function(){

    Ti.include('../utils/projectParsers.js', '../Editors/project_editor.js', '../database/projectsDB.js', '../net/getProjects.js');
    
    var projects = [];
    var user = Titanium.App.Properties.getString("user");
    var pass = Titanium.App.Properties.getString("pass");
    
    createNewTableView = function(projects){
        var tableview = Titanium.UI.createTableView();
        tableview.setData(projects);
		
        tableview.addEventListener('click', function(e){
            Titanium.API.info("tableview event triggered: " + e.rowData.title);
            var w = createProjectEditor(e.rowData);
            
            w.open({
                modal: true
            });
        });
        
        return tableview;
    };
    
    
    showProjects = function(){
        var projects = getAllFromProjectsDB();
		
        var tableView = createNewTableView(projects);
		
		Titanium.UI.currentWindow.add(tableView);
        
        updateProjectView = function(projects){
            tableView.setData(projects);
        };
        updateProjectView(projects);
    };
    
    showProjects();
    
})();
