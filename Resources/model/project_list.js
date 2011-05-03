
//var projects = gtd.model.projects.newProject(1192, "Fixa bilder ", "active", "", "", 2);
//projects = gtd.model.projects.newProject(1193, "Stuva macaroner ", "active", "", "", 2);

(function(){
    var projects = [];
	

	loadProjectsIntoList = function(_projects){
        projects = _projects;
		
        return this.projects;
    };
	
	getProjectList = function(){
        return projects;
    };
	
	
    newProject = function(id, name, state, goal, notes, quadrant){
        var newProject = new Project(id, name, state, goal, notes, quadrant);
        projects.push(newProject);
        
        return projects;
    };
    
//var project = gtd.model.projects.getProjectById(1193);
//Titanium.API.info(project[0].name);
	
    getProjectById = function(id){
        var project = [];
		Ti.API.info("Calling getProjectById "+id);
        function getProjectFromArray(element, index, array){
			//It should not be === here, since the object is not the same, but the value is.
            if (element.id == id) {
                project.push(element);
                Ti.API.info("Element " + index + " contains the value " + element.id + "<br />");
            };
         };
        
        projects.forEach(getProjectFromArray);
		
        return project;
    };
	
//Titanium.API.info(projects);
//gtd.model.projects.deleteProjectById(1193);
//Titanium.API.info(projects);
	
	deleteProjectById = function(id){
        function getProjectFromArray(element, index, array){
            if (element.id === id) {
				projects.splice (index,index);
                Ti.API.info("Element " + index + " contains the value " + element.id + " and will be deleted<br />");
            };
         };
        
        projects.forEach(getProjectFromArray);
		
        return projects;
    };
    
})();
