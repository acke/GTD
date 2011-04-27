(function(){
    var user = Titanium.App.Properties.getString("user");
    var pass = Titanium.App.Properties.getString("pass");
    
    Ti.include('../net/httppost.js');
    
    createTaskEditor = function(e){
		var w = Ti.UI.createWindow({
            title: 'Edit task'
        });
        
        var view = Titanium.UI.createScrollView({
            contentWidth: 'auto',
            contentHeight: 'auto',
            top: 0,
            showVerticalScrollIndicator: true,
            showHorizontalScrollIndicator: true,
            backgroundColor: '#fff'
        });
        
        var task = Titanium.UI.createTextField({
            color: '#000',
            value: e.title,
            font: {
                fontSize: 16,
                fontFamily: 'Helvetica Neue'
            },
            top: 10,
            height: 35,
            width: 280,
            borderStyle: Titanium.UI.INPUT_BORDERSTYLE_BEZEL
        });
        
        view.add(task);
        
        var quad = Titanium.UI.createLabel({
            color: '#000',
            text: 'Task is ' + e.quadrantString,
            font: {
                fontSize: 16,
                fontFamily: 'Helvetica Neue'
            },
            textAlign: 'left',
            width: 280,
            top: 50,
            height: 35
        });
        
        view.add(quad);
        
        var age = Titanium.UI.createLabel({
            color: '#000',
            text: 'Task is ' + e.age + ' days old',
            font: {
                fontSize: 16,
                fontFamily: 'Helvetica Neue'
            },
            textAlign: 'left',
            width: 280,
            top: 85,
            height: 35
        });
        
        view.add(age);
        
        var notes = Titanium.UI.createTextArea({
            color: '#000',
            value: (e.notes) ? e.notes : 'Add note',
            font: {
                fontSize: 16,
                fontFamily: 'Helvetica Neue'
            },
            top: 130,
            height: 200,
            width: 280,
            appearance: Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
            keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
            returnKeyType: Titanium.UI.RETURNKEY_DEFAULT,
            borderWidth: 2,
            borderColor: '#aaa',
            borderRadius: 5,
            suppressReturn: false
        });
        
        view.add(notes);
        
        w.add(view);
        
        // used to evenly distribute items on the toolbar
        var flexSpace = Titanium.UI.createButton({
            systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
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
        
            var poststring = 'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/' + user + '&password=' + pass + '&action=mark_as_completed';
            var fileName = 'completed.xml';
            
            var t = postHTTPClient(poststring, fileName, 'NextActionID=' + e.id);
            
            //Dispatch a message to let others know the database has been updated
            Ti.App.fireEvent("taskDataUpdated");
            
            w.close();
        });
        
        w.toolbar = [flexSpace, action, flexSpace, done];
        
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
            var poststring = 'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/' + user + '&password=' + pass + '&action=update_next_action';
            var fileName = 'task.xml';
            
            var t = postHTTPClient(poststring, fileName, 'NextActionID=' + e.id + '&Title=' + task.value + '&Notes=' + notes.value);
            
            //Dispatch a message to let others know the database has been updated
            Ti.App.fireEvent("taskDataUpdated");
            
            w.close();
        });
        
        return w;
        
    };
    
    
})();
