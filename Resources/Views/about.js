Ti.include('uicomponents/backgroundGradient.js');

function createAboutTab(){
			
    var aboutWin = Titanium.UI.createWindow({
        title: 'About',
		backgroundGradient: getBackgroundGradient()
    });
    
    var webView = Ti.UI.createWebView({
        url:'about.html'
    });
    
    aboutWin.add(webView);
    
    var aboutTab = Titanium.UI.createTab({
        icon: 'KS_nav_phone.png',
        title: 'About',
        window: aboutWin
    });
    
    return aboutTab;
};


