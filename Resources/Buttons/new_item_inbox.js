(function() {

	gtd.ui.Buttons = {}; // nytt sub namespace

	gtd.ui.Buttons.createTableView = function() {
		var newInboxItem = Titanium.UI.createButton({
			title:'Add new item',
			height:40,
			width:145,
			top:160,
			right:10
		});
		
		newInboxItem.addEventListener('click', function()
		{
			//TODO add logic to open "inbox entry editor"
		});
		
		return newInboxItem;
	};
	
})();