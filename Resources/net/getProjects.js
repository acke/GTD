(function(){

    var user = Titanium.App.Properties.getString("user");
    var pass = Titanium.App.Properties.getString("pass");
    var filename = "projects.xml";
    
    getProjects = function(_cb){
        Ti.API.info('reading projects from service');
        xhr = Ti.Network.createHTTPClient();
        
        xhr.onload = function(){
            try {
                var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'projects.xml');
                var doc = this.responseXML.documentElement;
                
                var items = doc.getElementsByTagName("project");
                var projects = [];
                
                for (var c = 0; c < items.length; c++) {
                    var item = items.item(c);
                    projects = parseProject(projects, item);
                    _cb(projects[c]);
                }
                
                Ti.API.fireEvent('projectsReadFromService', {
                    projectList: projects
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
        
        xhr.ondatastream = function(e){
            Ti.API.info('ONDATASTREAM1 - PROGRESS: ' + e.progress);
        };
        xhr.onerror = function(e){
            Ti.API.info('XHR Error ' + e.error);
        };
        
        xhr.file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
        xhr.open("POST", 'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/' + user + '&password=' + pass + "&action=list_projects");
        
        xhr.send();
        
    };
})();
