//
// create base UI tab and root window
//

(function(){

    gtd.utils = {};
    gtd.utils.logview = {};

    gtd.utils.logview.createLabel = function(){
        var loglabel = Titanium.UI.createLabel({
            color: '#999',
            text: 'Log info:',
            font: {
                fontSize: 10,
                fontFamily: 'Helvetica Neue'
            },
			top: 0,
            width: 'auto'
        });
        
        Ti.API.addEventListener('updateLogLabel', function(_e){
            loglabel.text = _e.text;
        });
        
        return loglabel;
    };
    
    gtd.utils.logview.createWindow = function(loglabel){
		var loglabelRet = gtd.utils.logview.createLabel();
       
	    var win3 = Titanium.UI.createWindow({
            title: 'Log info',
            backgroundColor: '#fff'
        });
		
        var scrollView = Titanium.UI.createScrollView({
            contentWidth: 'auto',
            contentHeight: 'auto',
            top: 0,
            showVerticalScrollIndicator: true
        });
        
        var view = Ti.UI.createView({
            width: 'auto',
            height: 600,
            top: 10
        });
        
		scrollView.add(view);
		view.add(loglabelRet);
		win3.add(scrollView);
		
        return win3;
    };
    
    gtd.utils.logview.createTab = function(){
        var win3 = gtd.utils.logview.createWindow();
        var tab3 = Titanium.UI.createTab({
            icon: 'KS_nav_views.png',
            title: 'Log',
            window: win3
        });
        return tab3;
    };
    
    
})();
