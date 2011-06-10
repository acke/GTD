(function(){

    Ti.include('../net/getTasks.js', '../utils/taskParsers.js', '../Editors/task_editor.js', '../utils/quadrant.js', '../utils/taskSorter.js', '../utils/setTableViewHeaders.js', '../database/tasksDB.js', '../uicomponents/createTablePullHeader.js', '../Buttons/task_filter_action.js');
    
    // create table view data object
    var data = [];
    var win = Titanium.UI.currentWindow;
    var tableView;
    var pulling = false;
    var reloading = false;
    var arrow = getArrow();
    var actInd = getActIndicator();
    var statusLabel = getStatusLabel();
    var lastUpdatedLabel = getLastUpdatedLabel();
    var tableHeader = getTablePullHeader();
    var actIndStart = Titanium.UI.createActivityIndicator({
        bottom: 10,
        height: 50,
        width: 10,
        top: 20,
        style: Titanium.UI.iPhone.ActivityIndicatorStyle.BIG
    });
    
    updateTasksTablevView = function(tasks){
        tableView.setData(tasks);
    };
    
    function prepTasks(){
        tasks = getAllFromTasksDB();
        tasks = sortTaskArray(tasks, win.title);
        tasks = setTableViewHeaders(tasks, win.title);
        tasks = setupTaskFilter(win, tasks);
        
        return tasks;
    };
    
    
    function beginReloading(){
        // just mock out the reload
        setTimeout(endReloading, 2000);
        initTasksDB();
        getTasks(function(task){
            updateTasksDB(task);
        });
    };
    
    function endReloading(){
        var tasks = prepTasks();
        updateTasksTablevView(tasks);
        // when you're done, just reset
        tableView.setContentInsets({
            top: 0
        }, {
            animated: true
        });
        reloading = false;
        lastUpdatedLabel.text = "Last Updated: " + formatDate();
        statusLabel.text = "Pull down to refresh...";
        actInd.hide();
        arrow.show();
    };
    
    createNewTableView = function(){
        tableView = Titanium.UI.createTableView();
        
        tableHeader.add(arrow);
        tableHeader.add(statusLabel);
        tableHeader.add(lastUpdatedLabel);
        tableHeader.add(actInd);
        tableView.headerPullView = tableHeader;
        
        tableView.addEventListener('scroll', function(e){
            var offset = e.contentOffset.y;
            var t = Ti.UI.create2DMatrix();
            
            if (offset <= -65.0 && !pulling) {
                t = t.rotate(-180);
                pulling = true;
                arrow.animate({
                    transform: t,
                    duration: 180
                });
                statusLabel.text = "Release to refresh...";
            }
            else 
                if (pulling && offset > -65.0 && offset < 0) {
                    pulling = false;
                    arrow.animate({
                        transform: t,
                        duration: 180
                    });
                    statusLabel.text = "Pull down to refresh...";
                }
        });
        
        tableView.addEventListener('scrollEnd', function(e){
            if (pulling && !reloading && e.contentOffset.y <= -65.0) {
                reloading = true;
                pulling = false;
                arrow.hide();
                actInd.show();
                statusLabel.text = "Reloading...";
                tableView.setContentInsets({
                    top: 60
                }, {
                    animated: true
                });
                arrow.transform = Ti.UI.create2DMatrix();
                beginReloading();
            }
        });
        
        
        tableView.addEventListener('click', function(e){
            Titanium.API.info("tableView event triggered: " + e.rowData.title);
            var w = createTaskEditor(e.rowData);
            
            Titanium.UI.currentTab.open(w, {
                animated: true
            });
            
        });
        
        return tableView;
    };
    
    
    
    
    showTasks = function(){
        var tableView = createNewTableView();
        var tasks = prepTasks();
        actIndStart.hide();
        win.add(tableView);
        updateTasksTablevView(tasks);
        
        Titanium.API.addEventListener('taskItemUpdated', function(_e){
        
            Ti.API.info("taskItemUpdated occured");
            
            setTimeOut();
        });
        
        Titanium.API.addEventListener('taskFilterApplied', function(_e){
        
            Ti.API.info("taskFilterApplied occured");
            tasks = getAllItemsMatchingProjectFromTasksDB(_e.projectSelectedValue);
            updateTasksTablevView(tasks);
        });
    };
    
    setTimeOut = function(){
        win.add(actIndStart);
        actIndStart.show();
        
        initTasksDB();
        getTasks(function(task){
            updateTasksDB(task);
        });
        
        setTimeout(showTasks, 1000);
    };
    
    setTimeOut();
    
})();







