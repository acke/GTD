
function setupTaskFilter(){
    //
    // NAVBAR
    // 
    var bb3 = Titanium.UI.createButtonBar({
        labels: ['Filter']
    });
    
    bb3.addEventListener('click', function(e){
		Titanium.API.info(e.index);
        if (e.index == 0) {
            //Ti.include('../Editors/inbox_entry_editor.js');
			Titanium.UI.createAlertDialog({title:'Filter',message:'Not implemented yet ' + e.index}).show();
        }
        else 
            if (e.index == 1) {
			Titanium.UI.createAlertDialog({title:'Filter',message:'Not implemented yet ' + e.index}).show();
		}
    });
    
    return bb3;
};
