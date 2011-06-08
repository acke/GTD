
function createChecklistViewer(data){
    var w = Ti.UI.createWindow({
        title: data.title,
		backgroundColor:'#fff',
        orientationModes: [Titanium.UI.PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT]
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
		left: 5,
        width: 'auto',
		height: 'auto',
        top: 10
    });
    
    scrollView.add(view);
    
    var newItem = Titanium.UI.createLabel({
        text: data.content,
        font: {
            fontSize: 15,
            fontFamily: 'Helvetica Neue'
        },
        textAlign: 'left',
        width: 'auto',
        height: 'auto'
    });
    
    view.add(newItem);
    
    w.add(scrollView);
    
    var close = Titanium.UI.createButton({
        title: 'Back',
        style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN
    });
    w.setLeftNavButton(close);
    close.addEventListener('click', function(){
        w.close();
    });
    w.open({
        modal: true
    });
    
    return w;
    
};
