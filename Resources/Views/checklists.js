
// create table view data object
var checklists = [];
var user = Titanium.App.Properties.getString("user");
var pass = Titanium.App.Properties.getString("pass");

//TODO fix so that result is added to log page.
var poststring = 'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/' + user + '&password=' + pass + '&action=checklists';
var fileName = 'checklists.xml';

Ti.include('../net/httppost.js',
			 '../utils/createTableView.js'
			 );

//This rows are for log/debug purpouses 
var t = postHTTPClient(poststring, fileName);

//This is where the checklist view is populated

var xhr = Ti.Network.createHTTPClient();

xhr.open("POST", poststring);
xhr.onload = function(){
    try {
        var doc = this.responseXML.documentElement;
        
        var items = doc.getElementsByTagName("checklist");
        
        for (var c = 0; c < items.length; c++) {
            var item = items.item(c);
            var title = item.getAttribute("name");
            var id = item.getAttribute("id");
            
            checklists.push({
                //add these attributes for the benefit of a table view
                title: title,
                id: id,
                hasChild: true,
                //custom data attribute to pass to detail page
                content: title
            });
            
        }
        
        var tableView = createNewTableView();
        tableView.setData(checklists);
        Titanium.UI.currentWindow.add(tableView);
        
    } 
    catch (E) {
        alert(E);
    }
};
xhr.send();




