function createAboutTab(){
    var aboutWin = Titanium.UI.createWindow({
        title: 'About'
    });
    
    var webView = Ti.UI.createWebView({
        url:'about.html'
    });
    
    aboutWin.add(webView);
    
    var loginTab = Titanium.UI.createTab({
        icon: 'KS_nav_phone.png',
        title: 'About',
        window: aboutWin
    });
    
    return loginTab;
};


