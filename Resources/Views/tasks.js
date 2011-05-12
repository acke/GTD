
// create table view data object
var data = [];
var user = Titanium.App.Properties.getString("user");
var pass = Titanium.App.Properties.getString("pass");

Ti.include('../net/getTasks.js', '../utils/taskParsers.js', '../Editors/task_editor.js', '../utils/quadrant.js', '../utils/taskSorter.js', '../database/tasksDB.js');

createNewTableView = function(tableData){
    var tableview = Titanium.UI.createTableView();
    
    tableview.addEventListener('click', function(e){
        Titanium.API.info("tableview event triggered: " + e.rowData.title);
        var w = createTaskEditor(e.rowData);
        
        w.open({
            modal: true
        });
    });
    
    return tableview;
};

showTasks = function(){
        var tasks = getAllFromTasksDB();
		tasks = sortTaskArray(tasks);
		
        var tableView = createNewTableView(tasks);
		
		Titanium.UI.currentWindow.add(tableView);
        
        updateProjectView = function(tasks){
            tableView.setData(tasks);
        };
        updateProjectView(tasks);
		
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
    };
    
    showTasks();


//xhr.open("POST", 'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/' + user + '&password=' + pass + '&action=tasks');
//
//xhr.onload = function(){
//    var tasks = [];
//    try {
//        var doc = this.responseXML.documentElement;
//        var items = doc.getElementsByTagName("task");
//        
//        var x = 0;
//        var doctitle = doc.evaluate("//result/tasks/task/name/text()").item(0).nodeValue;
//        for (var c = 0; c < items.length; c++) {
//            var item = items.item(c);
//            parseTasks(tasks, item);
//            
//        }
//        
//        
//        tasks = sortTaskArray(tasks);
//        var tableView = createNewTableView();
//        
//        updateTasksView = function(data){
//            tableView.setData(data);
//        };
//        
//        updateTasksView(tasks);
//        Titanium.UI.currentWindow.add(tableView);
//        
//        Titanium.API.addEventListener('taskRemoved', function(_e){
//            function removeItem(element, index, array){
//                if (element.id == _e.id) {
//                    tasks.splice(index, index);
//                    Ti.API.info("Element " + index + " contains the value " + element.id + " and will be deleted with match to: " + _e.id);
//                };
//			};
//            
//            Ti.API.info("taskRemoved occured");
//            tasks.forEach(removeItem);
//            
//            updateTasksView(tasks);
//        });
//        
//        Titanium.API.addEventListener('taskItemUpdated', function(_e){
//        
//            Ti.API.info("taskItemUpdated occured");
//            
//            updateTasksView(tasks);
//        });
//        
//    } 
//    catch (E) {
//        alert(E);
//    }
//};
//xhr.send();




