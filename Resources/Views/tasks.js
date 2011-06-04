Ti.include('../net/getTasks.js', '../utils/taskParsers.js', '../Editors/task_editor.js', '../utils/quadrant.js', '../utils/taskSorter.js', '../utils/setTableViewHeaders.js', '../database/tasksDB.js', '../uicomponents/createTablePullHeader.js', '../Buttons/task_filter_action.js');

// create table view data object
var data = [];
var win = Titanium.UI.currentWindow;


createNewTableView = function(){
    var tableView = Titanium.UI.createTableView();
    var arrow = getArrow();
    var actInd = getActIndicator();
    var statusLabel = getStatusLabel();
    var lastUpdatedLabel = getLastUpdatedLabel();
    var tableHeader = getTablePullHeader();
    tableHeader.add(arrow);
    tableHeader.add(statusLabel);
    tableHeader.add(lastUpdatedLabel);
    tableHeader.add(actInd);
    tableView.headerPullView = tableHeader;
    
    
    var pulling = false;
    var reloading = false;
    
    function beginReloading(){
        // just mock out the reload
        setTimeout(endReloading, 2000);
        initTasksDB();
        getTasks(function(task){
            updateTasksDB(task);
        });
    }
    
    function endReloading(){
        var tasks = getAllFromTasksDB();
        tasks = sortTaskArray(tasks, win.title);
        tasks = setTableViewHeaders(tasks, win.title);
        
        tableView.setData(tasks);
        
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
    }
    
    tableView.addEventListener('scroll', function(e){
        var offset = e.contentOffset.y;
        if (offset <= -65.0 && !pulling) {
            var t = Ti.UI.create2DMatrix();
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
                var t = Ti.UI.create2DMatrix();
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
        
        w.open({
            modal: true
        });
    });
    
    return tableView;
};

showTasks = function(){
    var tasks = getAllFromTasksDB();
    
    var tableView = createNewTableView();
    
    win.add(tableView);
    
    updateTasksView = function(tasks){
        tasks = sortTaskArray(tasks, win.title);
        tasks = setTableViewHeaders(tasks, win.title);
        tasks = setupTaskFilter(win, tasks);
        tableView.setData(tasks);
    };
    updateTasksView(tasks);
    
    Titanium.API.addEventListener('taskRemoved', function(_e){
        function removeItem(element, index, array){
            if (element.id == _e.id) {
                tasks.splice(index, index);
                Ti.API.info("Element " + index + " contains the value " + element.id + " and will be deleted with match to: " + _e.id);
            };
                    };
        
        Ti.API.info("taskRemoved occured");
        tasks.forEach(removeItem);
        
        updateTasksView(tasks);
    });
    
    Titanium.API.addEventListener('taskItemUpdated', function(_e){
    
        Ti.API.info("taskItemUpdated occured");
        
        updateTasksView(tasks);
    });
    
    Titanium.API.addEventListener('taskFilterApplied', function(_e){
    
        Ti.API.info("taskFilterApplied occured");
        tasks = getAllItemsMatchingProjectFromTasksDB(_e.projectSelectedValue);
        updateTasksView(tasks);
    });
};

showTasks();







