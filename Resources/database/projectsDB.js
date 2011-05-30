(function(){

    Titanium.API.info("Creating DB.");
    var db = Titanium.Database.open('projectsdb');
    db.execute('CREATE TABLE IF NOT EXISTS projects(id INTEGER PRIMARY KEY, project_id INTEGER, title TEXT, state TEXT, goal TEXT, notes TEXT, quadrant INTEGER);');
    db.close();
    
    initProjectDB = function(){
        var db = Titanium.Database.open('projectsdb');
        db.execute('DROP TABLE projects');
        db.execute('CREATE TABLE IF NOT EXISTS projects(id INTEGER PRIMARY KEY, project_id INTEGER, title TEXT, state TEXT, goal TEXT, notes TEXT, quadrant INTEGER);');
        db.close();
    };
    
    updateProjectsDB = function(project){
        var db = Titanium.Database.open('projectsdb');
        db.execute("INSERT INTO projects(project_id, title, state, goal, notes, quadrant) VALUES(?,?,?,?,?,?)", project.id, project.title, project.state, project.goal, project.notes, project.quadrant);
        db.close();
    };
    
    getAllFromProjectsDB = function(){
        var projects = [];
		Titanium.API.info("getAllFromProjectsDB called.");
        var db = Ti.Database.open('projectsdb');
        var result = db.execute('SELECT * FROM projects');
        while (result.isValidRow()) {
            projects.push({
                //add these attributes for the benefit of a table view
                title: result.fieldByName('title'),
                id: result.fieldByName('id'),
                state: result.fieldByName("state"),
                goal: result.fieldByName("goal"),
                notes: result.fieldByName("notes"),
                quadrant: result.fieldByName("quadrant"),
                hasChild: true
            });
            result.next();
        }
        result.close(); //make sure to close the result set
        db.close();
        
        return projects;
    };
    
    getItemFromProjectsDB = function(_id){
        var project_id = _id;
        var project = [];
        
        Titanium.API.info("getItemFromDB called.");
        
        var db = Titanium.Database.open('projectsdb');
        var rows = db.execute('SELECT * FROM projects WHERE project_id = ?', project_id);
        
        if (rows !== null) {
            var pr_id = rows.fieldByName('project_id');
            var name = rows.fieldByName('name');
            
            projects.push({
                project_id: pr_id,
                name: name
            });
            rows.close();
        }
        else {
            Titanium.API.info("db.execute('SELECT * FROM projects WHERE project_id') returned nothing.");
        };
        
        db.close();
        
        return project;
        
    };
    
    getTitleAndIDFromProjectsDB = function(){
        var projects = [];
        
        Titanium.API.info("getTitleAndIDFromDB called.");
        
        var db = Titanium.Database.open('projectsdb');
        var result = db.execute('SELECT project_id, title FROM projects');
        Titanium.API.info("pushing" + result);
        
        while (result.isValidRow()) {
        
            projects.push({
                project_id: result.fieldByName('project_id'),
                title: result.fieldByName('title')
            });
            result.next();
        }
        result.close(); //make sure to close the result set
        db.close();
        
        return projects;
        
    };
	
    deleteProjectInDB = function(){
        Titanium.API.addEventListener('updateprojectDB', function(_e){
            Titanium.Database.open('projectsdb');
            db.execute("INSERT INTO projects(project_id,name) VALUES(?,?)", _e.project_id, _e.name);
            db.close();
        });
    };
    
})();

