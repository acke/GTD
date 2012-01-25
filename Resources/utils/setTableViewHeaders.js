Ti.include('../database/projectsDB.js');

function setQuadrantHeaders(tasks){
    var previousQuadrant;
    var newArray = [];
    
    function setQuadHeader(element, index, array){
        
		//Titanium.API.info(element.quadrantString + ' ' + previousQuadrant);
		
        //It should not be === here, since the object is not the same, but the value is.
        if (element.quadrantString != previousQuadrant) {
            newArray.push({
                title: element.title,
                header: element.quadrantString,
                id: element.id,
                quadrant: element.quadrant,
                quadrantString: element.quadrantString,
                context: element.context,
                notes: element.notes,
                projectID: element.projectID, //Not implemented in the API yet.
                age: element.age,
				dueon: element.dueon,
                hasChild: true
            });
        }
        else {
            newArray.push({
                title: element.title,
                id: element.id,
                quadrant: element.quadrant,
                quadrantString: element.quadrantString,
                context: element.context,
                notes: element.notes,
                projectID: element.projectID, //Not implemented in the API yet.
                age: element.age,
				dueon: element.dueon,
                hasChild: true
            });
            
        };
        previousQuadrant = element.quadrantString;
    };
    
    
    tasks.forEach(setQuadHeader);
    
    
    return newArray;
};

function setContextHeaders(tasks){
	var previousItem = "";
    var newArray = [];
    
    function setContextHeader(element, index, array){

        //It should not be === here, since the object is not the same, but the value is.
        if (element.context !== previousItem) {
            newArray.push({
                title: element.title,
                header: element.context,
                id: element.id,
                quadrant: element.quadrant,
                quadrantString: element.quadrantString,
                context: element.context,
                notes: element.notes,
                projectID: element.projectID,
                age: element.age,
				dueon: element.dueon,
                hasChild: true
            });
        }
        else {
            newArray.push({
                title: element.title,
                id: element.id,
                quadrant: element.quadrant,
                quadrantString: element.quadrantString,
                context: element.context,
                notes: element.notes,
                projectID: element.projectID,
                age: element.age,
				dueon: element.dueon,
                hasChild: true
            });
            
        };
        previousItem = element.context;
    };
    
    tasks.forEach(setContextHeader);
    
    return newArray;
};

function setAgeHeaders(tasks){
    var newArray = [];
	var previousItem = "";
    
    function setAgeHeader(element, index, array){
        //It should not be === here, since the object is not the same, but the value is.
        if (element.age !== previousItem) {
            newArray.push({
                title: element.title,
                header: element.age + " days old",
                id: element.id,
                quadrant: element.quadrant,
                quadrantString: element.quadrantString,
                context: element.context,
                notes: element.notes,
                projectID: element.projectID,
                age: element.age,
				dueon: element.dueon,
                hasChild: true
            });
        }
        else {
            newArray.push({
                title: element.title,
                id: element.id,
                quadrant: element.quadrant,
                quadrantString: element.quadrantString,
                context: element.context,
                notes: element.notes,
                projectID: element.projectID,
                age: element.age,
				dueon: element.dueon,
                hasChild: true
            });
            
        };
        previousItem = element.age;
    };
    
    tasks.forEach(setAgeHeader);
    
    return newArray;
};

function setDueonHeaders(tasks){
    var newArray = [];
	var previousItem = "";
    
    function setDueonHeader(element, index, array){
        //It should not be === here, since the object is not the same, but the value is.
        if (element.dueon !== previousItem) {
            newArray.push({
                title: element.title,
                header: "Due on " + element.dueon,
                id: element.id,
                quadrant: element.quadrant,
                quadrantString: element.quadrantString,
                context: element.context,
                notes: element.notes,
                projectID: element.projectID,
                age: element.age,
				dueon: element.dueon,
                hasChild: true
            });
        }
        else {
            newArray.push({
                title: element.title,
                id: element.id,
                quadrant: element.quadrant,
                quadrantString: element.quadrantString,
                context: element.context,
                notes: element.notes,
                projectID: element.projectID,
                age: element.age,
				dueon: element.dueon,
                hasChild: true
            });
            
        };
        previousItem = element.dueon;
    };
    
    tasks.forEach(setDueonHeader);
    
    return newArray;
};


function setProjectHeaders(tasks){
    var previousProject;
    var newArray = [];
	var projects = getTitleAndIDFromProjectsDB();
    
    function setProjHeader(element, index, array){
    
        Titanium.API.info(element.projectID + ' ' + previousProject);
        
        //It should not be === here, since the object is not the same, but the value is.
        if (element.projectID !== previousProject && previousProject != 0) {
            
            newArray.push({
                title: element.title,
                header: (element.projectID) ? getProjectString(projects, element.projectID) : 'Not in project',
                id: element.id,
                quadrant: element.quadrant,
                quadrantString: element.quadrantString,
                context: element.context,
                notes: element.notes,
                projectID: element.projectID,
                age: element.age,
				dueon: element.dueon,
                hasChild: true
            });
        }
        else {
            
            newArray.push({
                title: element.title,
                id: element.id,
                quadrant: element.quadrant,
                quadrantString: element.quadrantString,
                context: element.context,
                notes: element.notes,
                projectID: element.projectID,
                age: element.age,
				dueon: element.dueon,
                hasChild: true
            });
            
        };
        previousProject = element.projectID;
    };
    
    tasks.forEach(setProjHeader);
    
    return newArray;
};

function setTableViewHeaders(tasks, sorterType){
    switch (sorterType) {
        case 'Tasks by prio':
            tasks = setQuadrantHeaders(tasks);
            break;
        case 'Tasks by age':
            tasks = setAgeHeaders(tasks);
            break;
	case 'Tasks by due date':
            tasks = setDueonHeaders(tasks);
            break;
        case 'Tasks by context':
            tasks = setContextHeaders(tasks);
            break;
        case 'Tasks by projects':
            tasks = setProjectHeaders(tasks);
            break;
        default:
            tasks = setQuadrantHeaders(tasks);
    }
    return tasks;
};
