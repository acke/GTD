(function(){

    var w = Ti.UI.createWindow({
        title: 'Inbox'
    });
    
    var view = Ti.UI.createView({
        backgroundColor: '#fff',
        borderRadius: 10,
        width: 300,
        height: 400,
        top: 10
    });
    
    var newItem = Titanium.UI.createLabel({
        color: '#999',
        text: 'Add a new item: ',
        font: {
            fontSize: 20,
            fontFamily: 'Helvetica Neue'
        },
        height: 35,
        top: 50,
        width: 280
    });
    
    var tfItem = Titanium.UI.createTextField({
        color: '#336699',
        height: 35,
        top: 110,
        left: 10,
        width: 280,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
    });
    
    view.add(newItem);
    view.add(tfItem);
    
    w.add(view);
    
    var close = Titanium.UI.createButton({
        title: 'Close',
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
		Ti.API.fireEvent('inboxItemAdded', {text: tfItem.value});
        w.close();
    });
    
})();
