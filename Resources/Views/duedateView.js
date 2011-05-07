(function(){

createDueDateTableView = function(/*Boolean*/ _captured) {
		var tv = Ti.UI.createTableView();
		
		tv.addEventListener('click', function(_e) {
			var tab = (_captured) ? bh.capturedTab : bh.fugitivesTab;
			tab.open(gtd.ui.duedateView.createDetailWindow(_e.rowData));
		});
		
		function populateData() {
//			var results = bh.db.list(_captured);			
//			tv.setData(results);
		}
		Ti.App.addEventListener('databaseUpdated', populateData);
		
		//run initial query
		populateData();
		
		return tv;
	};

})();