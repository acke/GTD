 (function (){
	 
	 createNewTableView = function (tableData, doctitle){
		 var tableview = Titanium.UI.createTableView({data:tableData});
			Titanium.UI.currentWindow.add(tableview);
			tableview.addEventListener('click',function(e)
			{
				var w = Ti.UI.createWindow({title:doctitle});
				var wb = Ti.UI.createWebView({url:e.row.url});
				w.add(wb);
				var b = Titanium.UI.createButton({
					title:'Close',
					style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
				});
				w.setLeftNavButton(b);
				b.addEventListener('click',function()
				{
					w.close();
				});
				w.open({modal:true});
			});
			
	 	return tableview;		
	 };
	 
 })();
