function createAboutTab(){
	var backgroundGradient = {
				type: 'linear',
				colors: [{
					color: '#533A73',
					position: 0.0
				}, {
					color: '#FFFFFF',
					position: 1.0
				}]
			};
			
    var aboutWin = Titanium.UI.createWindow({
        title: 'About',
		backgroundGradient: backgroundGradient
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


