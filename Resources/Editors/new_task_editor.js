(function(){
    var user = Titanium.App.Properties.getString("user");
    var pass = Titanium.App.Properties.getString("pass");
    
    Ti.include('../net/httppost.js', '../utils/quadrant.js');
    
    createTaskEditor = function(e){
        var w = Ti.UI.createWindow({
            title: 'New task'
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
            height: 35,
            top: 10,
            width: 280,
            borderStyle: Titanium.UI.INPUT_BORDERSTYLE_BEZEL
        });
        
        view.add(task);
        
        var basicSliderLabel = Titanium.UI.createLabel({
            text: 'Basic Slider - value = 0',
            color: '#000',
            font: {
                fontFamily: 'Helvetica Neue',
                fontSize: 15
            },
            textAlign: 'center',
            top: 60,
            width: 280,
            height: 'auto'
        });
        view.add(basicSliderLabel);
        
        var basicSlider = Titanium.UI.createSlider({
            min: 1,
            max: 4,
            value: 2,
            width: 250,
            height: 'auto',
            top: 80
        });
        basicSlider.addEventListener('change', function(e){
        
            basicSliderLabel.text = getQuadrantFromValue(Math.round(e.value));
            
        });
        
        view.add(basicSlider);
        
        var notes = Titanium.UI.createTextArea({
            color: '#000',
            value: 'Add note',
            font: {
                fontSize: 16,
                fontFamily: 'Helvetica Neue'
            },
            height: 100,
            top: 110,
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
        
		inboxItemHandled = function (inboxItemid){
			
			var poststring = 'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/' + user + '&password=' + pass + '&action=mark_inbox_entry_as_handled';
            var fileName = 'handled.xml';
            
            var t = postHTTPClient(poststring, fileName, 'InboxEntryID=' + e.id);
			
		};
		
        var done = Titanium.UI.createButton({
            systemButton: Titanium.UI.iPhone.SystemButton.DONE
        });
        done.addEventListener('click', function(){
        
            inboxItemHandled(e.id);
            
            //Dispatch a message to let others know the database has been updated
            Ti.App.fireEvent("inboxDataUpdated");
            
            w.close();
        });
        
        if (!e.isTask) {
            w.toolbar = [trash, flexSpace, action, flexSpace, done];
        };
        
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
        
            var poststring = 'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/' + user + '&password=' + pass + '&action=add_next_action';
            var sendParams = 'title=' + task.value + '&quadrant=' + basicSlider.value + '&notes=' + notes.value + '&context=default' + '&part_of_project_id=0';
            var fileName = 'task.xml';
            
            var t = postHTTPClient(poststring, fileName, sendParams);
            
			inboxItemHandled(e.id);
			
            //Dispatch a message to let others know the database has been updated
            Ti.App.fireEvent("inboxDataUpdated");
            
            w.close();
        });
        
        return w;
        
    };
    
    
})();
