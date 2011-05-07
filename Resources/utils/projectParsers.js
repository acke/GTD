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
