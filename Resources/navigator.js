// create table view data object
(function(){

    gtd.ui = {};
    gtd.ui.navigator = {};
    
    Ti.include('Buttons/new_item_inbox.js', 'net/sendHTTP.js', 'utils/log.js', 'Views/login.js' , 'Views/duedateView.js'   //		'model/project_list.js'
    );
    
    var loglabel = null;
    
    var projects = [];
    var logtab = gtd.utils.logview.createTab();
    var loginTab = gtd.views.login.createTab();
    
    gtd.ui.navigator.sendNewItem = function(value){
        var user = Titanium.App.Properties.getString("user");
        var pass = Titanium.App.Properties.getString("pass");
        
        var poststring = 'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/' + user + '&password=' + pass + '&action=add_inbox_entry';
        
        var fileName = 'newitem.xml';
        
        var client = gtd.net.postHTTP(poststring, fileName);
        // send the data
        client.send('mimetype=text/plain&state=unhandled&content=' + value);
    };
    
    gtd.ui.navigator.createTableView = function(){
        var myTable = Ti.UI.createTableView();
        
        myTable.addEventListener('click', function(_e){
            var tab = gtd.ui.navigatorTab; // Open window on this tab , found defined below
            tab.open(gtd.ui.navigator.createSecondWindow(_e.rowData)); // Relay the row object
            return myTable;
            
        });
        
        function populateData(){
        
            var data = [{
                title: 'Inbox',
                hasChild: true,
                myData: 'Views/inbox.js'
            }, {
                title: 'Due',
                hasChild: true,
                myData: 'Views/duedateView.js'
            }, {
                title: 'Tasks',
                hasChild: true,
                myData: 'Views/tasks.js'
            }, {
                title: 'Projects',
                hasChild: true,
                myData: 'Views/projectsView.js'
            }, {
                title: 'Checklists',
                hasChild: true,
                myData: 'Views/checklists.js'
            }, {
                title: 'API',
                hasChild: true,
                myData: 'Views/api.js'
            }];
            
            myTable.setData(data);
        }
        
        Ti.App.addEventListener('dataUpdated', populateData);
        
        populateData();
        
        return myTable;
    };
    
    gtd.ui.navigator.createMyWindow = function(){
        var win = Ti.UI.createWindow({
            height: 30,
            width: 250,
            bottom: 110
        });
        win.add(gtd.ui.navigator.createTableView());
        win.rightNavButton = gtd.ui.Buttons.createButton();
        
        return win;
    };
    gtd.ui.navigator.createSecondWindow = function(_myData){
        var win = Ti.UI.createWindow({
            url: _myData.myData,
            title: _myData.title,
            backgroundColor: '#fff',
            barColor: '#111'
        });
        win.rightNavButton = gtd.ui.Buttons.createButton();
        
        return win;
    };
    
    gtd.ui.navigator.createApplicationTabGroup = function(){
        var tabGroup = Ti.UI.createTabGroup();
        var navigator = gtd.ui.navigator.createMyWindow();
        
        gtd.ui.navigatorTab = Ti.UI.createTab({
            title: 'MeldonGTD Client',
            window: navigator
        });
        
        Titanium.include('utils/verifyCredentials.js');
        
        if (gtd.utils.verify_credentials() !== "Login OK") {
            tabGroup.addTab(loginTab);
            tabGroup.addTab(gtd.ui.navigatorTab);
        }
        else {
            tabGroup.addTab(gtd.ui.navigatorTab);
            tabGroup.addTab(loginTab);
        }
        
        tabGroup.addTab(logtab);
        
        return tabGroup;
    };
    
})();


