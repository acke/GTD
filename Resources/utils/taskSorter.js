
function sortTaskArrayOnQuadrant(data){
    data.sort(function(a, b){
        return a.quadrant - b.quadrant;
    });
    return data;
};

function sortTaskArrayOnContext(data){
    data.sort(function(a, b){
	Ti.API.info(a.context);
 	var nameA=a.context.toLowerCase(), nameB=b.context.toLowerCase()
 	if (nameA < nameB) //sort string ascending
  		return -1 
 	if (nameA > nameB)
  		return 1
 	return 0 //default return value (no sorting)        

	//return a.context - b.context;
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
    
	// Now we will define our date comparison functions. These are callbacks
    // that we will be providing to the array sort method below.
    var date_sort_asc = function(date1, date2){
        // This is a comparison function that will result in dates being sorted in
        // ASCENDING order. As you can see, JavaScript's native comparison operators
        // can be used to compare dates. This was news to me.
        if (date1.dueon > date2.dueon) 
            return 1;
        if (date1.dueon < date2.dueon) 
            return -1;
        return 0;
    };
    
    date_sort_desc = function(date1, date2){
        // This is a comparison function that will result in dates being sorted in
        // DESCENDING order.
        if (date1.dueon > date2.dueon) 
            return -1;
        if (date1.dueon < date2.dueon) 
            return 1;
        return 0;
    };
    
    data.sort(date_sort_desc);

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
        case 'Tasks by due date':
            tasks = sortTaskArrayOnDueDate(tasks);
            break;
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
