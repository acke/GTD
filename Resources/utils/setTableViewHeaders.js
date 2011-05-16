function setQuadrantHeaders(tasks){
    var headerSet = false;
    var currentQuadrant;
    var newArray = [];
    
    function setQuadHeader(element, index, array){
        //It should not be === here, since the object is not the same, but the value is.
        
        if (headerSet == false && element.quadrantString != currentQuadrant) {
            headerSet = true;
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
                hasChild: true
            });
        }
        else {
            headerSet = false;
            newArray.push({
                title: element.title,
                id: element.id,
                quadrant: element.quadrant,
                quadrantString: element.quadrantString,
                context: element.context,
                notes: element.notes,
                projectID: element.projectID, //Not implemented in the API yet.
                age: element.age,
                hasChild: true
            });
            
        };
        currentQuadrant = element.quadrantString;
    };
    
    
    tasks.forEach(setQuadHeader);
    
    
    return newArray;
};

function setContextHeaders(tasks){
    var headerSet = false;
    var currentItem;
    var newArray = [];
    
    function setContextHeader(element, index, array){
        //It should not be === here, since the object is not the same, but the value is.
        
        
        if (headerSet == false && element.context !== currentItem) {
            headerSet = true;
            newArray.push({
                title: element.title,
                header: element.age,
                id: element.id,
                quadrant: element.quadrant,
                quadrantString: element.quadrantString,
                context: element.context,
                notes: element.notes,
                projectID: element.projectID,
                age: element.age,
                hasChild: true
            });
        }
        else {
            headerSet = false;
            newArray.push({
                title: element.title,
                id: element.id,
                quadrant: element.quadrant,
                quadrantString: element.quadrantString,
                context: element.context,
                notes: element.notes,
                projectID: element.projectID,
                age: element.age,
                hasChild: true
            });
            
        };
        currentItem = element.context;
    };
    
    tasks.forEach(setContextHeader);
    
    return newArray;
};

function setAgeHeaders(tasks){
    var headerSet = false;
    var currentItem;
    var newArray = [];
    
    function setAgeHeader(element, index, array){
        //It should not be === here, since the object is not the same, but the value is.
        
        
        if (headerSet == false && element.age !== currentItem) {
            headerSet = true;
            newArray.push({
                title: element.title,
                header: element.age,
                id: element.id,
                quadrant: element.quadrant,
                quadrantString: element.quadrantString,
                context: element.context,
                notes: element.notes,
                projectID: element.projectID,
                age: element.age,
                hasChild: true
            });
        }
        else {
            headerSet = false;
            newArray.push({
                title: element.title,
                id: element.id,
                quadrant: element.quadrant,
                quadrantString: element.quadrantString,
                context: element.context,
                notes: element.notes,
                projectID: element.projectID,
                age: element.age,
                hasChild: true
            });
            
        };
        currentItem = element.age;
    };
    
    tasks.forEach(setAgeHeader);
    
    return newArray;
};



function setProjectHeaders(tasks){
    var headerSet = false;
    var currentProject;
    var newArray = [];
    
    function setProjHeader(element, index, array){
        //It should not be === here, since the object is not the same, but the value is.
        
        Titanium.API.info(headerSet + ' ' + element.projectID + ' ' + currentProject);
        
        if (headerSet == false && element.projectID !== currentProject) {
            headerSet = true;
            newArray.push({
                title: element.title,
                header: element.projectID,
                id: element.id,
                quadrant: element.quadrant,
                quadrantString: element.quadrantString,
                context: element.context,
                notes: element.notes,
                projectID: element.projectID,
                age: element.age,
                hasChild: true
            });
        }
        else {
            headerSet = false;
            newArray.push({
                title: element.title,
                id: element.id,
                quadrant: element.quadrant,
                quadrantString: element.quadrantString,
                context: element.context,
                notes: element.notes,
                projectID: element.projectID,
                age: element.age,
                hasChild: true
            });
            
        };
        currentProject = element.projectID;
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
        case 'Tasks by context':
            tasks = setContextHeaders(tasks);
            break;
        case 'Tasks by projects':
            //      tasks = setProjectHeaders(tasks);
            break;
        default:
            tasks = setQuadrantHeaders(tasks);
    }
    return tasks;
};
