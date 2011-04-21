(function(){
    gtd.database = {};
    gtd.database.checklist = {};
    
    Titanium.API.info("Creating DB.");
	var db = Titanium.Database.open('checklistsdb');
    db.execute('CREATE TABLE IF NOT EXISTS checklists(id INTEGER PRIMARY KEY, checklist_id INTEGER, name TEXT);');
	db.execute('CREATE TABLE IF NOT EXISTS checklist_entries(id INTEGER PRIMARY KEY, checklist_entry_id INTEGER, name TEXT, checklists_id INTEGER);');
    db.close();
    
    gtd.database.checklist.updateDB = function(checklist){
		var checklist_id = checklist.checklist_id;
		var checklist_name = checklist.name;

		Titanium.API.info("updateChecklistDB called.");
        var db = Titanium.Database.open('checklistsdb');
		db.execute("INSERT INTO checklists(checklist_id,name) VALUES(?,?)",checklist_id,checklist_name);
		db.close();
		Titanium.API.info("Checklist added: "+checklist_name);
		
		//Dispatch a message to let others know the database has been updated
		Ti.App.fireEvent("databaseUpdated");
        
    };
	
	gtd.database.checklist.getItemFromDB = function(_id){
		var checklist_id = _id;
		var checklist = [];

		Titanium.API.info("getItemFromDB called.");
		
        var db = Titanium.Database.open('checklistsdb');
		var rows = db.execute('SELECT * FROM checklists WHERE checklist_id = ?', checklist_id);
		
		if (rows !== null){
			var cl_id = rows.fieldByName('checklist_id');
			var name = rows.fieldByName('name');
			
			Titanium.API.info("checklist_id: "+cl_id + " name: " + name);
			
			checklist.push({
				checklist_id: cl_id,
				name: name
				});
			rows.close();
		}else{
			Titanium.API.info("db.execute('SELECT * FROM checklists WHERE checklist_id') returned nothing.");	
		};
		
		db.close();
		
		return checklist;
        
    };
	
	gtd.database.checklist.deleteChecklist = function(){
		Titanium.API.addEventListener('updateChecklistDB', function(_e){
	        Titanium.Database.open('checklistsdb');
			db.execute("INSERT INTO checklists(checklist_id,name) VALUES(?,?)",_e.checklist_id,_e.name);
			db.close();
		});
    };
    
})();

