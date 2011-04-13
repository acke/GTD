//
// create base UI tab and root window
//

(function() {

	gtd.utils = {};
	gtd.utils.logview = {};
	
	gtd.utils.logview.createWindow = function (loglabel){
		var win3 = Titanium.UI.createWindow({  
		    title:'Log info',
		    backgroundColor:'#fff'
		});
		
		return win3;
	};
	
	gtd.utils.logview.createLabel = function (){
		var loglabel = Titanium.UI.createLabel({
			color:'#999',
			text:'Log info:',
			font:{fontSize:10,fontFamily:'Helvetica Neue'},
			textAlign:'left',
			width:'auto'
		});
		
		Ti.API.addEventListener ('updateLogLabel', function(_e){
			loglabel.text = _e.text;
		});
		
		return loglabel;
	};

	gtd.utils.logview.createTab = function (){
		var win3 = gtd.utils.logview.createWindow();
		var loglabel = gtd.utils.logview.createLabel();
		var tab3 = Titanium.UI.createTab({  
	
		    icon:'KS_nav_views.png',
		    title:'Log',
		    window:win3
		});
		win3.add(loglabel);
		return tab3;
	};


})();