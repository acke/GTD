(function(){

    Ti.include('../uicomponents/tableViewOptions.js', '../utils/projectParsers.js', '../Editors/project_editor.js', '../database/projectsDB.js', '../net/getProjects.js');
    
    var projects = [];
    var projWin = Titanium.UI.currentWindow;
    
    var actInd = Titanium.UI.createActivityIndicator({
        bottom: 10,
        height: 50,
        width: 10,
        top: 20,
        style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
    });
	actInd.font = {fontFamily:'Helvetica Neue', fontSize:15,fontWeight:'bold'};
	actInd.color = 'black';
	actInd.message = 'Loading...';
    
    createNewTableView = function(projects){
        var tableview = Titanium.UI.createTableView(getTableViewOptions());
        tableview.setData(projects);
        
        tableview.addEventListener('click', function(e){
            Titanium.API.info("tableview event triggered: " + e.rowData.title);
            var w = createProjectEditor(e.rowData);
            
            Titanium.UI.currentTab.open(w, {
                animated: true
            });
            
        });
        
        return tableview;
    };
    
    function endReloading(){
        var projects = getAllFromProjectsDB();
        
        var tableView = createNewTableView(projects);
        
        projWin.add(tableView);
        
        updateProjectView = function(projects){
            tableView.setData(projects);
        };
        updateProjectView(projects);
        actInd.hide();
        
    }
    
    showProjects = function(){
        var projects = getTitleAndIDFromProjectsDB();
        projWin.add(actInd);
        actInd.show();
        
        //If projects was not loaded when application was loaded, then try to get the projects from the server now.
        if (projects.size) {
            endReloading();
        }
        else {
            setTimeout(endReloading, 2000);
            initProjectDB();
            
            getProjects(function(project){
                updateProjectsDB(project);
                
            });
        }
        
        
    };
    
    
    
    showProjects();
    
})();
