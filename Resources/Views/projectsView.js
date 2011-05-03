(function(){

    //    createNewTableView = function(tableData){
    //        var tableview = Titanium.UI.createTableView();
    //        
    //        tableview.addEventListener('click', function(e){
    //            Titanium.API.info("tableview event triggered: " + e.rowData.title);
    //        var w = createTaskEditor(e.rowData);
    //            
    //            w.open({
    //                modal: true
    //            });
    //        });
    //        
    //        return tableview;
    //    };
    //    
    //    showProjectsView = function(projects){
    //        var tableView = createNewTableView();
    //        tableView.setData(projects);
    //        Titanium.UI.currentWindow.add(tableView);
    //        
    //        return tableView;
    //    };
    //    
    //    Titanium.API.addEventListener('projectsReadFromService', function(_e){
    //		Titanium.include('model/project_list.js');
    //		Titanium.API.info("projectsReadFromService"+_e.projectList[0]);
    //		var project = null;
    //		project = _e.projectList[0];
    //		Titanium.API.info("projectsR"+project[0].name);
    //        var projects = loadProjectsIntoList(_e.projectList);
    //		Titanium.API.info(projects);
    //		var project = getProjectById(1193);
    //		Titanium.API.info(project[0].name);
    //
    //        showProjectsView(projects);
    //    });
    
    
    var projects = [];
    var user = Titanium.App.Properties.getString("user");
    var pass = Titanium.App.Properties.getString("pass");
    
    xhr = Ti.Network.createHTTPClient();
    
    xhr.onload = function(){
        try {
            var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'projects.xml');
            Ti.API.info('responseData: ' + f.read());
            var doc = this.responseXML.documentElement;
            
            var items = doc.getElementsByTagName("project");
            
            for (var c = 0; c < items.length; c++) {
                var item = items.item(c);
                var title = item.getAttribute("name");
                var id = item.getAttribute("id");
                var state = item.getAttribute("state");
                var goal = item.getAttribute("goal");
                var notes = item.getAttribute("notes");
                var quadrant = item.getAttribute("quadrant");
                
                projects.push({
                    //add these attributes for the benefit of a table view
                    title: title,
                    id: id,
                    hasChild: true,
                    //custom data attribute to pass to detail page
                    state: state,
                    goal: goal,
                    notes: notes,
                    quadrant: quadrant,
                    isTask: false
                });
            }
            
            
            var tableView = Titanium.UI.createTableView();
            tableView.setData(projects);
            Titanium.UI.currentWindow.add(tableView);
        } 
        catch (E) {
            alert(E);
        }
    };
    
    xhr.ondatastream = function(e){
        Ti.API.info('ONDATASTREAM1 - PROGRESS: ' + e.progress);
    };
    xhr.onerror = function(e){
        Ti.API.info('XHR Error ' + e.error);
    };
    
    xhr.open("POST", 'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/' + user + '&password=' + pass + "&action=list_projects");
    //xhr.file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'projects.xml');
    
    xhr.send();
})();
