Ti.include('uicomponents/backgroundGradient.js');

(function(){

    var w = Ti.UI.createWindow({
        title: 'Inbox',
        orientationModes: [Titanium.UI.PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT],
        backgroundGradient: getBackgroundGradient()
    });
    
    var view = Ti.UI.createView();
    
    var newItem = Titanium.UI.createLabel({
        text: 'Add a new item: ',
        font: {
            fontSize: 20,
            fontFamily: 'Helvetica Neue'
        },
        borderRadius: 5,
        left: 10,
        right: 10,
        height: 35,
        top: 10
    });
    
    var tfItem = Titanium.UI.createTextField({
        borderRadius: 5,
        backgroundColor: 'white',
        height: 35,
        top: 40,
        left: 10,
        right: 10,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
    });
    
    view.add(newItem);
    view.add(tfItem);
    
    w.add(view);
    
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
    
    var commit = Titanium.UI.createButton({
        title: 'Commit',
        style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN
    });
    w.setRightNavButton(commit);
    commit.addEventListener('click', function(){
        gtd.ui.navigator.sendNewItem(tfItem.value);
        
        //Dispatch a message to let others know the data has been updated
        Ti.API.fireEvent('inboxUpdated', {
            text: tfItem.value
        });
        w.close();
    });
    
})();
