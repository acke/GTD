(function(){

    Ti.include('../Editors/project_editor.js');
    
    var projects = [];
    var user = Titanium.App.Properties.getString("user");
    var pass = Titanium.App.Properties.getString("pass");
    
    createNewTableView = function(tableData){
        var tableview = Titanium.UI.createTableView();
        
        tableview.addEventListener('click', function(e){
            Titanium.API.info("tableview event triggered: " + e.rowData.title);
            var w = createProjectEditor(e.rowData);
            
            w.open({
                modal: true
            });
        });
        
        return tableview;
    };
    
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
            
            var tableView = createNewTableView(projects);
            
            updateProjectView = function(data){
                tableView.setData(data);
            };
            
            Titanium.UI.currentWindow.add(tableView);
			
            updateProjectView(projects);
            
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
    
    xhr.send();
})();
