(function(){

    Titanium.API.info("Creating DB.");
    var db = Titanium.Database.open('tasksdb');
    db.execute('CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY, task_id INTEGER, title TEXT, notes TEXT, quadrant INTEGER, context TEXT, projectID INTEGER, age TEXT, quadrantString TEXT);');
    db.close();
    
    initTasksDB = function(){
        var db = Titanium.Database.open('tasksdb');
        db.execute('DROP TABLE tasks');
        db.execute('CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY, task_id INTEGER, title TEXT, notes TEXT, quadrant INTEGER, context TEXT, projectID INTEGER, age TEXT, quadrantString TEXT);');
        db.close();
    };
    
    updateTasksDB = function(task){
        var db = Titanium.Database.open('tasksdb');
        db.execute("INSERT INTO tasks(task_id, title, notes, quadrant, context, projectID, age, quadrantString) VALUES(?,?,?,?,?,?,?,?)", task.id, task.title, task.notes, task.quadrant, task.context, task.projectID, task.age, task.quadrantString);
        db.close();
    };
	
	getAllFromTasksDB = function(){
        var tasks = [];
		Titanium.API.info("getAllFromTasksDB called.");
        var db = Ti.Database.open('tasksdb');
        var result = db.execute('SELECT * FROM tasks');
        while (result.isValidRow()) {
            tasks.push({
                //add these attributes for the benefit of a table view
                title: result.fieldByName('title'),
                id: result.fieldByName('task_id'),
                context: result.fieldByName("context"),
                projectID: result.fieldByName("projectID"),
                notes: result.fieldByName("notes"),
                quadrant: result.fieldByName("quadrant"),
				age: result.fieldByName("age"),
                quadrantString: result.fieldByName("quadrantString"),
                hasChild: true
            });
            result.next();
        }
        result.close(); //make sure to close the result set
        db.close();
        
        return tasks;
    };
    
})();

