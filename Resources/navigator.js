// create table view data object
(function(){
		
	gtd.ui = {};
	
	Ti.include('Views/login.js');
	
	Ti.include('log.js');
	
	Ti.include('Buttons/new_item_inbox.js');
	
	Ti.include('net/sendHTTP.js');
	
	gtd.ui.sendNewItem = function (value){
		var user = Titanium.App.Properties.getString("user");
		var pass = Titanium.App.Properties.getString("pass");
		
		var poststring = 'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/'+user+'&password='+pass+'&action=add_inbox_entry';

		var fileName = 'newitem.xml';
		
		Ti.API.info(poststring);
		
		var client = gtd.net.postHTTP (poststring, fileName);
		// send the data
		client.send('mimetype=text/plain&state=unhandled&content='+value);
	};
	
	gtd.ui.createTableView = function() {
		var myTable = Ti.UI.createTableView();
		
		myTable.addEventListener('click', function(_e) {
			var tab = gtd.navigatorTab; // Open window on this tab , found defined below
			tab.open(gtd.ui.createSecondWindow(_e.rowData)); // Relay the row object

			return myTable;
			
		});
	
		function populateData() {
			
			var data = [
		    		{title:'Inbox', hasChild:true, myData:'Views/inbox.js'},
		    		{title:'Tasks', hasChild:true, myData:'Views/tasks.js'},
		    		{title:'Projects', hasChild:true, myData:'Views/projects.js'},
		    		{title:'Checklists', hasChild:true, myData:'Views/checklists.js'},
		    		{title:'API', hasChild:true, myData:'Views/api.js'}
		    	];
			
			myTable.setData(data);
		}
		
		populateData();
		
		return myTable;
	};
	
	gtd.ui.createMyWindow = function(){
		var win = Ti.UI.createWindow({
			height:30,
			width:250,
			bottom:110,
			borderRadius:10
		});
		win.add(gtd.ui.createTableView());
		win.rightNavButton = gtd.ui.Buttons.createButton();
		
		return win;
	};
	gtd.ui.createSecondWindow = function(_myData){
		var win = Ti.UI.createWindow({
			url:_myData.myData,
			title: _myData.title,
			backgroundColor:'#fff',
			barColor:'#111'
		});
		win.rightNavButton = gtd.ui.Buttons.createButton();
		
		return win;
	};
	gtd.ui.createApplicationTabGroup = function(){
		var tabGroup = Ti.UI.createTabGroup();
		var navigator = gtd.ui.createMyWindow();
		gtd.navigatorTab = Ti.UI.createTab({
			title: 'MeldonGTD Client',
			window: navigator
		});
		
		tabGroup.addTab(gtd.navigatorTab);
		tabGroup.addTab(tab2); 
		tabGroup.addTab(tab3); 
		
		return tabGroup;
	};
	
	Titanium.App.addEventListener('event_one', function(e)
	{
		label.text = 'navigator.js: event one, array length = ' + e.data.length;
		win.open();
		setTimeout(function()
		{
			win.close({opacity:0,duration:500});
		},1000);
	});
	
	Titanium.App.addEventListener('event_two', function(e)
	{
		label.text = 'navigator.js: event two, name = ' + e.name;
		win.open();
		setTimeout(function()
		{
			win.close({opacity:0,duration:500});
		},1000);
	
	});

})();


