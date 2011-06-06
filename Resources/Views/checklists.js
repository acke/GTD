
// create table view data object
var checklists = [];
var checklistsWin = Titanium.UI.currentWindow;
var tableView;

Ti.include('../net/getChecklists.js', '../utils/createTableView.js', '../utils/checklistParsers.js');

function updateChecklistsView(checklists){
    tableView.setData(checklists);
};

function endReloading(){
    tableView = createNewTableView();
    
    checklistsWin.add(tableView);
    
    updateChecklistsView(checklists);
}

function showChecklists(){

    getChecklists(function(data){
        checklists = data;
    });
    
    setTimeout(endReloading, 1000);
};

showChecklists();




