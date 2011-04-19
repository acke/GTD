(function(){
    gtd.model = {};
    gtd.model.checklist = {};
    
	Titanium.include('database/checklistDB.js');
	
    gtd.model.checklist.checklists = function(){
		var myChecklists=[];
        return myChecklists;
    };
    
    gtd.model.checklist.getChecklist = function(/*id*/id){
		var myChecklist = gtd.database.checklist.getItemFromDB(id);
		
        return myChecklist;
    };
    
    gtd.model.checklist.addNewChecklist = function(/*id*/ id, /*name*/ name){
        Titanium.API.info("In function addNewChecklist");
//        myChecklists.push(checklist);
        
		gtd.database.checklist.updateDB(id, name);

    };
    
    gtd.model.checklist.delChecklist = function(/*id*/id){
        //TODO Remove element in db and create a new checklist object.
        
        Ti.API.fireEvent('updateChecklistDB', {
            list: checklist
        });
    };
    
})();

