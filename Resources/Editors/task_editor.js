(function(){
    var user = Titanium.App.Properties.getString("user");
    var pass = Titanium.App.Properties.getString("pass");
    
    Ti.include('../net/httppost.js');
    
    createTaskEditor = function(e){
        var w = Ti.UI.createWindow({
            title: 'Edit task'
        });
        
        var view = Ti.UI.createView({
            backgroundColor: '#fff'
        });
        
        var newItem = Titanium.UI.createLabel({
            color: '#999',
            text: e.title,
            font: {
                fontSize: 20,
                fontFamily: 'Helvetica Neue'
            },
            height: 100,
            top: 10,
            width: 280
        });
        
 
        
        view.add(newItem);
        
        w.add(view);
        
        // used to evenly distribute items on the toolbar
        var flexSpace = Titanium.UI.createButton({
            systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
        });
        
        var trash = Titanium.UI.createButton({
            systemButton: Titanium.UI.iPhone.SystemButton.TRASH
        });
        trash.addEventListener('click', function(){
        
            var poststring = 'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/' + user + '&password=' + pass + '&action=delete_inbox_entry';
            var fileName = 'deleteitem.xml';
            
            var t = postHTTPClient(poststring, fileName, 'InboxEntryID=' + e.id);
            
            //Dispatch a message to let others know the database has been updated
            Ti.App.fireEvent("inboxDataUpdated");
            
            w.close();
        });
        
        //Create system buttons        
        var action = Titanium.UI.createButton({
            systemButton: Titanium.UI.iPhone.SystemButton.ACTION
        });
        action.addEventListener('click', function(){
            Titanium.UI.createAlertDialog({
                title: 'ACTION',
                message: 'ACTION: not yet implemented'
            }).show();
        });
        
        var done = Titanium.UI.createButton({
            systemButton: Titanium.UI.iPhone.SystemButton.DONE
        });
        done.addEventListener('click', function(){
        
            var poststring = 'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/' + user + '&password=' + pass + '&action=mark_inbox_entry_as_handled';
            var fileName = 'handled.xml';
            
            var t = postHTTPClient(poststring, fileName, 'InboxEntryID=' + e.id);
            
            //Dispatch a message to let others know the database has been updated
            Ti.App.fireEvent("inboxDataUpdated");
            
            w.close();
        });
        
        w.toolbar = [trash, flexSpace, action, flexSpace, done];
        
        var close = Titanium.UI.createButton({
            title: 'Close',
            style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN
        });
        w.setLeftNavButton(close);
        close.addEventListener('click', function(){
            w.close();
        });
        
        var commit = Titanium.UI.createButton({
            title: 'Commit',
            style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN
        });
        w.setRightNavButton(commit);
        commit.addEventListener('click', function(){
            gtd.ui.navigator.sendNewItem(tfItem.value);
            w.close();
        });
        
        return w;
        
    };
    
})();
