(function(){
    gtd.views = {};
	gtd.views.login = {};
    
    //
    // create controls tab and root window
    //
    gtd.views.login.createWindow = function(){
        var win2 = Titanium.UI.createWindow({
            title: 'Configuration',
            backgroundColor: '#fff'
        });
		
		win2.add(Titanium.UI.createLabel({
        		color: '#999',
        		text: 'Enter login details',
        		font: {
            		fontSize: 20,
            		fontFamily: 'Helvetica Neue'
        		},
        		height: 35,
		        top: 50,
		        width: 'auto'
    		}));
			
   		var tfuser = Titanium.UI.createTextField({
	        value: Titanium.App.Properties.getString("user"),
	        color: '#336699',
	        height: 35,
	        top: 110,
	        left: 10,
	        width: 300,
	        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	    });
		
		win2.add(tfuser);
	    
		var tfpass = Titanium.UI.createTextField({
	        value: Titanium.App.Properties.getString("pass"),
	        color: '#336699',
	        height: 35,
	        top: 150,
	        left: 10,
	        width: 300,
	        passwordMask: true,
	        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	    });
			
		win2.add(tfpass);
			
	    var loginStatus = Titanium.UI.createLabel({
	        color: '#999',
	        text: 'Status: ',
	        font: {
	            fontSize: 15,
	            fontFamily: 'Helvetica Neue'
	        },
	        height: 100,
	        top: 250,
	        textAlign: 'left',
	        width: 'auto'
	    });
		
		Titanium.API.addEventListener('updateLogLabel', function(_e){
	        loginStatus.text = gtd.utils.verify_credentials();
	    });
		
		win2.add(loginStatus);
		
		
		var confirmbtn = Titanium.UI.createButton({
	        title: 'Test connection',
	        height: 40,
	        width: 200,
	        top: 210
	    
	    });
	    
	    confirmbtn.addEventListener('click', function(){
	        Titanium.API.info("verify creds");
	        
	        Titanium.App.Properties.setString("user", tfuser.value);
	        Titanium.App.Properties.setString("pass", tfpass.value);
	        
	        gtd.utils.verify_credentialsToLabel(tfuser.value, tfpass.value);
	        
	    });
		
		win2.add(confirmbtn);
		
        return win2;
    };
    
    gtd.views.login.createTab = function(){
        var loginTab = Titanium.UI.createTab({
            icon: 'KS_nav_mashup.png',
            title: 'Configuration',
            window: gtd.views.login.createWindow()
        });
		return loginTab;
    };
	
        
})();
