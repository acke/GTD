
function sortTaskArrayOnQuadrant(data){
    data.sort(function(a, b){
        return a.quadrant - b.quadrant;
    });
    return data;
};

function sortTaskArrayOnContext(data){
    data.sort(function(a, b){
        return a.context - b.context;
    });
    return data;
};

function sortTaskArrayOnAge(data){
    data.sort(function(a, b){
        return b.age - a.age;
    });
    return data;
};

function sortTaskArrayOnDueDate(data){
    data.sort(function(a, b){
        return b.duedate - a.duedate;
    });
    return data;
};

function sortTaskArrayOnProject(data){
    data.sort(function(a, b){
        return b.projectID - a.projectID;
    });
    return data;
};

function sortTaskArray(tasks, sorterType){
    switch (sorterType) {
        case 'Tasks by context':
            tasks = sortTaskArrayOnContext(tasks);
            break;
        //        case 'Tasks by due date':
        //            tasks = sortTaskArrayOnDueDate(tasks);
        //            break;
        case 'Tasks by age':
            tasks = sortTaskArrayOnAge(tasks);
            break;
        case 'Tasks':
            tasks = sortTaskArrayOnQuadrant(tasks);
            break;
		 case 'Tasks by projects':
            tasks = sortTaskArrayOnProject(tasks);
            break;
        default:
            tasks = sortTaskArrayOnQuadrant(tasks);
    }
    return tasks;
};
