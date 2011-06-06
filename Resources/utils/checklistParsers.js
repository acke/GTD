function parseChecklists(checklists, item){
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
	return checklists;
};
