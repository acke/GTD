function parseTasks(tasks, item){
	
    var title = item.getElementsByTagName("name").item(0).text;
    var id = item.getElementsByTagName("id").item(0).text;
    var quadrant = item.getElementsByTagName("quadrant").item(0).text;
    var context = item.getElementsByTagName("context").item(0).text;
    var notes = item.getElementsByTagName("notes").item(0).text;
    var projectID = item.getElementsByTagName("part_of_project_id").item(0).text;
    var age = item.getElementsByTagName("age").item(0).text;
	var due_on = item.getElementsByTagName("due_on").item(0).text;
    var quadrantString = getQuadrantFromValue(Math.round(quadrant));
	    
    tasks.push({
        //add these attributes for the benefit of a table view
        title: title,
        //custom data attribute to pass to detail page
        id: id,
        quadrant: quadrant,
        quadrantString: quadrantString,
        context: context,
        notes: notes,
        projectID: projectID,
        age: age,
		dueon: due_on,
        hasChild: true,
        isTask: true
    });
    
    return tasks;
};
