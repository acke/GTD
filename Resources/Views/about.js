function createAboutTab(){
    var about = "Meldon GTD Client \n\nThis is a early development project aiming at doing an Iphone MeldonGTD client. \n\n";
	about += "MeldonGTD is developed by David Burstrom. \n";
	about += "http://meldon.org/gtd/ \n\n";
	about += "Splash screen by Henrik Neckfors. \n\n";
	about += "IMPORTANT: \n";
	about += "An account at meldon.org is required to use this application.";

    var aboutWin =  Titanium.UI.createWindow({
            title: 'About',
            backgroundColor: '#fff'
        });
    
    var scrollView = Titanium.UI.createScrollView({
        contentWidth: 'auto',
        contentHeight: 'auto',
        top: 0,
        showVerticalScrollIndicator: true,
        showHorizontalScrollIndicator: true
    });
    
    var view = Ti.UI.createView({
        backgroundColor: '#fff',
        borderRadius: 10,
        width: 300,
        height: 'auto',
        top: 10
    });
    
    
    var aboutLabel = Titanium.UI.createLabel({
        color: '#000',
        text: about,
        font: {
            fontSize: 10,
            fontFamily: 'Helvetica Neue'
        },
        textAlign: 'left',
        width: 'auto',
        height: 'auto'
    });
    
    scrollView.add(view);
	view.add(aboutLabel);
    aboutWin.add(scrollView);
    
    
    var loginTab = Titanium.UI.createTab({
        icon: 'KS_nav_phone.png',
        title: 'About',
        window: aboutWin
    });
	
    return loginTab;
};


