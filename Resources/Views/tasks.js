
// create table view data object
var data = [];
var user = Titanium.App.Properties.getString("user");
var pass = Titanium.App.Properties.getString("pass");

//These rows are for log purpouses
//TODO fix so that result is added to log page.
var poststring = 'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/' + user + '&password=' + pass + '&action=tasks';
var fileName = 'tasks.xml';

Ti.include('../net/httppost.js', '../Editors/task_editor.js', '../utils/quadrant.js');

var t = postHTTPClient(poststring, fileName);

var xhr = Ti.Network.createHTTPClient();

createNewTableView = function(tableData, doctitle){
    var tableview = Titanium.UI.createTableView();
    
    tableview.addEventListener('click', function(e){
        Titanium.API.info("tableview event triggered: " + e.rowData.title);
        var w = createTaskEditor(e.rowData);
        
        w.open({
            modal: true
        });
    });
    
    return tableview;
};

xhr.open("POST", 'https://meldon.org/gtd/mobile.php?openid_user_id=http://openid-provider.appspot.com/' + user + '&password=' + pass + '&action=tasks');

xhr.onload = function(){
    var tasks = [];
    try {
        var doc = this.responseXML.documentElement;
        var items = doc.getElementsByTagName("task");
        
        var x = 0;
        var doctitle = doc.evaluate("//result/tasks/task/name/text()").item(0).nodeValue;
        for (var c = 0; c < items.length; c++) {
            var item = items.item(c);
            var title = item.getElementsByTagName("name").item(0).text;
            var id = item.getElementsByTagName("id").item(0).text;
            var quadrant = item.getElementsByTagName("quadrant").item(0).text;
            var context = item.getElementsByTagName("context").item(0).text;
            var notes = item.getElementsByTagName("notes").item(0).text;
            var age = item.getElementsByTagName("age").item(0).text;
            var quadrantString = getQuadrantFromValue(Math.round(quadrant));
			
			Titanium.API.info('quadrantString: '+quadrantString);
			
            tasks.push({
                //add these attributes for the benefit of a table view
                title: title,
                //custom data attribute to pass to detail page
                id: id,
                quadrant: quadrant,
				quadrantString: quadrantString,
                context: context,
                notes: notes,
                age: age,
                hasChild: true,
                isTask: true
            });
            
        }
        
        
        var tableView = createNewTableView();
        tableView.setData(tasks);
        Titanium.UI.currentWindow.add(tableView);
    } 
    catch (E) {
        alert(E);
    }
};
xhr.send();




