(function(){
    gtd.database = {};
    gtd.database.checklist = {};
    
    Titanium.API.info("Creating DB.");
	var db = Titanium.Database.open('checklistsdb');
    db.execute('CREATE TABLE IF NOT EXISTS checklists(id INTEGER PRIMARY KEY, checklist_id INTEGER, name TEXT);');
	db.execute('CREATE TABLE IF NOT EXISTS checklist_entries(id INTEGER PRIMARY KEY, checklist_entry_id INTEGER, name TEXT, checklists_id INTEGER);');
    db.close();
    
	Titanium.API.addEventListener('updateChecklistDB', function(_e){
		Titanium.API.info("updateChecklistDB called."+_e.name);
        Titanium.Database.open('checklistsdb');
		db.execute("INSERT INTO checklists(checklist_id,name) VALUES(?,?)",_e.checklist_id,_e.name);
		db.close();
		Titanium.API.info("Checklist added: "+_e.name);
	});
	
//    gtd.database.checklist.updateDB = function(){
//		
//        
//    };
	
	gtd.database.checklist.deleteChecklist = function(){
		Titanium.API.addEventListener('updateChecklistDB', function(_e){
	        Titanium.Database.open('checklistsdb');
			db.execute("INSERT INTO checklists(checklist_id,name) VALUES(?,?)",_e.checklist_id,_e.name);
			db.close();
		});
    };
    
})();

