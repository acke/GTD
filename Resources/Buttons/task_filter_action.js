
function setupTaskFilter(win, tasks){

    var projects = getTitleAndIDFromProjectsDB();
    var projectTitleList = ['Cancel'];
    var projectSelectedValue = 0;
    
    var dialog = Titanium.UI.createOptionDialog({
        title: 'Select a project',
        options: getProjectTitlesFromArray(projects, projectTitleList),
        cancel: 0
    });
    dialog.addEventListener('click', function(e){
        if (e.index > 0) {
            Titanium.API.info("Selected project id is: " + projects[e.index].project_id + " title is: " + projects[e.index].title);
            projectSelectedValue = projects[e.index].project_id;
            
        } else {
			projectSelectedValue = 0;
		}
            //Dispatch a message to let others know filter has been applied
            Ti.API.fireEvent("taskFilterApplied", {
                projectSelectedValue: projectSelectedValue
            });
    });
    
    //
    // NAVBAR
    // 
    var bb3 = Titanium.UI.createButtonBar({
        labels: ['Filter']
    });
    
    bb3.addEventListener('click', function(e){
        Titanium.API.info(e.index);
        if (e.index == 0) {
            dialog.show();
        }
        else 
            if (e.index == 1) {
                Titanium.UI.createAlertDialog({
                    title: 'Filter',
                    message: 'Not implemented yet ' + e.index
                }).show();
            }
    });
    
    switch (win.title) {
        case 'Tasks by context':
            //tasks = sortTaskArrayOnContext(tasks);
            break;
        case 'Tasks by due date':
            //            tasks = sortTaskArrayOnDueDate(tasks);
            break;
        case 'Tasks by age':
            //tasks = sortTaskArrayOnAge(tasks);
            break;
        case 'Tasks':
            //tasks = sortTaskArrayOnQuadrant(tasks);
            break;
        case 'Tasks by projects':
            win.setRightNavButton(bb3);
            break;
        default:
        //tasks = sortTaskArrayOnQuadrant(tasks);
    }
    return tasks;
};
