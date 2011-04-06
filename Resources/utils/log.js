//
// create base UI tab and root window
//

(function() {

	gtd.utils = {};
	
	gtd.utils.createWindow = function (){
		var win3 = Titanium.UI.createWindow({  
		    title:'Log info',
		    backgroundColor:'#fff'
		});
		
		return win3;
	};
	
	gtd.utils.createLabel = function (){
		var loglabel = Titanium.UI.createLabel({
			color:'#999',
			text:'Log info:',
			font:{fontSize:10,fontFamily:'Helvetica Neue'},
			textAlign:'left',
			width:'auto'
		});
		return loglabel;
	};

	gtd.utils.createTab = function (){
		var win3 = gtd.utils.createWindow();
		var loglabel = gtd.utils.createLabel();
		var tab3 = Titanium.UI.createTab({  
	
		    icon:'KS_nav_views.png',
		    title:'Log',
		    window:win3
		});
		win3.add(loglabel);
		return tab3;
	};
	
	gtd.utils.getLabel = function (){
		return loglabel;
	};
	

})();