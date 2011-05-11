function getProjectString(projects, projectID){
    var projectString = "";
    
    function getProjectStringByIDFromArray(element, index, array){
        //It should not be === here, since the object is not the same, but the value is.
        
        if (element.project_id == projectID) {
            projectString = element.title;
        };
            };
    
    projects.forEach(getProjectStringByIDFromArray);
    
    Titanium.API.info("projectString: " + projectString);
    
    return projectString;
};

function getProjectTitlesFromArray(projects, projectTitleList){

    function getProjectFromArray(element, index, array){
        projectTitleList.push(element.title);
    };
    
    projects.forEach(getProjectFromArray);
    
    return projectTitleList;
};

function parseProject(projects, item){
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
			//hasChild: true,
			//custom data attribute to pass to detail page
			state: state,
			goal: goal,
			notes: notes,
			quadrant: quadrant
			});
			
		return projects;
};
