(function(){
    gtd.model = {};
    gtd.model.checklist = {};
    
    var myChecklists = [];
    
    gtd.model.checklist.checklists = function(){
        return myChecklists;
    };
    
    gtd.model.checklist.getChecklist = function(/*id*/id){
        return myChecklists[id];
    };
    
    gtd.model.checklist.addNewChecklist = function(/*checklist array*/checklist){
        Titanium.API.info("In function addNewChecklist");
        myChecklists.push(checklist);
        
        Ti.API.fireEvent('updateChecklistDB', myChecklists[0]);
    };
    
    gtd.model.checklist.delChecklist = function(/*id*/id){
        //TODO Remove element in db and create a new checklist object.
        
        Ti.API.fireEvent('updateChecklistDB', {
            list: checklist
        });
    };
    
})();

