(function(){
    var user = Titanium.App.Properties.getString("user");
    var pass = Titanium.App.Properties.getString("pass");
    
    Ti.include('../database/projectsDB.js', '../net/httppost.js', '../utils/projectParsers.js');
    
    createTaskEditor = function(e){
        var w = Ti.UI.createWindow({
            title: 'Edit task',
            orientationModes: [Titanium.UI.PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT]
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
            left: 10,
            right: 10,
            borderWidth: 1,
            borderRadius: 3
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
            value: e.quadrant,
            left: 10,
            right: 10,
            height: 'auto',
            top: 80
        });
        basicSlider.addEventListener('change', function(e){
        
            basicSliderLabel.text = getQuadrantFromValue(Math.round(e.value));
            
        });
        
        view.add(basicSlider);
        
        var age = Titanium.UI.createLabel({
            color: '#000',
            text: 'Task is ' + e.age + ' days old',
            font: {
                fontSize: 16,
                fontFamily: 'Helvetica Neue'
            },
            textAlign: 'left',
            left: 10,
            right: 10,
            top: 115,
            height: 35
        });
        
        view.add(age);
        
        var projects = getTitleAndIDFromProjectsDB();
        var projectTitleList = ['Cancel'];
        var projectSelectedValue = 0;
        
        var dialog = Titanium.UI.createOptionDialog({
            title: 'Select a project',
            options: getProjectTitlesFromArray(projects, projectTitleList),
            cancel: 0
        });
        dialog.addEventListener('click', function(e){
            if (e.index > 0) {
                projectButton.text = dialog.options[e.index + 1];
                Titanium.API.info("Selected project id is: " + projects[e.index].project_id + " title is: " + projects[e.index].title);
                projectSelectedValue = projects[e.index].project_id;
            }
        });
        
        
        var projectButton = Titanium.UI.createLabel({
            color: '#000',
            text: (e.projectID) ? getProjectString(projects, e.projectID) : 'Select Project',
            font: {
                fontSize: 16,
                fontFamily: 'Helvetica Neue'
            },
            textAlign: 'left',
            left: 10,
            right: 10,
            top: 145,
            height: 35,
            borderWidth: 1,
            borderRadius: 5
        });
        projectButton.addEventListener('click', function(e){
            dialog.show();
        });
        
        view.add(projectButton);
        
        var notes = Titanium.UI.createTextArea({
            color: '#000',
            value: (e.notes) ? e.notes : 'Add note',
            font: {
                fontSize: 16,
                fontFamily: 'Helvetica Neue'
            },
            top: 180,
            height: 200,
            left: 10,
            right: 10,
            appearance: Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
            keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
            returnKeyType: Titanium.UI.RETURNKEY_DEFAULT,
            borderWidth: 1,
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
            Ti.API.fireEvent('taskRemoved', {
                id: e.id
            });
            
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
            var poststring = 'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/' + user + '&password=' + pass + '&action=update_next_action2';
            var fileName = 'task.xml';
            
            var t = postHTTPClient(poststring, fileName, 'NextActionID=' + e.id + '&Title=' + task.value + '&Notes=' + notes.value + '&DueOn=0' + '&Duration=0' + '&Effort=0' + '&ProjectID=' + projectSelectedValue + '&Context=default' + '&Quadrant=' + basicSlider.value);
            
            //Dispatch a message to let others know the database has been updated
            Ti.API.fireEvent("taskItemUpdated", {
                id: e.id
            });
            
            w.close();
        });
        
        return w;
        
    };
    
    
})();
