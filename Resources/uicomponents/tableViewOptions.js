getTableViewOptions = function(){
    var tableViewOptions = {
        style: 1/*Bug in Titanium, this should be the style: Titanium.UI.iPhone.TableViewStyle.GROUPED*/,
        //headerTitle: 'Folders',
        footerTitle: "\©2011 Purple Scout AB",
        backgroundColor: 'transparent',
        rowBackgroundColor: 'white'
    };
	return tableViewOptions;
};
