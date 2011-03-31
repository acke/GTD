(function() {

	gtd.ui.Buttons = {}; // nytt sub namespace

	gtd.ui.Buttons.createButton = function() {
		var newInboxItem = Titanium.UI.createButton({title:'New item'});
		
		newInboxItem.addEventListener('click', function()
		{
			Ti.include('Editors/inbox_entry_editor.js');
		});
		
		return newInboxItem;
	};
	
})();