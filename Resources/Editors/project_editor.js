(function(){
    var user = Titanium.App.Properties.getString("user");
    var pass = Titanium.App.Properties.getString("pass");
    
    Ti.include('../net/httppost.js', '../utils/quadrant.js');
    
    createProjectEditor = function(e){
        var win = Ti.UI.createWindow({
            title: 'Project',
            orientationModes: [Titanium.UI.PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT]
        });
        
        var view = Titanium.UI.createScrollView({
            contentWidth: 'auto',
            contentHeight: 'auto',
            top: 0,
            left: 5,
            right: 5,
            showVerticalScrollIndicator: true,
            showHorizontalScrollIndicator: true,
            backgroundColor: '#fff'
        });
        
        var title = Titanium.UI.createLabel({
            color: '#000',
            text: e.title,
            font: {
                fontSize: 16,
                fontFamily: 'Helvetica Neue'
            },
            textAlign: 'center',
            height: 35,
            top: 10,
            left: 5,
            right: 5,
            width: 'auto'
        });
        
        view.add(title);
        
        var state = Titanium.UI.createLabel({
            text: 'Project state: ' + e.state,
            color: '#000',
            font: {
                fontFamily: 'Helvetica Neue',
                fontSize: 15
            },
            textAlign: 'center',
            top: 60,
            left: 5,
            right: 5,
            height: 'auto'
        });
        view.add(state);
        
        var goal = Titanium.UI.createLabel({
            color: '#000',
            value: (e.goal) ? e.goal : 'No goals',
            font: {
                fontSize: 16,
                fontFamily: 'Helvetica Neue'
            },
            height: 100,
            top: 110,
            left: 5,
            right: 5,
            borderWidth: 2,
            borderColor: '#aaa',
            borderRadius: 5
        });
        
        view.add(goal);
        
        var notes = Titanium.UI.createLabel({
            color: '#000',
            value: (e.notes) ? e.notes : 'No note',
            font: {
                fontSize: 16,
                fontFamily: 'Helvetica Neue'
            },
            height: 100,
            top: 220,
            left: 5,
            right: 5,
            borderWidth: 2,
            borderColor: '#aaa',
            borderRadius: 5
        });
        
        view.add(notes);
        
        win.add(view);
        
        
        var close = Titanium.UI.createButton({
            title: 'Close',
            style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN
        });
        win.setLeftNavButton(close);
        close.addEventListener('click', function(){
            win.close();
        });
        
        var openTasks = Titanium.UI.createButton({
            title: 'Open tasks',
            style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN
        });
        win.setRightNavButton(openTasks);
        openTasks.addEventListener('click', function(){
        
            win.close();
        });
        
        return win;
        
    };
    
    
})();
