// create table view data object
(function(){
		
	gtd.ui = {};
	
	Ti.include('Views/login.js');
	
	Ti.include('log.js');
	
	Ti.include('Buttons/new_item_inbox.js');
		
	var newItemButton = gtd.ui.Buttons.createButton();
	
	gtd.ui.createTableView = function() {
		var myTable = Ti.UI.createTableView();
		
		myTable.addEventListener('click', function(_e) {
			
			if (e.rowData.myData)
			{
				var win = null;
				if (Ti.Platform.name == "android") {
					win = Titanium.UI.createWindow({
						url:e.rowData.myData,
						title:e.rowData.title
					});
				} else {
					win = Titanium.UI.createWindow({
						url:e.rowData.myData,
						title:e.rowData.title,
						backgroundColor:'#fff',
						barColor:'#111'
		
					});
				}
		
				if (e.index == 3)
				{
					win.hideTabBar();
				}
				Titanium.UI.currentTab.open(win,{animated:true});
			}
			
			return myTable;
			
		});
	
		function populateData() {
			
			var data = [
		    		{title:'Inbox', hasChild:true, myData:'Views/inbox.js'},
		    		{title:'Tasks', hasChild:true, myData:'Views/tasks.js'},
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
		win.rightNavButton = newItemButton;
		
		return win;
	};
	gtd.ui.createSecondWindow = function(_myData){
		var win = Ti.UI.createWindow({
			backgroundColor:'#FFFFFF',
			title: _myData.title
		});
		return win;
	};
	gtd.ui.createApplicationTabGroup = function(){
		var tabGroup = Ti.UI.createTabGroup();
		var navigator = gtd.ui.createMyWindow();
		gtd.navigatorTab = Ti.UI.createTab({
			title: 'MeldonGTD',
			window: navigator
		});
		
		tabGroup.addTab(gtd.navigatorTab);
		tabGroup.addTab(tab2); 
		tabGroup.addTab(tab3); 
		
		return tabGroup;
	};
	
	// add table view to the window
//	Titanium.UI.currentWindow.add(tableview);
	
//	Titanium.UI.currentWindow.addEventListener('focus', function()
//	{
//		Ti.API.info('FOCUS RECEIVED IN navigator');
//	});
	//
	//  ADD EVENT LISTENERS FOR CUSTOM EVENTS
	//
//	var win = Titanium.UI.createWindow({
//		height:30,
//		width:250,
//		bottom:110,
//		borderRadius:10
//	});
	
//	var view = Titanium.UI.createView({
//		backgroundColor:'#000',
//		opacity:0.7,
//		height:30,
//		width:250,
//		borderRadius:10
//	});
	
	
//	var label = Titanium.UI.createLabel({
//		color:'#fff',
//		font:{fontSize:13},
//		textAlign:'center',
//		width:'auto',
//		height:'auto'
//	});
//	win.add(view);
//	win.add(label);
	
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


